# api url

### 공통 (중복되는 부분) : http://127.0.0.1:8000/api/

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
  - 계좌 비밀번호 설정 [POST] : accounts/setpassword/
    - name
    - birthday
    - book_password



- 계좌 (Bankbook)
  - 본인 계좌 확인 [GET] : bankbooks/booklist/
  - 계좌 생성 [POST] : bankbooks/create/
    - payment
    - deadline
    - book_type
  - 계좌 해지 [DELETE] : bankbooks/<str : book_type>/ delete/
    - name
    - birthday
    - book_password




- 퀴즈 (Quiz)
  - 문제 생성  [GET] : quiz/
    - 전체 퀴즈 중에 랜덤으로 5개 선택하여 문제 생성
    - 퀴즈 추가는 admin 페이지를 활용 : admin/
