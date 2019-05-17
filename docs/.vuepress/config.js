module.exports = {
  base: '/reading/',
  title: 'cybaj IT {책, 레퍼런스} 읽기',
  description: '[networkx, clang DS,]',
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
      },
      { text: 'read Book',
        items: [
          { text: 'clang DS', link: '/books/c_datastructure/' }
        ]
      }
    ]
  }
}
