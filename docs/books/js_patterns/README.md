---
title: Javascript Patterns
description: Stoyan Stefaonv 책 읽기
sidebar: auto
lang: ko-KR
meta:
  - name: keywords
  - content: js javascript patterns
---
# 'Javascript Patterns' 읽기

자바스크립트로 패키지를 어떻게 짤 수 있는지 궁금했다. 찾아보았지만, 나온 것을 본 것이 제대로 공부가 된 거 같지 않았다. 숫자에 대한 패키지를 만들어보고 싶은데, 어떻게 짤 수 있는지 멍하였다. 전에 사두고 보지 못한 책 중에 하나로 이 책이 우연히 보여 보았는데, 너무 좋았다. 5장 객체 생성 패턴에 대한 내용을 정리하고 싶었다.

5장을 정리하는 것이 우선 목표이고, 그 후 6장 코드 재사용 패턴, 7장 디자인 패턴에 대해 정리한 후,
나머지 부분을 목차대로 정리하고 싶다.

## 객체 생성 패턴

자바스크립트에는 네임스페이스 모듈 패키지, 비공개 프로퍼티를 위한 별도의 문법 (예를 들어 그런 키워드) 가 없다. 따라서 이를 대체할 수 있는 방법이 필요하다. ( ES6 에는 클래스가 있지만.. )  
> 이러한 기능들을 구현하거나 대체하거나 또는 다른 관점에서 바라볼 수 있게 해주는 범용적인 패턴들에 대해 알아본다. (103p)

책에서는 '네임스페이스 패턴', '의존 관계 선언', '모듈 패턴', '샌드박스 패턴' 을 배운다. 이를 통해
> 애플리케이션 코드를 정리하고 구조화할 수 있게 도와주고 암묵적 전역의 영향력을 약화시킨다. 
"이 밖에도 비공개 멤버와 특권 멤버, 공개/비공개 스태틱 멤버, 객체 상수, 체이닝, 클래스와 비슷한 방식으로 생성자를 정의하는 방법"도 배운다.

### 네임스페이스 패턴

- 전역 변수의 개수를 줄여준다.
- 과도한 접두어를 사용하지 않고 이름이 겹치지 않게 해준다.

> 애플리케이션이나 라이브러리르 위한 전역 객체를 하나 만들고 (단 하나만 만드는 것이 이상적이다.) 모든 기능을 이 객체에 추가하면 된다.

```javascript
// 생성자 함수 2개
function Parent() {}
function Child() {}

// 변수 1개
var some_var = 1;

// 객체 2개
var module1 = {};
module1.data = {a: 1, b: 2, c: 3};
var module2 = {ddddd: "ah, SSSCO"};
```
수정전 코드는 전역변수가 5개 ( 생성자 2, 변수 1, 객체 2 }

```javascript
// 전역 객체
var MYAPP = {};

// 생성자
MYAPP.Parent = function () {};
MYAPP.Child = function () {};

// 변수
MYAPP.some_var = 1;

// 객체 컨테이너
MYAPP.modules = {};

// 객체들을 컨테이너에 추가
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = '데이터들'
MYAPP.modules.module2 = {};
```
전역 네임스페이스를 사용하면 전역객체가 1개로.

단점
- 모든 변수와 함수에 접두어 => 코드량 증가, 스크립트 파일 크기 증가
- 전역 인스턴스가 하나이므로, 어느 한 부분을 수정하더라도 전역 인스턴스를 수정해야함
- 이름이 중첩되고 길어지므로, 프로퍼티를 판별하기 위한 검색 작업도 길고 느려짐. (예를 들어 MYAPP.modules.module11.data.abc.cards[222].dosomething ..)
- 그리고 이미 존재하는 경우, 그것을 덮어쓰는 위험성

#### 범용 네임스페이스 함수

마지막에, 이미 존재하는 것을 덮어쓰는 위험성을 없애기 위한 스니펫
```javascript
// 위험한 경우
var MYAPP = {};

// 개선안
if (typeof MYAPP === "undefined") {
    var MYAPP = {};
}

// 더 짧게
var MYAPP = MYAPP || {}; // 있으면 그대로 없으면 생성

// p.105
```
그런데 모든 멤버에 대해 이런 중복을 따지면, 이를 위한 함수가 있는 것이 좋겠다.
책에서는 `범용 네임스페이스 함수` 라고 말하는 함수
```javascript
var MYAPP = MYAPP || {};
MYAPP.namespace = function (ns_string) {
    // 추가할 모듈 멤버를 단계별로 있는지 확인하고 없으면 만들고 있으면 그것 아래 두는 식으로..
    // parts 는 확인할 단계별 녀석들
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;

    // 처리할 parts 중에서 처리할 필요 없는 전역객체 부분은 넘겨버린다.
    if (parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }

    // 시작
    for (i = 0; i < parts.length; i += 1) {
        // 프로퍼티가 존재 않으면 생성한다.
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }
    return parent;
};

// p.106
```

`범용 네임스페이스 함수`의 사용
```javascript
var module2 = MYAPP.namespace('MYAPP.modules.module2'); // 또는 MYAPP.namespace('modules.module2');
module2 === MYAPP.modules.module2; // true
```

옮긴이의 각주: namespace는 JS의 예약어로 포함되어 있으므로, ... 이를 피하자.

#### 의존성 관계 선언

자, 이제 네임스페이스로 묶었고, 필요한 모듈부분만 골라서 쓸 수 있다. YUI2에는 YAHOO라는 전역변수가 있고, YAHOO.util.DOM 같이 골라서 쓸 수 있다. 그렇게 만들 수 있다.  
단, 이 때 한가지를 더 염두하자.  
갖다 쓸 그 필요한 모듈 부분들을 모듈 내 최상단에 선언하자.  (책에서는 의존관계에 있는 모듈을 선언하는 것이라고.)

```javascript
var my Function = function () {
    // 의존 관계에 있는 모듈들
    var event = YAHOO.util.Event,
        dom = YAHOO.util.Dom;

    // 이제 event, dom 지역변수를 사용한다.
};

// p.107
```
장점 (p.107)
- 의존 관계 명시적으로 나타남. 쓰는 사람이 필요한 스크립트 파일 확인 쉬움.
- 의존 관계 이해하기 편함.
- dom 같은 지역변수가 YAHOO와 같은 전역 변수보다 언제나 더 빠르며, 특히 YAHOO.util.Dom 처럼 중첩된 경우는 그렇다.
- 스크립트 압축 시 지역변수에 대해 축약해주지만, 전역 변수는 위험해 축약하지 않는다.

스크립트 압축에 대한 예가 책에 있다.

### 비공개 프로퍼티와 메서드

> 자바 등 다른 언어와는 달리 자바스크립트에는 private, protected, public 프로퍼티와 메서드를 나타내는 별도의 문법이 없다. (p.109)

```javascript
function Gadget() {
    this.name = 'iPod'
}

var toy = new Gadget();
console.log(toy.name); // name 이 공개되어 있다.

// 그런데 아래는 비공개 되어 있다.
function Gadget() {
    var name = 'iPod'
}

// 이를 getter 를 따로 구현해 얻는다.
function Gadget() {
    var name = 'iPod'
    this.getName = function () {
        return name
    }
}

var toy = new Gadget();
console.log(toy.name); // 이건 안되고
console.log(toy.getName()); // 이건 되고

// p.110
```

#### 특권(privileged) 메서드
> getName()은 비공개 프로퍼티인 name에 '특별한' 접근권한을 가지고 있기 때문에 특권 메서드라고 할 수 있다. (p.110)

#### 비공개 멤버의 허점

- 옛날 브라우저 eval 두번째 매개변수로 비공개 유효범위를 볼 수 있는 컨텍스트 객체가 있고...
- 이것이 중요해 보이는데, 특권 메서드에서 비공개 프로퍼티를 "바로 반환"하는 경우에, "값이 아닌 참조"가 반환되기 때문에, 외부에서 비공개 변수 값을 수정할 수 있게 된다.

따라서 특권 메서드 안에서 밖으로 보낼 비공개 변수는 필요한 최소한의 것만, (Principle of Least Authority, POLA, 최소 권한의 원칙) 보내고,  
만약 모든 것을 보내야 한다면, 객체를 복사해서 보는 낸 것. (이때, 얕은 복사를 '최상위 프로퍼티 복사'로, 깊은 복사를 '모든 중첩 프로퍼티를 재귀적으로 복사'하는 것으로 책에서 보고 있다.)

#### 객체 리터럴과 비공개 멤버

생성자가 아니라, 객체 리터럴로 생성했을 때, 비공개 멤버를 구현해보자.
```javascript
var myobj;
(function () {
    var name = "my, oh my"

    myobj = {
        getName: function () {
            return name;
        }
    }
})();

myobj.getName();

// p.112
```
> 비공개 데이터를 함수로 감싸기만 하면된다. 따라서 객체 리터럴에서는 익명 즉시 실행 함수를 추가하여 클로저를 만든다.

```javascript
// 고쳐서
var myobj = (function () {
    // 비공개 멤버
    var name = "my, oh my"

    // 공개될 부분
    return {
        getName: function () {
            return name;
        }
    }
})();

myobj.getName();

// p.113
```
> 이 예제는 곧 살펴보게 될 '모듈 패턴'의 기초가 되는 부분이기도 하다.

#### 프로토타입과 비공개 멤버

이제 생성자를 쓸 때, 비공개 멤버를 구현할 수 있고, 객체 리터럴 쓸 때, 비공개 멤버를 구현할 수 있다.
근데, 생성자로 비공개 멤버 구현할 때, this를 써서 했었는데,
```javascript
function Crow() {
    var privated = "a12"
    this.getData = function () {
        return privated;
    }
}
```
새로운 객체를 만들 때마다 비공개 멤버 재성성되는 것에 대해, prototype을 써보자.

```javascript
function Gadget() {
    var name = 'iPod'
    this.getName = function () {
        return name;
    }
}
Gadget.prototype = (function () {
    var browser = "Mobile Webkit"
    return {
        getBrowser: function () {
            return browser
        }
    }
}) ();

// p.114
```

#### 비공개 함수를 공개 메서드로 노출시키는 방법

> 객체의 모든 기능이 객체가 수행하는 작업에 필수불가결한 것들이라서 최대한의 보호가 필요한데, 동시에 이 기능들의 유용성 때문에 공개적인 접근도 허용하고 싶은 경우가 있을 수 있다. ... 매서드가 공개되어 있다는 것은 결국 이 메서드가 위험에 노출되어 있다는 말과도 같다. (p.114)

```javascript
(function () {
    // ......

    myarray = {
        isArray: isArray,
        indexOf: indexOf,
        inArray: indexOf
    }
})();

myarray.indexOf = null;
myarray.inArray(["a", "b"], "z");
```

### 모듈 패턴

여기까지, 네임스페이스로 묶고, 묶은 거 쓸 때 의존성 선언해서 로컬로 쓰고, 모듈 만들 때 변수든 메서드든 감출 것은 감출 수 있다. 그리고 특히 IIFE를 이용해서 객체 리터럴로 비공개되는 부분을 갖는 객체를 쓰는 것을 배웠다.

```javascript
// 다시 기억해보기
var myobj = (function () {
    varname = "my, oh my"

    return {
        getName: function () {
            return name;
        }
    }
})();

myobj.getName();

// p.113
```

모듈 패턴은 이것들을 조합한 것이라고 한다.

1. 먼저 네임스페이스를 설정한다.
```javascript
MYAPP.namespace('MYAPP.utilities.array')
```
2. IIFE 로 비공개 범위와 공개 인터페이스가 담긴 모듈을 정의할 것이다.
여기에 추가해야 하는데
```javascript
MYAPP.utilities.array = (function () {
    return {
        /* 
        여기에 추가하는데
        */
    }
})();
```
3. 공개API 메서드를 추가하면 이렇다.
```javascript
MYAPP.utilities.array = (function () {
    return {
        inArray: function (needle, haystack) {
            // ...
        },
        isArray: function (a) {
            // ...
        }
    }
})();
```
4. 모듈 안에서 사용할 의존 관계를 정의한다.
```javascript
MYAPP.utilities.array = (function () {
    // 최상단에 의존관계를 정의한다.
    var uboj = MYAPP.utilities.object,
        ulang = MYAPP.utilites.lang

    return {
        inArray: function (needle, haystack) {
            // ...
        },
        isArray: function (a) {
            // ...
        }
    }
})();
```
5. 비공개 프로퍼티, 비공개 메서드들 추가할 수 있다.
```javascript
MYAPP.utilities.array = (function () {
    var uboj = MYAPP.utilities.object,
        ulang = MYAPP.utilites.lang

    // 비공개 프로퍼티
    var array_string = "[object Array]",
        ops = Object.prototype.toString

    // 비공개 메서드
    var some_methods = function () { // ... }

    /* 여기까지 var 선언을 마친다. */

    // 필요한 경우 일회성 초기화 절차를 실행한다.
    // ...

    return {
        inArray: function (needle, haystack) {
            // ...
        },
        isArray: function (a) {
            // ...
        },
        // ... 더 필요한 메서드와 프로퍼티를 여기에 추가한다.
    }
})();

// p.117
```
> 모듈 패턴은 특히 점점 늘어만 가는 코드를 정리할 때 널리 사용되며 매우 추천하는 방법이다.

#### 모듈 노출 패턴

위 코드에서, 모든 매서드를 감추고, 골라서 공개하고, 그래서 밖으로부터 좀 안전성을 키워보자.
```javascript
MYAPP.utilities.array = (function () {
    var array_string = "[object Array]",
        ops = Object.prototype.toSTring

    // 비공개 메서드
    var inArray = function() { // ... },
        isArray = function() { // ... }

    // 공개 API 노출
    return {
        isArray: isArray,
        indexOf: inArray
    }
})()

// p.118
```

#### 생성자를 생성하는 모듈
앞선 것은 MYAPP.utilities.array 라는 객체를 만들어 사용할 수 있었고.  
그렇게 모듈 객체들을 이것저것 만들어서 사용할 수 있겠다.  
이 경우는 모두 IIFE로 모듈을 감싸 반환하는 것이다.  

이러지 않고, 생성자 함수를 반환하여, 이를 사용하는 패턴도 생각해볼 수 있다.

```javascript
MYAPP.namespace('MYAPP.utilities.Array')

MYAPP.utilities.Array = (function () {
    // 의존성 선언
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang

    // 비공개 프로퍼티와 매서드들을 선언
    var Constr;

    // var 선언을 마치고.

    // 필요한 일회성 초기화
    // ...
    
    // 공개 API - 생성자 함수
    Constr = function (o) {
        this.elements = this.toArray(o)
    }
    // 공개 API - 프로토타입
    Constr.prototype = {
        constructor: MYAPP.utilities.Array,
        version: "2.0",
        toArray: function (obj) {
            // ...
        }
    }
    
    // 이 생성자 함수를 반환한다.
    // 이 함수가 새로운 네임스페이스에 할당될 것이다.
    return Constr;

})();

var arr = new MYAPP.utilities.Array(obj);

arr.toArray("abc")

// p.119
```
이렇게 생성자와 프로토타입 부분에 뭔가를 더 할 수 있겠다.  
의존성 부분, 비공개 부분, 공개 API 부분, 그리고 그것들을 활용한 생성자 부분, 그 생성자의 프로토타입 부분

#### 모듈에 전역 변수 가져오기

그리고 결국 이거.  
IIFE 에 인자를 전달하는 것을 생각해볼 수 있겠다.  
특히 글로벌 객체, 전역 어플리케이션 네임스페이스 객체를 전달해줄 수 있다면,  
"그것들을 지역변수로 사용할 수 있기 때문에, 탐색 작업이 좀 더 빨라진다."
```javascript
MYAPP.utilities.module = (function (app, global) {
    // 전역 객체에 대한 참조와
    // 전역 애플리케이션 네임스페이스 객체에 대한 참조가 지역 변수화 된다.
})(MYAPP, this);
// 이렇게 글로벌 컨텍스트 상에서 var MYAPP = MYAPP || {} , 글로벌 this 가 모듈에 전달되는 것을 안다.
```

### 샌드박스 패턴

모듈 패턴은 너무 좋아보인다.  
샌드박스 패턴은 왜 나올까?  

하나의 네임스페이스를 갖는 패턴은 다음과 같은 단점을 갖는다.
- 단 하나의 전역변수에 의존한다. 따라서 동일한 애플리케이션, 라이브러리의 두가지 버전을 한 페이지에서 실행시키는 것이 불가능
- MYAPP.utilities.array 와 같이 점으로 연결된 긴 이름을 써야 함. 런타임에 그만큼의 탐색 작업이 필요함.

> 어떤 모듈이 다른 모듈과 그 모듈의 샌드박스에 영향을 미치지 않고 동작할 수 있는 환경을 제공한다. (p.120)

#### 전역 생성자

