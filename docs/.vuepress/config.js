module.exports = {
  base: 'readings',
  title: 'cybaj IT {책, 레퍼런스} 읽기',
  description: '[networkx, ]',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'read Reference',
        items: [
          { text: 'networkx', link: '/references/networkx/' }
        ]
      }
    ]
  }
}
