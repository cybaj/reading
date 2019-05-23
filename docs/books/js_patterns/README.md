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
그런데 샌드박스 패턴이라니, 뭐지.  
샌드박스 패턴은 왜 나올까?  

하나의 네임스페이스를 갖는 패턴은 다음과 같은 단점을 갖는다.
- 단 하나의 전역변수에 의존한다. 따라서 동일한 애플리케이션, 라이브러리의 두가지 버전을 한 페이지에서 실행시키는 것이 불가능
- MYAPP.utilities.array 와 같이 점으로 연결된 긴 이름을 써야 함. 런타임에 그만큼의 탐색 작업이 필요함.

그렇다면 샌드박스 패턴이란 게 뭘까 일단  
> 어떤 모듈이 다른 모듈과 그 모듈의 샌드박스에 영향을 미치지 않고 동작할 수 있는 환경을 제공한다. (p.120)

#### 전역 생성자

기존 *네임스페이스 패턴*에서는 글로벌은 `MYAPP` 같은 것으로써, 하나만 있게 된다.  
*샌드박스 패턴*에서는 생성자가 유일한 글로벌이다.  

일단 `MYAPP` 같은 네임스페이스를 역할을 하는 `box`를 받아 어느 스코프 안에서 처리하는 게 하는 것이다. 
```javascript
new Sandbox(function (box) {
    // 여기에 코드들
});
```
이렇게 네임스페이스를 받는 함수로 묶으면 될 것이고,  
그 함수를 샌드박스 생성자에 전달한다.
(샌드박스 생성자는 유일한 글로벌이다.)

여기에 두가지 부분을 추가하고자 한다고 한다.
- new를 강제하는 패턴을 넣어, new 없이 사용할 수 있게 함.
- Sandbox를 통해 모듈로 구현된 필요한 처리들을 모아 제공하고자 할 것이고, Sandbox() 생성자가 필요한 그 모듈 이름에 대한 정보를 받을 수 있는 선택적인 인자를 만든다.  

이중 앞에 것, new를 강제하는 패턴은 아래와 같다.
```javascript
function Waffle() {
    // 아래 조건문은 "현재 실행되는 함수(callee)가 this와 같다면" 그러니까, this는 그 매핑 규칙에 의해, 함수를 호출한 것이 될 수 있고, new에 의해 되었다면 스스로일 수 있기 때문에, 결국 "new 에 의해 함수가 실행됐다면"
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee()
    }
}

// p.58
// 이 코드의 callee는 ES 5의 Strict Mode에서는 동작 안함. 따라서 이것을 위의 경우 'Waffle'로 명시해주어 이용한다.
```

그렇다. 우린 갖고 있는 모듈들로 기능을 제공하고자 하고, 해당 기능 로직을 콜백함수로 샌드박스 내부 환경에 격리시킬 것이다. 필요한 모듈 이름을 전달할 것이다. 바람직한 동작을 막기 위해 new를 강제하는 패턴을 둘 것이다.
```javascript
Sandbox(['ajax', 'event'], function (box) {
    // console.log(box);
})

// p.121
```
sandbox 를 통한 구현 안에 또 다른 sandbox를 두더라도, 둘의 scope는 간섭이 없다.
```javascript
Sandbox('dom', 'event', function (box) {
    /*
        dom 과 event를 가지고 작업하는 코드
    */
    Sandbox('ajax', function (box) {
        // 여기에 box 는 위 box 와 격리
        /*
            ajax 를 가지고 작업하는 코드
        */
    })

    // 더이상 ajax에 관련된 내용 없음
})

// p.122
```
- 원하는 유형별로 모듈의 인스턴스를 여러개 만들 수 있다.
- 필요하다면 함수는 곧 객체이기 때문에 Sandbox() 생성자의 '스태틱' 프로퍼티에 데이터 저장.
- 콜백함수로 코드를 감싸, 전역 네임스페이스를 보호.

#### 모듈 추가하기

자, 여태까지는 Sandbox를 어떻게 사용할 것이냐에 대한 내용이었다. 그러니까 모듈을 갖다가 어떻게 쓸 것이냐에 대한 내용이었다.  
이제 갖다 쓸 모듈들을 어떻게 갖다 쓸 수 있게 Sandbox에 달아두겠느냐.

```javascript
Sandbox.modules = {};

// dom 이란 모듈을 app 객체에 해당 로직을 달게 만든다.
Sandbox.modules.dom = function (box) {
    box.getElement = function () {}
    box.getStyle = function () {}
    box.foo = "bar"
}

// event 모듈도 app 객체에 달리게 하자.
Sandbox.modules.event = function (box) {
    box.attachEvent = function () {};
    box.detachEvent = function () {};
    //필요에 따라서 Sandbox 프로토타입에 접근도 할 수 있다.
    // box.constructor.prototype.m = "mmm"
}


// ajax 모듈도 app 객체 달자.
Sandbox.modules.ajax = function (box) {
    box.makeRequest = function () {};
    box.getResponse = function () {};
}

// p.123
```

#### 생성자 구현

사용할 modules을 다는 방법도 배웠고, Sandbox를 사용하는 것도 배웠으니 (`Sandbox('ajax', function(box) { // ... })`)  
이제 이 Sandbox 생성자를 어떻게 만들 것이냐를 배우자.  

```javascript
function Sandbox() {
    // arguments => 배열
    var args = Array.prototype.slice.call(arguments),
    // Sandbox 의 사용
    // Sandbox('dom', 'event', function (box) { // ... } )
    // 마지막 인자는 처리 내용이 담긴 콜백함수 이므로
        callback = args.pop(),
        modules = (args[0] && typeof args[0] === "string") ? args : args[0],
        i;

    // 함수가 생성자로 호출되도록 보장한다.
    if (!(this instanceof Sandbox)) {
        return new Sandbox(modules, callback);
    }

    // this에 필요한 프로퍼티들을 추가한다.
    this.a = 1
    this.b = 2

    // 코어 'this' 객체에 모듈을 추가한다
    // 모듈이 없거나 "*" 이면 사용 가능한 모든 모듈을 사용한다는 의미다.
    if (!modules || modules === '*' || modules[0] === '*') {
        modules = [];
        for (i in Sandbox.modules) {
            if (Sandbox.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }

    // 필요한 모듈들을 초기화한다. 그러니까 this (app 객체가 될 것)에 모듈 로직을 달자.
    for (i = 0; i < modules.length; i += 1) {
        Sandbox.modules[modules[i]](this);
    }

    // 콜백 함수를 호출한다. 모듈을 달고 있는, 초기화된 app 객체를 이제 그 모듈들을 활용한 처리하는 격리된 부분인 콜백함수에 전달해 호출한다.
    callback(this)
}
```
결국 하려는 것은 어떤 모듈처리를 활용한 처리를 하고 싶은 것이고,  
필요로 하는 모듈이 달려 있는 app 객체를, 활용하는 로직이 담겨있을, 격리되어 있는 콜백 함수에 전달해 호출한다.  

이렇게 모듈로 제공된 기존의 처리를 활용한 처리를 할 수 있는  
공간을 제공하는데, 그것이 격리되어 있어 좋은 것.  

앞서 배운 모듈을 정의하는 방법으로써 __모듈 패턴__과 그 모듈을 활용하는 인터페이스 층을 만드는 방법으로 __샌드박스 패턴__을 이해하게 되었다.  
콜백함수 안에서 정의한 모듈을 맘대로 하여 쓴다.  

다시 또 생각해보면, __모듈 패턴__ 역시 의존하고 있는 모듈을 가져와서 사용하고 있다. 그런데 모듈을 정의하는 방법으로써 __모듈 패턴__을 보게 된 것은, 아무래도 공개하고자 하는 API를 선택해 공개하는 것 때문인 거 같다. 

모듈을 사용하는 입장에서 __모듈 패턴__ 과 __샌드박스 패턴__ 의 큰 차이는, 결국 콜백으로 처리로직을 감싸주는 것인 것으로 생각되었다. 사용하는 모듈은 그에 각각에 맞게 정의되어 있어야 할 것 같다.

### 스태틱 멤버

js에서 공개 스태틱 멤버, 비공개 스태틱 멤버를 구현하는 방법을 배워본다.

#### 공개 스태틱 멤버

```javascript
// 생성자
var Gadget = function () {}

// 스태틱 메서드
Gadget.isShiny = function () {
    return "you bet"
}

// 프로토타입에 일반적인 함수를 추가.
Gadget.prototype.setPrice = function (price) {
    this.price = price;
}

// p.125
```
일반적인 함수는 prototype에.  
스태틱 메서드는 생성자 멤버로.

재밌는 것은 저렇게 정의한 스태틱 메서드는 인스턴스에 호출이 안된다는 것.  
그래서 prototype에도 달아준다.

```javascript
var iphone = new Gadget();
typeof iphone.isShiny; // "undefined"
```
```javascript
Gadget.prototype.isShiny = Gadget.isShiny;
iphoen.isShiny(); // "you bet"

// p. 126
```
더 재미있는 것은, 스태틱 메서드를 "스태틱하지 않은 방식"으로 호출했을 때에 대해 조건을 둘 수 있다는 것.
```javascript
// 생성자
var Gadget = function (price) {
    this.price = price;
}

// 스태틱 메서드
Gadget.isShiny = function () {

    // 다음은 항상 동작한다.
    var msg = "you bet";

    // 다음은 스태틱하지 않은 방식으로, 그러니까 인스턴스에서 호출 되었을 때만 동작한다.
    if (this instanceof Gadget) {
        msg += ", it costs $" + this.price;
    }

    return msg;
}

// 프로토타입에 추가하는데, 이번에는 call을 이용해서. 여기서의 this는 인스턴스가 될 것.
// call 없이 스태틱 메서드를 호출한다면, 그냥 msg = "you bet"이 되겠지.
Gadget.prototype.isShiny = function () {
    return Gadget.isShiny.call(this);
}

// p. 127
```

#### 비공개 스태틱 멤버

비공개 스태틱 멤버란,
- 동일한 생성자 함수로 생성된 객체들이 공유하는 멤버다.
- 생성자 외부에서는 접근할 수 없다.

prototype에 정의된 일반 함수와의 차이가 있다. 각 인스턴스가 갖는 함수가 아니라, 인스턴스들이 공유하는 함수다.

```javascript
var Gadget = (function () {

    // 스태틱 변수/프로퍼티
    var counter = 0

    // 
    return function () {
        console.log(counter += 1);
    }
})()

var g1 = new Gadget(); // 1이 출력된다.
var g2 = new Gadget(); // 2이 출력된다.
var g3 = new Gadget(); // 3이 출력된다.
```
closure 로 모든 instance가 동일한 counter 를 공유하고 있게 된다.  
하나씩 늘어나고 있는데  
객체의 유일성을 식별하는 ID로 쓸 수 있겠다.  
쓸모가 많으니, 특권 메서드로 노출시키자.  
앞서서 생성자로 쓸 함수객체를 return 문에 바로 선언해버리면, 인스턴스의 멤버함수를 prototype 으로 줄 수 없으니,  
앞서 생성자로 쓸 함수객체를 선언하고, 이것의 prototype을 선언한다.  같은 함수 안에 정의 되어 있어 closure로 counter를 따오게 될 것.

```javascript
var Gadget = (function () {

    var counter = 0
        NewGadget;

    NewGadget = function () {
        counter += 1
    }

    NewGadget.prototype.getLastId = function () {
        return counter
    }

    return NewGadget

})();

var iphone = new Gadget();
iphone.getLastId();

var ipod = new Gadget();
ipod.getLastId();

// p.129
```

이렇게 여러 인스턴스가 공유하는 값에 대한 스태틱 함수를 사용할 수 있게 되었다.  
정말 편하고 중요한 것은 공유하고자 하는 값을 colsure 로 받을 수 있게 함수 안에서 선언해주고,  
생성자 역할을 할 함수객체를 처리를 IIFE로 묶어 처리해 얻어내는 것.  
이런 방법은 자주 쓰일 것이고, 편리하다.  
모든 함수는 객체인 것이 중요하게 언급되는데, 난 모든 그것보다, (함수가 일급객체가 아닌 언어에서 생성자가 객체를 만들어내고 있었고) js에서 객체를 만들어내는 함수를, 또다른 함수를 통해 정해서 뱉을 수 있다는 것이 자연스러워야 겠다고 생각됐다.  

### 객체 상수

이제 const 를 쓰자.

이전에는 비공개 프로퍼티를 만들고, setter 없이 getter 만 만드는 방법으로 만들었다고 한다.

### 체이닝 패턴

```javascript
myobj.method1("hello").method2().method3("world").method4()
```
배우고 싶었던 패턴이다. 아마도 계속 처리 객체를 리턴하는 방식이겠다 생각을 했는데
> 만약 메서드에 의미있는 반환 값이 존재하지 않는다면, 현재 작업중인 객체 인스턴스인 this를 반환하게 한다. 이렇게 하면 객체의 사용자는 앞선 메서드에 이어 다음 메서드를 바로 호출 할 수 있다. (p.132)

```javascript
var obj = {
    value: 1,
    increment: function () {
        this.value += 1;
        return this;
    },
    add: function (v) {
        this.value += v;
        return this;
    },
    shout: function () {
        alert(this.value);
    }
}

obj.increment().add(3).shout(); // 5

// p.132
```
스스로를 반환하고 있다.  

### method() 메서드

> 재사용 가능한 메서드는 생성자의 prototype 프로퍼티에 추가되어야 한다. 그런데 prototype이란 것이 다른 개발자들에게는 낯선 개념일 수 있기 때문에, method()라는 메서드 속에 숨겨두는 것이다. ... 여기서는 method()라는 메서드를 'syntax sugar'로 ... ( p. 133 )

쓰진 않겠지만, 구현 방법을 봐두면,
```javascript
if (typeof Function.prototype.method !== "function") {
    Function.prototype.method = function (name, implementation) {
        this.prototype[name] = implementation;
        return this;
    };
}
```
Function의 프로토타입에 method를 붙이고, 모든 function에 붙을 것이고, 체이닝해서 
```javascript
var Person = function (name) {
    this.name = name;
}.
method('getName', function () {
    return this.name;
}).
method('setName', function (name) {
    this.name = name;
    return this;
});
```
호출하고 있기 때문에, this는 생성자 함수 객체를 참조하여, prototype에 함수를 추가케 하고 있다.

### 나름의 실전 문제
이로써, 객체 생성패턴을 다 보았는데,  
보면서 jquery-color plugin이 생각이 났다. 얼마전에 이를 vue의 어느 컴포넌트에서 갖다쓰고자 했을 때, 그 스크립트를 jQuery를 인자로 받는 함수로 싸고 그 함수를 export 하는 식으로 가져다 썼는데, 이렇게 쓸 수 있었던 것은 jquery-color 스크립트가 jQuery 라는 네임스페이스를 동일하게 사용하여 뭔가 처리를 하고 뭔가를 추가하고 있었기 때문이었다.  

[jquery-color](https://github.com/jquery/jquery-color/blob/master/jquery.color.js) 에서, 필요 없을 거 같아 지워버렸던 앞 부분에 대해 이제 이해해보고 싶다. 내용은 AMD와 factory 패턴인 것 같다.
```javascript
/*!
 * jQuery Color Animations v@VERSION
 * https://github.com/jquery/jquery-color
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: @DATE
 */

( function( root, factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else if ( typeof exports === "object" ) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( root.jQuery );
	}
} )( this, function( jQuery, undefined ) {

	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor " +
		"borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	class2type = {},
	toString = class2type.toString,

    // ...
```

## 코드 재사용 패턴

기존 코드를 최대한 재활용하자. 가장 먼저 상속인데.  
클래스 방식의 상속과 그렇지 않은 상속 몇 가지를 살펴볼 것이다.  
그러나 결국 목적은 코드를 재사용하는 것이다.  
- 다른 객체와 합성하는 방법
- 믹스인 객체를 사용하는 방법
- 어떤 것도 영구히 상속하지 않으면서 필요한 기능만 빌려와서 재사용하는 방법
> '클래스 상속보다 객체 합성을 우선시하라.' - GoF

### 클래스 방식 vs. 새로운 방식의 상속 패턴

'클래스 방식' 상속이란? "자바스크립트에는 클래스가 없고, 인스턴스라는 개념도 잘 맞지 않는다. 자바스크립트의 객체는 단순히 키-값의 쌍들일 뿐이며 언제든지 생성하고 변경할 수 있다."  
"그러나 자바스크립트의 생성자 함수와 new 연산자 문법은 클래스를 사용하는 문법과 매우 닮아 있다."

```java
Person adam = new Person();
```
```javascript
var adam = new Person();
```
java는 강타입 언어니까 Person 타입을 명시하는 거 빼고는.  
new로 호출하더라도 Person 은 여전히 함수이고.  
여하튼 '클래스 방식'과 '새로운 방식' 순으로 살펴본다.

> 프로젝트에 상속 패턴을 도입하는 데는 몇 가지 선택지가 있을 수 있다. 그러나 클래스가 전혀 관련되지 않는다는 사실을 팀원들이 정말로 불편해하는 게 아니라면, 항상 새로운 방식의 패턴을 선택해야 한다. (p.138)

### 클래스 방식의 상속을 사용할 경우 예상되는 산출물



