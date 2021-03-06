---
title: 조합수학과 그래프
description: 책 읽기
sidebar: auto
lang: ko-KR
meta: 
  - name: keywords
  - content: math combinatorics graph
---
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>

# '조합수학과 그래프' 읽기

```c
for (int i=0; i < N; i++) {
    m = 1;
    while (m < i) { m = m * 2 }
}
```
위 알고리즘의 big(O)를 구하는데 못구하였다. 결국 $\displaystyle\sum_{i=1}^{N} i*2^{i}$ 를 풀지 못하였다.  
뭔가 바보가 되는 느낌인데, 사실 생각해보니,  
오랫동안 이런 문제들을 "아, 뭐 이렇게 풀리지 않을까, 나중에 보면서 하면 되겠지" 하며 무시해왔다.  
그렇게 오래 공부 않고, 바보가 된 느낌이었고, 이런 것들을 이제 공부해 나가야지 바보가 되지 않겠다 싶었다.  
자, 누구보다 천천히 읽어가보자.  

_katex 라니..._
katex css와 github mardown css 도 가져와야 수식이 스타일링 된다.  :tada: (이모지는 없이도 되네)
katex 도 공부하면서 해야 겠다.   
$J \left( \theta_0, \theta_1 \right) = \frac{1}{2m}\sum\limits_{i=1}^m \left( h_{\theta}(x^{(i)})-y^{(i)} \right)^{2}$

# 조합수학입문

여러 생각을 하게 한다. 이산수학이란 용어는 연속성을 따지는 수학과 구별하기 위한 용어로, 이것은 총칭 하는 말이라, 수학의 분류에 적절치 않다고 한다. 
> 조합수학 Combinatorics 는 유산이산집합 finite discrete set 을 대상으로 특정한 성질을 갖는 배열의 존재성, 배열의 개수 등 여러 관계된 문제를 해결하기 위한 도구

기본적으로 세는 거라고 생각한다.  
여하튼 문제 해결을 해야 하는데, 그 기본으로 연역법과 귀납법에 대해 다시 살핀다.  
생각해보면 연역법, 귀납법 느낌만 있지, 뭔가 나의 명확한 기술처럼 있지는 않다.   

## 역역적 방법

여러 문제를 보여 준다. 모든 문제가 중요해 보이고, 여러번 곱씹고 싶다. 
- 가우스 정수합 문제
- 동전 가져가기 문제
- 눈금 없는 용기로 제는 문제
- 정육면체 자르는 문제
- 체스판 문제
- 팩토리얼 0의 개수 문제
- 10진법 1의 개수 문제

풀고 못풀고 보다도, 생각의 방법에 대해 고민 하게 됐다.    
가우스 정수합 문제를 처음 봤을 때부터 어렴풋한 생각이 든다. +, * 에 대해 그 연산을 안다는 것이 뭘까.   
동전 가져가기 문제는 여러번 보았지만, 매번 뒤로 가는 생각의 방향성만 생각했던 건 아닌가. "이렇게 될 수 밖에 없음" 을 찾는 생각법으로써 중요하다 생각하게 됐다.   
그것을 찾을 때, 시간의 정방향으로 찾을 수도 있고, 반대방향으로 찾을 수도 있겠다 싶었다. 눈금 없는 용기로 제는 문제는 양방향으로 "이렇게 될 수 밖에 없음"을 찾아가는 문제로 생각됐다.   
그런 것은 정육면체를 자르는 문제나, 체스판 문제에서 처럼 기하구조 일 수도 있었다.   
팩토리얼 문제 틀렸다. 곱하기를 무엇으로 생각하고 있는가. 곱하기라는 연산이 인수분해 되는 구조에서 무엇일 수 있는지, 알지 못하였다.  
진법이라는 구조에서 수는 어떤 패턴을 갖는지, 난 몰랐다. 3000개의 숫자가 나오는 빈도가 같은 것다는 것은 난 몰랐는가. 알았는가. 알았다면 활용할 수 있어야지 않았을까. 10진법에서 1의 개수를 셌던 이 문제를 쉽게 풀지 못하였다.     

많은 계산을 해왔다. 계산은 연산의 효율적인 모습 같은 것 아닌가. 결국에는 "이렇게 될 수 밖에 없는" 느낌이 중요하지 않을까. 그런 느낌은 어떤 구조 같다. 그 구조는 대부분 어떤 과정인데, 딱딱 순서가 있어서 시간이 흐르는 방향에 자연스러워 정방향으로 오래 생각해왔던 것일 수도 있고, 따지는 것이 필요 않은 경우가 많아서 넘겨버렸던 기하구조일 수도 있다. 또는 필요가 명확하여, 그런 계산을 하는데 익숙하여 연산과 구조가 바깥이 되어버리는 그래서 '마지막에 나오는 0의 개수', '1의 개수' 같은 것이 '바깥의 한 면'으로만 보이게 되기도 한다.  
이런 공부가 즐거운 것은, "이렇게 될 수 밖에 없는" 느낌을 아마도 내 수준에서는 대부분 '악습'으로 멀어져 있는 어떤 관계 구조를 발견하는 것이 '생각하는데 피곤한 것보다 발견하여 앞으로의 피로가 가실 것이 마음 편하여서' 인지, 뭔가 멀어져버린 것이 가까워지는 것 같은 느낌 때문인지, 급하게 집착해 왔던 무엇으로부터 벗어나는 해방 때문인지, 벗어나 찾은 것이 뭔가 마음 편히 진짜 같기 때문인지 잘 모르겠다.  

다음에는 연습문제를 풀어보자.  

`구조`와 `어쩔 수 없음`을 물으면서 문제를 풀어보자.  

