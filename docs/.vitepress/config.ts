import { defineConfig } from 'vitepress'
import { nav } from './utils/nav'
import { sidebar } from './utils/sidebar'

/**
 * 更多配置项参考：https://vitepress.vuejs.org/config/app-configs.html
 */

const config = defineConfig({
  lang: 'zh-CN',
  title: 'note',
  description: '工作学习总结', 
  lastUpdated: true,
  base: '/',
  markdown: {
    theme: 'one-dark-pro',
    linkify: false
  },
  themeConfig: {
    lastUpdatedText: '最后更新时间',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/code-jbrc/doc'
      }
    ],
    nav,
    sidebar,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present code-jbrc'
    },
    // algolia: {
    //   appId: '94CK9VI16P',
    //   apiKey: '92ab6af8da0e0c4e59b6ee77e72e074b',
    //   indexName: 'yalisky'
    // }
  },
  
})

export default config
