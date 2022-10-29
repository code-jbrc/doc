/**
 * 侧边栏模块
 * 
 * 详情参考：https://vitepress.vuejs.org/guide/theme-sidebar
 */
export const sidebar = {
  '/docs/': [
    {
      text: '笔记',
      collapsible: true,
      link: '/docs/dev',
      items: [
        { text: 'dev', link: '/docs/dev' },
      ]
    }
  ]
}
