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
          { text: 'networkx', link: '/references/networkx/' },
          { text: 'd3.js', link: '/references/d3_js/' },
        ]
      },
      { text: 'read Book',
        items: [
          { text: 'clang DS', link: '/books/c_datastructure/' },
          { text: 'js Patterns', link: '/books/js_patterns/' }
        ]
      }
    ]
  }
}
