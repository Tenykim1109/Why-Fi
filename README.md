# 와이파이(Why.Fi)

![image](/README.asset/new_logo.png)

**어린이를 위한 금융 교육 플랫폼, Why-Fi**

> Why-Fi는 금융 지식은 어렵다는 편견에서 출발했어요.<br><br>
> 딱딱함을 줄이고, 재미와 귀여움을 조금 더 강조했어요.<br>
> 통장 개설부터 예금, 적금, 모의 주식까지<br>
> Why-Fi를 즐기면서 금융 지식도 함께 얻어가세요!

<div align="center">
    <a href="https://k6d108.p.ssafy.io"> 💻 Why-Fi 체험하기 </a>
</div>

<br><br>

## 팀 소개

| 이름   | 담당 업무 | 연락처            |
| ------ | --------- | ----------------- |
| 김민정 | FE/Phaser | lona573@gmail.com |
| 장수원 | BE        | asdf@lalala.io    |
| 남근호 | FE        | asdf@lalala.io    |
| 이재성 | FE        | asdf@lalala.io    |

<br>

## 아키텍처

<br>

![image](/README.asset/architecture.jpg)

<br>

## 주요 기능

- NPC와의 상호작용을 통해 은행의 주요 업무인 예금, 적금 개설을 체험해볼 수 있어요.
- 차트 게시판에서 주식 거래가 가능하고, 오늘의 주식 동향을 알아볼 수 있어요.
- 도우미 NPC에게서 다양한 금융 지식을 배울 수 있어요.
- 퀴즈를 풀면서 Why-Fi를 사용하며 얻은 금융 지식을 확인할 수 있어요.

<br>

## 세부 기능

| 구분 | 기능                     | 설명                                                                                                                 | 비고 |
| :--: | :----------------------- | :------------------------------------------------------------------------------------------------------------------- | :--- |
|  1   | 서비스 소개              | 서비스 배경 및 실제 서비스 내용 확인함                                                                               |      |
|  2   | 캐릭터 선택              | 사용자는 로그인 후 남자 캐릭터/여자 캐릭터 중 하나를 선택하여 인게임에 접속                                          |      |
|  3   | 캐릭터 움직이기          | 사용자는 방향키를 사용하여 캐릭터를 조작할 수 있음                                                                   |      |
|  4   | NPC 및 오브젝트 상호작용 | 사용자는 인게임 내의 NPC 및 일부 오브젝트와 상호작용이 가능                                                          |      |
|  5   | 튜토리얼                 | 사용자는 인게임에 처음 접속했을 때 튜토리얼 진행. <br> 진행하지 않을 경우 진행할 때 까지 팝업, 은행 업무 이용 불가능 |      |
|  6   | 예금 개설                | 사용자는 예금 담당 NPC와의 상호작용으로 정기 예금을 개설할 수 있음                                                   |      |
|  7   | 적금 개설                | 사용자는 적금 담당 NPC와의 상호작용으로 정기 적금을 개설할 수 있음                                                   |      |
|  8   | 송금하기                 | 사용자는 송금 담당 NPC 및 ATM기 오브젝트와의 상호작용으로 다른 플레이어에게 송금할 수 있음                           |      |
|  9   | 주식 차트 확인           | 사용자는 화면 상단의 게시판을 사용하여 주식 가격 변동 그래프를 확인할 수 있음                                        |      |
|  10  | 오늘의 주식 뉴스         | 주식 가격 변동과 연관된 뉴스 기사를 확인할 수 있음                                                                   |      |
|  12  | 주식 구입                | 사용자는 주식 매수 폼을 작성하여 주식을 원하는 수량만큼 구입할 수 있음                                               |      |
|  13  | 주식 판매                | 사용자는 주식 매도 폼을 작성하여 주식을 원하는 수량만큼 판매할 수 있음                                               |      |
|  14  | 도움말                   | 사용자는 도우미 NPC 및 예금/적금/주식 화면의 도움말 버튼을 클릭하여 각 기능에 대한 지식을 공부할 수 있음             |      |
|  15  | 퀴즈                     | 사용자는 퀴즈 머신과 상호작용하여 지금까지 얻은 금융 지식을 확인할 수 있음                                           |      |
|  16  | 컴퓨터                   | 사용자는 컴퓨터 오브젝트와 상호작용하여 웹 사이트를 이용할 수 있음                                                   |      |
|  17  | 내 통장 확인             | 화면 우측 하단의 메뉴 버튼 -> 내 통장 정보를 클릭하여 현재 자산을 확인할 수 있음                                     |      |
