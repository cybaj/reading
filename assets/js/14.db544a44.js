(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{172:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("p",[t._v("version 2.3 networkx 레퍼런스를 읽는다."),a("br"),t._v("\n레퍼런스는 "),a("a",{attrs:{href:"http://networkx.github.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("공홈"),a("OutboundLink")],1),t._v(" 에서 버전별로 볼 수 있다. pdf 파일이고 일종의 튜토리얼처럼 되어 있다."),a("br"),t._v("\n목차는 레퍼런스의 목차를 그대로 따른다.")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._m(6),t._v(" "),t._m(7),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._m(11),t._v(" "),a("p",[t._v("graph는 내부에서 파이썬 dictionary를 이용해서 저장되는데, 이때 "),a("a",{attrs:{href:"https://ko.wikipedia.org/wiki/%EC%9D%B8%EC%A0%91_%EB%A6%AC%EC%8A%A4%ED%8A%B8",target:"_blank",rel:"noopener noreferrer"}},[t._v("adjacency list representation 인접 리스트 표현"),a("OutboundLink")],1),t._v(' 로 저장한다. 구조는 "dict-of-dicts" 이며, 바깥쪽 딕셔너리는 키로 노드들을 가지고 있고, 그 벨류로 그 키의 이웃하는 노드들로 만들어진 딕셔너리를 갖는다. 이런 일종의 리스트의 리스트를 파이썬에서 쉽게 이용하고 있구나.'),a("br"),t._v("\n당연히 graph 메소드로 직접 조작하기 보다, 그런 api 와 연결된 function을 사용해서 graph 객체를 다룬다.")]),t._v(" "),t._m(12),t._v(" "),a("p",[t._v("그래프를 구축하려고 할 때 가장 먼저 고민 해야 할 것, 어떤 타입의 그래프를 사용할 것인가. 앞서 본 것들 중에 골라야지.")]),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),a("p",[t._v("다음 단계는 node와 edge로 무엇을 할 것인가\n네트워크의 토폴로지가 중요하다면, edge 생각없이 그냥 node를 만들면 될 것이고, 갖고있는 자료구조가 있다면 hashable 만 구현하면 되고, 그렇지 못하다면 어떤 unique identifier 를 사용하여 node를 나타내고, 데이터는 노드의 속성으로 줄 수 있다고 한다.")]),t._v(" "),a("p",[t._v("edge도 데이터를 갖을 수 있는데, edge attribute 로 추가한다. 어떤 키워드/벨류로도 추가할 수 있으나, weight, length 같은 키워드는 특정 알고리즘 예를 들어 다익스트라 알고리즘 같은데 사용될 수 있기 때문에 적절히 사용하고.")]),t._v(" "),t._m(15),t._v(" "),a("p",[t._v("그래프는 어떻게 만드는가. 3가지 방법이 있다.")]),t._v(" "),t._m(16),t._v(" "),a("p",[t._v("3번째의 경우")]),t._v(" "),t._m(17),a("p",[t._v("해시 가능한 것은 뭐든 노드가 가능하고, 엣지 속성으로도 마찬가지.")]),t._v(" "),t._m(18),a("p",[t._v("한꺼번에 추가할 수도 있다.")]),t._v(" "),t._m(19),a("p",[t._v("weight랑 같이 하는 경우")]),t._v(" "),t._m(20),t._m(21),t._v(" "),t._m(22)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"networkx-reference-읽기"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#networkx-reference-읽기","aria-hidden":"true"}},[this._v("#")]),this._v(" Networkx Reference 읽기")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("개인적으로 정리하고 싶은 것은"),s("br"),this._v("\nAPI에서의 자료구조, 제공되는 입출력 방법, 검색방법, 시각화 방법 그리고 제공되는 그래프와 관련된 알고리즘들이다.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction","aria-hidden":"true"}},[this._v("#")]),this._v(" INTRODUCTION")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("대부분의 networkx API funtions은 graph object를 argument로 받아서 사용한다."),s("br"),this._v("\ngraph 의 methods는 기본적인 manipulation이나 reporting으로 제한되어 제공된다.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"networkx-basics"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#networkx-basics","aria-hidden":"true"}},[this._v("#")]),this._v(" NetworkX Basics")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-python line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[this._v("import")]),this._v(" networkx "),s("span",{pre:!0,attrs:{class:"token keyword"}},[this._v("as")]),this._v(" nx\n")])]),this._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[this._v("1")]),s("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("그리고,"),s("br"),this._v("\n그래프는 4종류가 있다.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("G "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Graph"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nG "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("DiGraph"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nG "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MultiGraph"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nG "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MultiDiGraph"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("Graph 클래스 : undirected graph, 두 노드 사이 여러 엣지를 무시, 한 노드의 self-loop edge 를 허용.")]),this._v(" "),s("li",[this._v("DiGraph 클래스 : directed graph, (subclass of Graph)")]),this._v(" "),s("li",[this._v("MultiGraph 클래스 : undirected graph, 그런데 두 노드 사이 여러 엣지 가능함. 성능상 조금 degradation")]),this._v(" "),s("li",[this._v("MultiDiGraph 클래스 : directed graph version of MultiGraph")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("모든 그래프는 node는 어떻게 만드나? hashable object."),s("br"),this._v("\nstrings, tuples, integers, and more..")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("somehashable"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__hash__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("edge attributes로 weights, labels 등 원하는대로 추가할 수 있다."),s("br"),this._v("\n(이것도 hash 처리 되겠지?)")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"graphs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#graphs","aria-hidden":"true"}},[this._v("#")]),this._v(" Graphs")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("Directed: edge에 방향이 있는가? edge pairs(u, v) 에 대해 그 순서가 중요한가? ..")]),this._v(" "),s("li",[this._v("Multi-edges: nodes 간 edge가 여러개 있을 수 있는가? 이 경우 앞선 dict-of-dicts 다른 구조가 필요할 것이다.")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"nodes-and-edges"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nodes-and-edges","aria-hidden":"true"}},[this._v("#")]),this._v(" Nodes and Edges")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"graph-creation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#graph-creation","aria-hidden":"true"}},[this._v("#")]),this._v(" Graph Creation")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("Graph generators: 어떤 Bipartite Graph 같은 표준적인 그래프를 제공한다.")]),this._v(" "),s("li",[this._v("아마도 파일로 존재하고 있을 데이터를 불러와서 만든다.")]),this._v(" "),s("li",[this._v("직접 노드와 엣지를 추가한다.")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" networkx "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" nx\nG "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" nx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Graph"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nG"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_edge"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nG"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_edge"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" weight"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.9")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" math\nG"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cos"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# any hashable can be a node")]),t._v("\nG"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_edge"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'y'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'x'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" function"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("math"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cos"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 엣지 속성도 맘대로")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("elist "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nG"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_edges_from"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("elist"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("elist "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5.0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'d'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7.3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nG"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_weighted_edges_from"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("elist"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("더 자세한 것은 14장 튜토리얼을 .."),s("br"),this._v("\n2번째의 경우, 여러 포맷으로 입출력할 수 있음을 확인.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"graph-reporting"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#graph-reporting","aria-hidden":"true"}},[this._v("#")]),this._v(" Graph Reporting")])}],!1,null,null,null);s.default=e.exports}}]);