---
title: The Linux Network Administrators' Guide
description: 책 읽기
sidebar: auto
lang: ko-KR
meta: 
  - name: keywords
  - content: linux network
---

# 리눅스 네트워크 관리자 가이드 책 읽기

## 1.1 History

번역본을 간단하게 보면서,  
개념, CLI 프로그램 정리 식으로 해보는 느낌으로 정리해보자.  

책은 2가지 네트워크에 대해 기술한다고 한다. 하나는 `UUCP` 기반,  하나는 `TCP/IP` 기반이다. `네트워크 = 프로토콜 + 소프트웨어 패키지` 

> 네트워크는 상호간에 교신 할 수 있는 호스트(host)의 모음이라고 정의할 수 있다.

## 1.2 UUCP Networks

`Unix-to-Unix Copy` 1977 Bell lab에서 개발. 느린 속도. 이러한 제약. 저렴해서 쓰이고 있었다 함. 느린 것은 "호스트가 일정간격을 두고 dial-up으로 상호간에 연결을 하므로 ... 대부분의 소요시간은 다음번 연결을 기다리며 호스트의 디스크에 낭창하게 앉아 있는데 있는 것이다." 구현할 때 필요한 것은 모뎀, 작동중인 UUCP Implementation, 그리고 메일과 뉴스를 제공 받기를 원하는 또다른 UUCP 노드.

### 1.2.1 How to Use UUCP

이름에서 보이듯, 단순히 한 호스트에서 다른 호스트로 파일을 복사하는 것.  
당신의 머신이 _swim_ 이라는 가상의 호스트에 접근이 허용.  
lpr 커맨드를 실행시키고 싶다면,  
```
$ uux -r swim!lrp !netguide.dvi
```
uux : UUCP suite 커맨드  
_swim_ 의 작업을 스케쥴하도록 한다. 무슨 작업이냐. netguide.dvi 라는 입력파일을 lpr에게 feed하도록 요청한다.  
-r flag는 즉시 요청 않고, 다음번 연결 때까지 job을 저장. 이를 __spooling__ 이라고 함.

```
$ uucp -mr swim!groucho!~/security/tripwire-1.0.tar.gz trip.tgz
```
"생성된 job은 _groucho_로부터 파일을 가지고 오도록 _swim_에 요청하고, 당신의 사이트에 __trip.tgz__라는 이름으로 저장되고 파일의 도착을 알리는 mail이 전달될 것이다."

뭔가 job 이라는 것이 가지고 있을 수 있는 것이고, 기다리다가 그것이 실행되기도 하고, 그런 것 같다.  

## 1.3 TCP/IP Networks

UUCP 는 store-and-forward. LAN 에서 적절한가?  
UUCP : job description (작업 수행 순서도) 에 따라 전체 파일을 포워드  
packet-switched 네트워크 : 모든 데이터를 작은 조각 packet 으로 나누어 즉시 목적지 호스트로 보내고 거기서 재조합 된다.  

UNIX system 은 TCP/IP 를 쓰게 된다.

### 1.3.1  Introduction to TCP/IP Network

DARPA의 ARPANET. 1987년 TCP/IP  표준. LAN에 주로 사용되었다고 함. 그 예로 옛날에 Groucho Marx University 에서 이렇게 사용했다고 함. _erods_ 란 이름의 호스트로 LAN에 연결되어 물리학과의 _quark_ 에 접근한다면.
```
$ rlogin quark.physics
Welcome to the Physics Department at GMU
(ttyq2) login:
```

_quark_ 에 연결ㄷ괴어 있는 동안, X11 기반 어플리케이션 예를 들어 그래프 보는 프로그램 같은 거를 실행하고 싶다면, __DISPLAY__ 환경변수를 지정해야 한다.

```
export DISPLAY=erdos.maths:0.0
```

이후 어플리케이션을 실행하면, _quark_ 대신의 내 X서버와 접촉해 내 화면에 그 프로그램의 모든 윈도우를 표시해줄 것이다. 놀랍다. 예전에 해본 것이 이런 것이었다.  DISPLAY 환경변수와 X11 서버와의 TCP/IP 의 패킷 통신이었다니.

이외 TCP/IP 네트워크에서 할 수 있는 거 보자. NFS __NEtwork File System__ 다른 호스트에서 디렉토리 영역을 local 파일 시스템처럼 mount 하도록 하는 것. 하둡 파일시스템이나 예전에 가상 머신 같은 거 써볼때 그런 것이 이것이 아닐까?  

이런 가능성이 무궁무진하다.

### 1.3.2 Ethernets

LAN 에서 가장 많이 쓰는 하드웨어 종류는 보통 이더넷 (Ethernet)
`Ethernet = Conector + tap or transceiver` <=> 단일 케이블 <=> 다른 호스트  

케이블 별로 이더넷 종류를 나눌 수 있다. thick, thin, twisted pair ... 예전에 랜선을 만들어 봤는데, 여러 종류의 랜선이 사용될 수 있었다. 

이더넷 기술의 저해하는 요인 중 하나로 케이블 길이의 제한. 맞다. 그래서 중간에 신호 증폭 등을 해주는 네트워크 장비 repeater, bridge, 또는 router 가 있었다.

이더넷 호스트는 이더넷 보드 펌웨어에 하드코드된 6바이트 수로 주소화 된다. aa:bb:cc:dd:ff:

### 1.3.3 Other Types of Hardware

이더넷 말고 FDDI Fiber Distributed Data Interface 등이 이용될 수도 있다. 그러면 이더넷은 광케이블 통신이 아니구나. 광통신 인터페이스와 개인 호스트의 이더넷과 사이에 통신될 수 있게 뭔가 있는건가. 

### 1.3.4 The Internet Protocol 

IP 프로토콜. 대략 예전에 배운 내용.
> 우리는 주소의 3가지 다른 양식을 알고 있다. 하나는 quakr 와 같은 호스트명 hostname 또 하나는 IP 주소, 그리고 마지막으로 이더넷의 6바이트 주소와 같은 하드웨어 주소

> 호스트명을 IP주소로 매핑할 때는 _hostname resolution_ 이라고 하고, IP 주소를 하드웨어 주소로 매핑할 때는 _address resolution_ 이라고 부른다.

### 1.3.5 IP over Serial Lines

IP 는 다른 라인에서도 사용될 수 있다.  
시리얼 라인에서는 SLIP Serial Line IP 이 디펙토. 

### 1.3.6 The Transmission Control Protocol

IP 는 신뢰성을 보장하지 않는다. GMU의 FTP서버에서 XFree86 을 일제히 받는다고 하면 이 전송량을 게이트웨이가 다루기에 너무 느리고, 메모리 소진이 큰 일이 된다. IP는 패킷을 버려버린다.

이런 일은 TCP 프로토콜이 맞는다. IP의 최상층, 신뢰성 있는 서비스 구축. TCP의 근본적인 특징은 당신의 호스트와 리모트 머신의 두 프로세스 간에 연결되어 있는 것 같은 환상을 주는 것이다. 전화통화처럼 양쪽이 쓰고 읽는 것이다.

TCP는 두 호스트의 IP 주소와 호스트 상의 포트 port 라 불리는 수로써 커넥션의 말단 지점을 인식. 

아래 내용이 재밌다.
> _rlogin_ 에서 클라이언트 프로그램( _rlogin_ )은 erdos의 포트를 열고 __quark__ 의 513번 포트, 즉 rlogind 서버가 listen (특정 포트로 접근하는 클라이언트의 요청을 기다리는 것) 하고 있는 곳에 연결한다. 이것이 TCP 커넥션을 수립하고, 이 커넥션을 사용하여 __rlogind__ 는 인증절차를 수행하고 쉘을 준다. 쉘의 표준입력과 출력은 TCP 커넥션으로 redirect 되므로 당신 머신의 _rlogin_ 에 쳐넣은 것들은 TCP 스트림을 따라 통과하여 그 쉘의 표준 입력으로 전해진다. 

소켓통신이라고 listen 하는 것이 TCP 프로토콜에 맞춘 프로그래밍을 하는 것으로 정리할 수도 있겠구나.

### 1.3.7 The User Datagram Protocol

> 만약에 학과의 중앙 NFS 서버( _galios_ ) 의 TEX 디렉토리를 mount 했다고 가정하고 LATEX의 사용법을 설명한 문서를 보길 원한다고 생각해보자. 당신은 초기에 파일의 전부를 읽어내는 편집기를 실행하나, 그것은 _galios_ 와 TCP 커넥션을 성립하고, 파일을 보내고, 양도하기엔 너무도 과중하다.
TCP 로 신뢰성을 주면서 파일 전체를 다 보낸 후에 확인하는 식은, 과중하다.
> 그래서 그 대신에 _galios_ 로의 요청이 생기면 그것은 그 파일을 몇개의 UDP 패킷으로 나누어 그냥 보는데, 이 편이 훨씬 빠르다. 그러나 UDP는 패킷 유실이나 손상에 관해선 고려하지 않으므로 (이 경우 NFS처럼) 어플리케이션이 이에 관해 조치하도록 한다. 
UDP 로 통신하는 프로그램을 구현해본 적이 없는데, 한번 해보면 좋겠다. 동영상 스트리밍 같은 것들이 전부 이러한 것이지 않을까? 그 쪽으로 찾아보면 뭐가 나오려나.

### 1.3.8 More on Ports

여러 클라이언트가 각기 다른 포트를 가지고 서버에 같은 포트에 연결될 수 있다. 포트는 랑데뷰 지점 같다는 얘기. 이 서비스 포트에 대한 약속이 있다는 얘기. IETF ( _Internet Engeneering Task Force_ ) 에서 _Assigned Numbers_ 라는 주제의 RFC를 내놓았었다는 얘기. 리눅스는 `/etc/services` 에서 찾아볼 수 있다는 얘기. 실제로 이 라즈베리파이는 MATE 라는 OS를 쓰는데, _well-known services_ 들에 대해 그들 각각이 사용하는 TCP, UDP 포트를 정리해두었다. (최근에는 TCP, UDP로 포트번호를 나누지 말고 하나의 포트번호가 TCP, UDP에 같이 적용된다고, IANA의 정책에 따르면)

### 1.3.9 The Socket Library

유닉스, 리눅스 상에서 모든일 을 수행하는 소프트웨어와 위에 기술된 프로토콜은 보통 커널의 일부다. 이런 프로그래밍 인터페이스, _Berkely Socket Library_ 로 포트를 소켓으로, 포트에 연결하는 것을 플러그를 꽂는 것에 비유.

connect(2), listen(2), and accept(2) 를 활용해서 연결 하거나 청취하는 서비스를 bind(2) 특정화하는 콜을 제공한다. 이것은 TCP/IP( _AF\_INET_ )에만 한정되지 않고 머신의 로컬 연결을 제어하는 클래스 ( _AF\_UNIX 클래스), XNS Xerox Networking System 프로토콜, X.25 같은 클래스도 제어 할 수 있다고 한다.

리눅스에서 소켓 라이브러리는 표준 libc C 라이브러리. _AF_INET_ 과 _AF\_UNIX_ 
 이 됐다고 하는데, 지금은?

## 1.4 Linux Networking

리눅스는 네트워크를 중요하게 생각했고, 여러 역사가 있었고, 다양한 네트워크를 제공하고자 노력 여하튼 발전방향은 "인터넷 호스트로서 운용되기 위한 안정성과 신뢰성"

### 1.4.1 Different Streaks of Development

Net-2e 때 DDI (_Device Driver Interface_ ) 가 포함되었고, DDI 는 모든 테워킹과 프로토콜에 공통된 형태의 접근과 설정 메소드를 제공.
Net-3 에 커널에 "module"이 추가 되어 런타임에 커널에 드라이버를 추가할 수 있게 되고.

어플은 여하튼 네트워크 커널에 맞춰서 실행된다.

### 1.4.2 Where to get the code

... 

## 1.5 Maintaining Your System

> 이 책을 통해 우리는 설치와 설정에 관해 주로 다룰 것이다. 그러나 관리는 그 이상의 것을 요한다.

> 확실한 최소의 유지방안은 시스템과 어플리케이션 로그 파일을 에러상태와 비정상적인 이벤트에 관해 체크하는 것이다. 보통, 이러한 일을 몇개의 쉘 스크립트를 작성하고, cron에서 정기적으로 이를 실행하길 원할 것이다. 어떤 주요 어플리케이션의 소스 배포판, 이를 테면 smail이나 C News같은 것은 이러한 스크립트를 내포하는데, 이를 당신의 요구와 기호에 따라 짜집기 하면 된다.

> 어떤 cron job의 산출물은 mail로써 관리자 계정에 전해지는데, 기본적으로 많은 어플리케이션들이 에러 보고, 사용 통계, 또는 로그파일의 요약을 root계정으로 보낼 것이다. 이는 당신이 root계정으로 종종 로그인 해야만 알 수 있는 것으로, 더 나은 방법은 mail alias를 지정함으로써 root의 mail을 당신의 개인 계정으로 포워드 시키는 것이다. 이에 관해선 14장에서 보고자 한다.

### 1.5.1 System Security
