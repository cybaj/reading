---
title: d3.js reference 읽기
description: 기본적으로 d3.js 를 쓸 수 있게, 내가 들어온 d3.js 핵심 내용에 대해 reference를 찾아가 정리하고자 한다. 목표는 force graph 편하게 쓰기
sidebar: auto
lang: ko-KR
meta:
    - name: keywords
    - content: d3.js visualization javascript js
---
# D3.js Reference 읽기

[Documents](https://github.com/d3/d3/wiki)와 엄청난 양의 [API reference](https://github.com/d3/d3/blob/master/API.md), 조금 보기 편한 [API reference](https://devdocs.io/d3~5/#selections-d3-selection) 가 있다.

핵심 요소로 몇가지를 잡고 있다.

각 요소에 대해 reference를 찾아보고, 흐름이 막히면 documents를 참조해서 읽어가자.
전부 읽진 않고, force graph 를 편하게 쓸만큼 보면 되겠다.

## Introduction (document)

[introduction](https://d3js.org/#introduction) 을 보고서 정리한다. 기본적인 내용은 data를 DOM과 바인딩하여 움직인다는 것. d3 개념을 잡는 것은, data와 DOM이 어떻게 바인딩 되어있는지를 아는 것 같음.

### Selections

DOM API
```javascript
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
  var paragraph = paragraphs.item(i);
  paragraph.style.setProperty("color", "blue", null);
}
```

D3 binding
```javascript
d3.selectAll("p").style("color", "blue");
```

selector API를 통해 selections 구현했고.  
이후 nodes를 mutating 하는 다양한 methods를 제공한다.

### Dynamic Properties

mutating 한다 = properties가 동적으로 변한다
```javascript
d3.selectAll("p").style("color", function(d, i) {
  return i % 2 ? "#fff" : "#eee";
});
```
style에 대한 콜백 함수에 data d, index i 가 인자로 들어가고 있다. 

```javascript
d3.selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
```

### Enter and Exit

이미 존재하는 데이터에 대해서는 .data() 체인을 통해서 추가했는데,  
새로 들어오는 데이터에 대해 node 를 추가하거나, 필요없어진 node 를 삭제하는 것이 필요하다.

```javascript
d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("p")
    .text(function(d) { return "I’m number " + d + "!"; });
```
데이터가 node 보다 많을 때, 남는 데이터에 대해,  
enter() 이후 chaining 을 통해 다룰 수 있다. 저렇게 node를 append 하고, styling 하고.

```javascript
// Update…
var p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
    .text(function(d) { return d; });

// Enter…
p.enter().append("p")
    .text(function(d) { return d; });

// Exit…
p.exit().remove();
```
이렇게 update 부분, enter 부분, exit 부분으로 나누어 정의하는 것이 적절해 보인다.  
처음 초기 데이터로 update 하고, 이후 들어오는 데이터로 enter, 나올 때 node 지우고 나오고.

이렇게 나누어 처리함으로써, 또 transitions 에 대한 제어가 편해질 수 있다고 한다.

### Transformation, not Representation

d3는 processing 처럼 visual representation 을 새로 만들어 제공하는 것이 아니라 SVG, webGL 같은 웹 표준에 그릴 수 있게 처리해주는 것.

### Transitions

styles, attributes의 변화를 쉽게 점진적으로 변하게 할 수 있다. 그 변화를 보간하는 일을 하는 녀석을 interpolator 라고 한다. 
```javascript
d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr("r", function(d) { return Math.sqrt(d * scale); });
```

API 량에 비해 생각보다 어렵지 않다.


## d3-force (document)

[document](https://github.com/d3/d3-force/blob/v1.2.1/README.md#forceSimulation) 를 보고서 d3-force 를 정리할 수 있다.  
[tutorial](http://www.coppelia.io/2014/07/an-a-to-z-of-extra-features-for-the-d3-force-layout/) 내용을 참고할 수 있다.

[Verlet Integration](https://en.wikipedia.org/wiki/Verlet_integration) 적분기를 이용해서 입자에 힘을 시뮬레이션 한다. 
이 모듈을 사용하기 위해서는 __an array of nodes__ 를 위한 __simulation__ 을 만들어야 하고,  
그것에 원하는 __forces__ 를 구성해야 한다.   
그 이후에 __tick events__ 를 listener 를 만들어서 nodes 에 어떤 변화를 줘 렌더링할 것인지를 정해준다. 

### Simulation

#### forceSimulation() 
```javascript
var simulation = d3.forceSimulation(nodes); // or d3.forceSimulation();
```
nodes 를 명시 하지 않으면 array 가 빈 채로 시뮬레이션이 만들어진다. 
> The simulator starts automatically; use simulation.on to listen for tick events as the simulation runs. If you wish to run the simulation manually instead, call simulation.stop, and then call simulation.tick as desired.
> 자동으로 __tick event__ 를 listen 하기 시작하고, (simulation.on 을 통해서) 만약, 매뉴얼로 제어하고 싶으면, simulation.stop 하고 simulation.tick 하라.

#### nodes()
```javascript
simulation
    .nodes(graph.nodes)
```
nodes 를 명시하여, 노드 배열을 만든다. 노드 배열을 통해서 그것들의 위치와 속도를 초기화 해줄 수 있고, 그러면 bound forces를 재초기화 한다. 

각 _node_ 는 객체여야 하고 다음의 속성을 가지고 있어야 한다.
- index
- x : 현재 x 위치
- y : 현재 y 위치
- vx : 현재 x 방향 속도
- vy : 현재 y 방향 속도

속도가 NaN 이면 <0,0> 속도에서 시작하고, 위치가 NaN 이면 phyllotaxis 모양으로 시작된다. 

fixed position 도 있는데 이것을 정해주면, 각 tick 마다 변화가 생기더라도, 다시 이 위치로 돌아오고, 속도 0으로 됨.

#### force()
```javascript
var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(Links))
    .force("center", d3.forceCenter())
```
simulation 내 주고자 하는 힘을 정해준다. 기본으로 새로 만들어진 시뮬레이션 안에는 힘이 안정해져 있다. 힘은 그 힘의 이름과 힘처리를 해줄 함수로 정해진다. 가운데로 모으는 힘을 주는 함수 같은 것은 이미 만들어져 있다. (forceCenter(centerX, centerY) 처럼) 

#### on()
```javascript
simulation.on(typenames, [listener])
```
typenames는 _tick_ 처럼 이미 정해진 type 에 대해, 점 찍어 이름을 추가해준 형태일 수 있으며, 따라서,  
__tick.foo__ , __tick.bar__ 처럼 __tick__ 이라는 같은 type 에 여러 리스너를 달아줄 수 있다.

type은 아래 중에 하나여야 한다.
- tick - after each tick of the simulation’s internal timer.
- end - after the simulation’s timer stops when alpha < alphaMin.

tick 은 simulation.tick 같은 방법으로 매뉴얼하게 dispatch 될 수 없으며, 오직 internal timer 를 통해서만 dispatch 될 수 있다.

> To affect the simulation, register forces instead of modifying nodes’ positions or velocities inside a tick event listener.
listener 를 통해서 위치를 조정하기 보다, forces 를 활용하는 것을 권장하는 것 같다.

### Forces

_force_ 는 그냥 node 들의 위치와 속도를 조절하는 함수다. 중력이나 전자기력 같은 고전적인 힘도 구현할 수 있고, 어느 박스 안에서 있게 가두는 것도 구현할 수 있고, 서로 특정 거리만큼 떨어지게 하는 것도 구현할 수 있다. 
```javascript
// <0,0> 위치로 가게 하는 힘
function force(alpha) {
    for (var i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
        node = nodes[i];
        node.vx -= node.x * k;
        node.vy -= node.y * k;
    }
}
```
각 노드별 현재 위치를 얻은 다음에 정의된 속도를 더해준다. 

이런 힘들 중에 대표적인 형태를 제공하고 있다.
- centering
- collision
- links
- many-body
- positioning


