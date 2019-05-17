---
title: networkx reference 읽기
description: python 의 graph 다루는 package 인 networkx 에 대한 reference 를 읽고 정리한다.
sidebar: auto
lang: ko-KR
meta:
    - name: keywords
    - content: networkx reference python
---
# Networkx Reference 읽기

version 2.3 networkx 레퍼런스를 읽는다.  
레퍼런스는 [공홈](http://networkx.github.io) 에서 버전별로 볼 수 있다. pdf 파일이고 일종의 튜토리얼처럼 되어 있다.  
목차는 레퍼런스의 목차를 그대로 따른다.  

개인적으로 정리하고 싶은 것은  
API에서의 자료구조, 제공되는 입출력 방법, 검색방법, 시각화 방법 그리고 제공되는 그래프와 관련된 알고리즘들이다.  

## INTRODUCTION

대부분의 networkx API funtions은 graph object를 argument로 받아서 사용한다.  
graph 의 methods는 기본적인 manipulation이나 reporting으로 제한되어 제공된다.  

### NetworkX Basics

```python
import networkx as nx
```

그리고,  
그래프는 4종류가 있다.

```python
G = nx.Graph()
G = nx.DiGraph()
G = nx.MultiGraph()
G = nx.MultiDiGraph()
```

- Graph 클래스 : undirected graph, 두 노드 사이 여러 엣지를 무시, 한 노드의 self-loop edge 를 허용.  
- DiGraph 클래스 : directed graph, (subclass of Graph)  
- MultiGraph 클래스 : undirected graph, 그런데 두 노드 사이 여러 엣지 가능함. 성능상 조금 degradation  
- MultiDiGraph 클래스 : directed graph version of MultiGraph  

모든 그래프는 node는 어떻게 만드나? hashable object.  
strings, tuples, integers, and more..  

```python
somehashable.__hash__()
```

edge attributes로 weights, labels 등 원하는대로 추가할 수 있다.  
(이것도 hash 처리 되겠지?)  

graph는 내부에서 파이썬 dictionary를 이용해서 저장되는데, 이때 [adjacency list representation 인접 리스트 표현](https://ko.wikipedia.org/wiki/%EC%9D%B8%EC%A0%91_%EB%A6%AC%EC%8A%A4%ED%8A%B8) 로 저장한다. 구조는 "dict-of-dicts" 이며, 바깥쪽 딕셔너리는 키로 노드들을 가지고 있고, 그 벨류로 그 키의 이웃하는 노드들로 만들어진 딕셔너리를 갖는다. 이런 일종의 리스트의 리스트를 파이썬에서 쉽게 이용하고 있구나.  
당연히 graph 메소드로 직접 조작하기 보다, 그런 api 와 연결된 function을 사용해서 graph 객체를 다룬다.  

### Graphs

그래프를 구축하려고 할 때 가장 먼저 고민 해야 할 것, 어떤 타입의 그래프를 사용할 것인가. 앞서 본 것들 중에 골라야지.  

- Directed: edge에 방향이 있는가? edge pairs(u, v) 에 대해 그 순서가 중요한가? ..  
- Multi-edges: nodes 간 edge가 여러개 있을 수 있는가? 이 경우 앞선 dict-of-dicts 다른 구조가 필요할 것이다.  

#### Nodes and Edges

다음 단계는 node와 edge로 무엇을 할 것인가
네트워크의 토폴로지가 중요하다면, edge 생각없이 그냥 node를 만들면 될 것이고, 갖고있는 자료구조가 있다면 hashable 만 구현하면 되고, 그렇지 못하다면 어떤 unique identifier 를 사용하여 node를 나타내고, 데이터는 노드의 속성으로 줄 수 있다고 한다.  

edge도 데이터를 갖을 수 있는데, edge attribute 로 추가한다. 어떤 키워드/벨류로도 추가할 수 있으나, weight, length 같은 키워드는 특정 알고리즘 예를 들어 다익스트라 알고리즘 같은데 사용될 수 있기 때문에 적절히 사용하고.  

### Graph Creation

그래프는 어떻게 만드는가. 3가지 방법이 있다.

- Graph generators: 어떤 Bipartite Graph 같은 표준적인 그래프를 제공한다.
- 아마도 파일로 존재하고 있을 데이터를 불러와서 만든다.
- 직접 노드와 엣지를 추가한다.

3번째의 경우
```python
import networkx as nx
G = nx.Graph()
G.add_edge(1, 2)
G.add_edge(2, 3, weight=0.9)
```

해시 가능한 것은 뭐든 노드가 가능하고, 엣지 속성으로도 마찬가지.
```python
import math
G.add_node(math.cos) # any hashable can be a node
G.add_edge('y', 'x', function=math.cos) # 엣지 속성도 맘대로
```

한꺼번에 추가할 수도 있다.
```python
elist = [(1, 2), (2, 3), (1, 4), (4, 2)]
G.add_edges_from(elist)
```

weight랑 같이 하는 경우
```python
elist = [('a', 'b', 5.0), ('b', 'c', 3.0), ('a', 'c', 1.0), ('c', 'd', 7.3)]
G.add_weighted_edges_from(elist)
```

더 자세한 것은 14장 튜토리얼을 ..  
2번째의 경우, 여러 포맷으로 입출력할 수 있음을 확인.  

### Graph Reporting



