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
