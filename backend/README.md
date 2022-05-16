# api url (로컬)

### 관리자 페이지 : http://localhost:8000/admin/

### 공통 (중복되는 부분) : http://localhost:8000/api/

- 계정 (User)
  - 로그인 [POST] : accounts/signin/
    - username
    - password
  - ID 중복 확인 [GET] : accounts/idcheck/<str : username>/
  - 회원 가입 [POST] : accounts/signup/
    - username
    - password
    - password_confirm
    - name
    - birthday
  - 회원 탈퇴 [DELETE] : accounts/delete/
    - username
    - password
  - 본인 정보 [GET] : accounts/self/
  - 프로필 [GET] : accounts/profile/<str : username>/
  - 본인 확인 [POST] : accounts/selfcheck/
    - name
    - birthday
  - 계좌 비밀번호 설정 [PUT] : accounts/setpassword/
    - book_password
  - 송금 대상 확인 [GET] : accounts/bookcheck/<str : book_number>/
  - 송금 [POST] : accounts/remittance/
    - book_number
    - book_password
    - money  (0 < money <= 본인 계좌 잔액)



- 계좌 (Bankbook)
  - 본인 계좌 확인 [GET] : bankbooks/booklist/
  - 만기 금액 확인 [POST] : bankbooks/getinterest/
    - payment
    - deadline
    - book_type
  - 계좌 생성 [POST] : bankbooks/create/
    - payment
    - deadline
    - book_type
  - 계좌 해지 [DELETE] : bankbooks/<str : book_type>/ delete/
    - name
    - birthday
    - book_password
  - 주식 변동 정보 [GET] : bankbooks/stockinfo/<str : stock_type>/
  - 본인 보유 주식 확인 [GET] : bankbooks/mystocklist/
  - 주식 구매 [POST] : bankbooks/buystocks/
    - stock[stock_type] (이중 딕셔너리)
    - stocks (주식수)
  - 주식 판매 [DELETE] : bankbooks/sellstocks/
    - stock[stock_type] (이중 딕셔너리)
    - stocks (주식수)




- 퀴즈 (Quiz)
  - 문제 생성  [GET] : quiz/
    - 전체 퀴즈 중에 랜덤으로 5개 선택하여 문제 생성
    - 퀴즈 추가는 admin 페이지를 활용

