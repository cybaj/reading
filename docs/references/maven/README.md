---
title: maven
description: Maven 문서 읽기
sidebar: auto
lang: ko-KR
meta: 
    - name: keywords
    - content: maven
---
# Maven Reference 읽기

[Maven](https://maven.apache.org/what-is-maven.html) 읽어가기

## What is Maven?

### Introduction

Yiddish word, _accumulator of knowledge_

### Maven's Objectives

- Making the build process easy
- Providing a uniform build system
- Providing quality project information
- Providing guidelines for best practices development
- Allowing transparent migration to new features

### Making the build process easy

build process 메카니즘을 여전히 알아야하지만, 디테일은 안챙겨도 되게 해줌

### Providing a uniform build system

Maven 을 사용한 프로젝트는 POM, project object model 을 통해서 빌드 할 수 있으며, Maven 을 사용 중인 다른 프로젝트들이 공유하는 플러그인을 공유할 수 있다. 이것이 편하다.

### Providing quility project information

POM 으로부터 프로젝트에 대한 유용한 정보를 제공한다.  
예를 들어  
- 소스 컨트롤으로 생기는 로그 문서 변경 Change log document created directly from source control
- Cross referenced sources ??
- 메일링 리스트 List of mailing lists managed by the project
- 의존성 리스트 Dependency list
- 커버리지를 포함한 유닛 테스트 보고서 Unit test reports including coverage

### Providing guidelines for best practices development

적절한 개발에 대한 가이드라인을 제공한다.  
유닛 테스트의 명세, 실행, 리포팅이 Maven 을 이용한 빌드과정에 사용될 수 있다.  
그리고 이에 대한 가이드라인을 제공한다.  
- 테스트 코드를 소스 트리로 부터 분리 Keeping test source code in a separate, but parallel source tree
- naming convention 사용 Using test case naming conventions to locate and execute tests
- 테스트 환경을 세팅 해라 Having test cases setup their environment instead of relying on customizing the build for test preparation

### Allowing transparent migration to new features

예를 들어 플러그인의 업데이트, 새로운 플러그인의 사용, 아니면 Maven 스스로의 업데이트가 투명해지고 쉬워진다.

## What is Maven Not?

- Maven is a site and documentation tool
- 의존성을 다운받을 수 있게 Ant를 확장한 것 Maven extends Ant to let you download dependencies
- Maven is a set of reusable Ant scriptlets

세가지 다 할 수 있지만, 그것이 목적이 아니다.  
여튼 세가지 다 가능하다.  

## Features

Simple project setup that follows best practices - get a new project or module started in seconds
Consistent usage across all projects - means no ramp up time for new developers coming onto a project
Superior dependency management including automatic updating, dependency closures (also known as transitive dependencies)
Able to easily work with multiple projects at the same time
A large and growing repository of libraries and metadata to use out of the box, and arrangements in place with the largest Open Source projects for real-time availability of their latest releases
Extensible, with the ability to easily write plugins in Java or scripting languages
Instant access to new features with little or no extra configuration
Ant tasks for dependency management and deployment outside of Maven
Model based builds: Maven is able to build any number of projects into predefined output types such as a JAR, WAR, or distribution based on metadata about the project, without the need to do any scripting in most cases.
Coherent site of project information: Using the same metadata as for the build process, Maven is able to generate a web site or PDF including any documentation you care to add, and adds to that standard reports about the state of development of the project. Examples of this information can be seen at the bottom of the left-hand navigation of this site under the "Project Information" and "Project Reports" submenus.
Release management and distribution publication: Without much additional configuration, Maven will integrate with your source control system (such as Subversion or Git) and manage the release of a project based on a certain tag. It can also publish this to a distribution location for use by other projects. Maven is able to publish individual outputs such as a JAR, an archive including other dependencies and documentation, or as a source distribution.
Dependency management: Maven encourages the use of a central repository of JARs and other dependencies. Maven comes with a mechanism that your project's clients can use to download any JARs required for building your project from a central JAR repository much like Perl's CPAN. This allows users of Maven to reuse JARs across projects and encourages communication between projects to ensure that backward compatibility issues are dealt with.

## Use - Run

Maven 을 CLI 문법은 아래와 같다.
```
mvn [options] [<goal(s)>] [<phase(s)>]
```

The typical invocation for building a Maven project uses a Maven life cycle phase. E.g.
```
mvn package
```

Maven 라이프 사이클과 phases 에서의 프로젝트는 아래와 같이 정리된다.
- clean - pre-clean, clean, post-clean

- default - validate, initialize, generate-sources, process-sources, generate-resources, process-resources, compile, process-classes, generate-test-sources, process-test-sources, generate-test-resources, process-test-resources, test-compile, process-test-classes, test, prepare-package, package, pre-integration-test, integration-test, post-integration-test, verify, install, deploy

- site - pre-site, site, post-site, site-deploy

모든 패키지된 아웃풋을 만들고, 문서 사이트를 만들고, 저장소 관리자에게 이것을 배포하는 것까지의,  
프로젝트의 빌드를 (위에 명시된 것들이 쓰인) 아래 명령으로 할 수 있다.
```
mvn clean deploy site-deploy
```

패키지를 그냥 만들고, 이것을 다른 프로젝트에 쓸 수 있게 로컬 저장소에 설치하는 것은 아래와 명령으로 할 수 있다.  (이 명령은 엄청 흔한 build invocation 이다.)
```
mvn verify
```

프로젝트로 구현하지 않고, Maven의 한부분으로 어떤 특정한 태스크를 원할 수도 있다. 이런 것을 plugin이라고 한다. E.g.:
```
// archetype은 Tools plugin 중에 하나로 skeleton project 를 만든다.
mvn archetype:generate
```
or
```
// checkstyle은 reporting plugin 중에 하나로 checkstyle report를 만든다.
mvn checkstyle:check
```
maven 을 plugin execution framework 라고도 한다.

