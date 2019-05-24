---
title: 개념만 아는 것
description: 개념만 아는 것도 기록해놓고 싶다.
---
# Notions : 개념만 아는 것들

개념만 아는 것들에 대해 기록해놓고 싶다.

### Branching Entropy
@Jin&Tanaka(2006)

단어가 있다. 'nature', 'natural'
글자로 나누어 생각해보자.

```python
words = ["nature", "natural"]

splited = {}
maxlen = 0
for word in words:
    splited[word] = list(word)
    maxlen = len(word) if maxlen < len(word)
```

```python
def gen(splited):
    for chr in splited:
        yield chr
    while True :
        yield None

gen_nature = gen(splited['nature'])
gen_natural = gen(splited['natural'])

function crosscheck(gen_nature, gen_natural):
    for i in range(maxlen):
        chr_1 = next(gen_nature)
        chr_2 = next(gen_natural)
    
        if chr_1 == chr_2 :
            if chr_1 == None :
                break
            else :
                print('match')
        else :
            print('no match')
```   

match 가 나는 동안에는 점점 불확실성이 줄어들고,  
no match 가 처음 날 때 불확실성이 급격히 커지고, 이후로 불확실성이 다시 줄어든다.

그런 느낌을 안다. 그러면 계산은 어떻게 해야 할까.
