import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.md' }),
  // 函数式 schema 才能拿到 image()，让 Astro 在构建时优化截图并生成多尺寸
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      name: z.string(),
      subtitle: z.string(),
      tagline: z.string(),
      // 一句话，用在首页卡片上。
      blurb: z.string(),
      icon: z.string().optional(),
      accent: z.string(),
      repo: z.string(),
      platform: z.string(),
      stack: z.array(z.string()),
      license: z.string(),
      // 兜底值：构建时会去 GitHub Releases 取最新的覆盖掉。
      version: z.string(),
      assetPattern: z.string(),
      downloadSize: z.string(),
      // 产品截图，可选
      screenshot: image().optional(),
      screenshotAlt: z.string().optional(),
      screenshotCaption: z.string().optional(),
    }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // frontmatter 里是 `2013-04-01 12:00:00 +0800` 这种字符串，交给 zod 转
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { products, posts };
