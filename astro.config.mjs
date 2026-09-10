// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 旧站（jekyll-bootstrap，2013）的文章地址。内容还在，只是不再出现在导航里。
const legacyPostRedirects = {
  '/tool/2013/04/01/git_commands': '/posts/git_commands/',
  '/ruby/2013/10/17/built-ruby-on-rails-production-environment-on-aliyun':
    '/posts/built-ruby-on-rails-production-environment-on-aliyun/',
};

export default defineConfig({
  site: 'https://cod7ce.github.io',
  integrations: [sitemap({ filter: (page) => !page.includes('/posts/') })],
  redirects: legacyPostRedirects,
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: false },
  },
});
