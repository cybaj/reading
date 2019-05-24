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


