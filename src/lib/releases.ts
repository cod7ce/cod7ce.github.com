/**
 * 构建时去 GitHub Releases 取每个产品的最新版本号和安装包体积。
 *
 * 取不到就用 frontmatter 里的兜底值 —— 版本号过期总好过整站构建失败，
 * 而 GitHub API 对未认证请求是每小时 60 次，本地反复构建很容易撞上。
 * CI 里有 GITHUB_TOKEN，会自动带上。
 */
export type ReleaseInfo = {
  version: string;
  size: string;
  downloadUrl: string | null;
  stale: boolean;
};

type Asset = { name: string; size: number; browser_download_url: string };

const cache = new Map<string, ReleaseInfo>();

function formatSize(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  return mb < 10 ? `${mb.toFixed(1)} MB` : `${Math.round(mb)} MB`;
}

export async function latestRelease(
  repo: string,
  assetPattern: string,
  fallback: { version: string; size: string },
): Promise<ReleaseInfo> {
  const key = `${repo}::${assetPattern}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const stale: ReleaseInfo = { ...fallback, downloadUrl: null, stale: true };

  try {
    const headers: Record<string, string> = {
      accept: 'application/vnd.github+json',
      'user-agent': 'cod7ce.github.io build',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const body = (await res.json()) as { tag_name?: string; assets?: Asset[] };
    const re = new RegExp(assetPattern);
    const asset = (body.assets ?? []).find((a) => re.test(a.name));
    if (!body.tag_name || !asset) throw new Error('release has no matching asset');

    const info: ReleaseInfo = {
      version: body.tag_name.replace(/^v/, ''),
      size: formatSize(asset.size),
      downloadUrl: asset.browser_download_url,
      stale: false,
    };
    cache.set(key, info);
    return info;
  } catch (err) {
    console.warn(`[releases] ${repo}: ${(err as Error).message} —— 用 frontmatter 的兜底值`);
    cache.set(key, stale);
    return stale;
  }
}
