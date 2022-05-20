-- --------------------------------------------------------
-- 호스트:                          k6d108.p.ssafy.io
-- 서버 버전:                        10.3.34-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- whyfi 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `whyfi` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `whyfi`;

-- 테이블 whyfi.accounts_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `accounts_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(10) NOT NULL,
  `birthday` date NOT NULL,
  `balance` bigint(20) NOT NULL,
  `book_number` varchar(10) NOT NULL,
  `book_password` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.accounts_user:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `name`, `birthday`, `balance`, `book_number`, `book_password`) VALUES
	(1, 'pbkdf2_sha256$320000$POlXItKEa1Jkn4uLnSQyT4$jYuQBpLN66h2SidAsJtiUCkkjnLp/gUcdGjbHJtH1B0=', NULL, 1, 'admin', '', '', '', 1, 1, '2022-05-20 01:56:26.849729', '관리인', '2022-05-01', 1000000, '5071667720', ''),
	(2, 'pbkdf2_sha256$320000$zE1l17Ve0yl2Rcwm1q6l1A$MA6sWbZzw8FfMKk/FaD0extMoTjg+isIB5zEYgPumM8=', NULL, 0, 'ssafy', '', '', '', 0, 1, '2022-05-20 01:56:55.099038', '일반인', '2022-05-01', 1000000, '8072287336', '');
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;

-- 테이블 whyfi.accounts_user_groups 구조 내보내기
CREATE TABLE IF NOT EXISTS `accounts_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_groups_user_id_group_id_59c0b32f_uniq` (`user_id`,`group_id`),
  KEY `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` (`group_id`),
  CONSTRAINT `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `accounts_user_groups_user_id_52b62117_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.accounts_user_groups:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accounts_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_groups` ENABLE KEYS */;

-- 테이블 whyfi.accounts_user_user_permissions 구조 내보내기
CREATE TABLE IF NOT EXISTS `accounts_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq` (`user_id`,`permission_id`),
  KEY `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` (`permission_id`),
  CONSTRAINT `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `accounts_user_user_p_user_id_e4f0a161_fk_accounts_` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.accounts_user_user_permissions:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accounts_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_user_permissions` ENABLE KEYS */;

-- 테이블 whyfi.auth_group 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.auth_group:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;

-- 테이블 whyfi.auth_group_permissions 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.auth_group_permissions:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;

-- 테이블 whyfi.auth_permission 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.auth_permission:~44 rows (대략적) 내보내기
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add user', 1, 'add_user'),
	(2, 'Can change user', 1, 'change_user'),
	(3, 'Can delete user', 1, 'delete_user'),
	(4, 'Can view user', 1, 'view_user'),
	(5, 'Can add stock', 2, 'add_stock'),
	(6, 'Can change stock', 2, 'change_stock'),
	(7, 'Can delete stock', 2, 'delete_stock'),
	(8, 'Can view stock', 2, 'view_stock'),
	(9, 'Can add stock situation', 3, 'add_stocksituation'),
	(10, 'Can change stock situation', 3, 'change_stocksituation'),
	(11, 'Can delete stock situation', 3, 'delete_stocksituation'),
	(12, 'Can view stock situation', 3, 'view_stocksituation'),
	(13, 'Can add my stock', 4, 'add_mystock'),
	(14, 'Can change my stock', 4, 'change_mystock'),
	(15, 'Can delete my stock', 4, 'delete_mystock'),
	(16, 'Can view my stock', 4, 'view_mystock'),
	(17, 'Can add bank book', 5, 'add_bankbook'),
	(18, 'Can change bank book', 5, 'change_bankbook'),
	(19, 'Can delete bank book', 5, 'delete_bankbook'),
	(20, 'Can view bank book', 5, 'view_bankbook'),
	(21, 'Can add quiz', 6, 'add_quiz'),
	(22, 'Can change quiz', 6, 'change_quiz'),
	(23, 'Can delete quiz', 6, 'delete_quiz'),
	(24, 'Can view quiz', 6, 'view_quiz'),
	(25, 'Can add log entry', 7, 'add_logentry'),
	(26, 'Can change log entry', 7, 'change_logentry'),
	(27, 'Can delete log entry', 7, 'delete_logentry'),
	(28, 'Can view log entry', 7, 'view_logentry'),
	(29, 'Can add permission', 8, 'add_permission'),
	(30, 'Can change permission', 8, 'change_permission'),
	(31, 'Can delete permission', 8, 'delete_permission'),
	(32, 'Can view permission', 8, 'view_permission'),
	(33, 'Can add group', 9, 'add_group'),
	(34, 'Can change group', 9, 'change_group'),
	(35, 'Can delete group', 9, 'delete_group'),
	(36, 'Can view group', 9, 'view_group'),
	(37, 'Can add content type', 10, 'add_contenttype'),
	(38, 'Can change content type', 10, 'change_contenttype'),
	(39, 'Can delete content type', 10, 'delete_contenttype'),
	(40, 'Can view content type', 10, 'view_contenttype'),
	(41, 'Can add session', 11, 'add_session'),
	(42, 'Can change session', 11, 'change_session'),
	(43, 'Can delete session', 11, 'delete_session'),
	(44, 'Can view session', 11, 'view_session');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;

-- 테이블 whyfi.bankbooks_bankbook 구조 내보내기
CREATE TABLE IF NOT EXISTS `bankbooks_bankbook` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `balance` bigint(20) NOT NULL,
  `payment` bigint(20) NOT NULL,
  `interest` bigint(20) NOT NULL,
  `deadline` date NOT NULL,
  `created_at` date NOT NULL,
  `book_type` varchar(10) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bankbooks_bankbook_user_id_8b77c029_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `bankbooks_bankbook_user_id_8b77c029_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.bankbooks_bankbook:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `bankbooks_bankbook` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankbooks_bankbook` ENABLE KEYS */;

-- 테이블 whyfi.bankbooks_mystock 구조 내보내기
CREATE TABLE IF NOT EXISTS `bankbooks_mystock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `purchase_price` int(11) NOT NULL,
  `stocks` int(11) NOT NULL,
  `stock_type` varchar(10) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bankbooks_mystock_user_id_93985962_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `bankbooks_mystock_user_id_93985962_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.bankbooks_mystock:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `bankbooks_mystock` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankbooks_mystock` ENABLE KEYS */;

-- 테이블 whyfi.bankbooks_stock 구조 내보내기
CREATE TABLE IF NOT EXISTS `bankbooks_stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `situation` int(11) NOT NULL,
  `current_price` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `stock_type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.bankbooks_stock:~18 rows (대략적) 내보내기
/*!40000 ALTER TABLE `bankbooks_stock` DISABLE KEYS */;
INSERT INTO `bankbooks_stock` (`id`, `situation`, `current_price`, `created_at`, `stock_type`) VALUES
	(1, 0, 4000, '2022-05-01', 'A'),
	(2, 0, 5000, '2022-05-01', 'B'),
	(3, 0, 6000, '2022-05-01', 'C'),
	(4, 2, 3200, '2022-05-02', 'A'),
	(5, 8, 4000, '2022-05-02', 'B'),
	(6, 16, 6600, '2022-05-02', 'C'),
	(7, 6, 4160, '2022-05-03', 'A'),
	(8, 7, 2800, '2022-05-03', 'B'),
	(9, 13, 4620, '2022-05-03', 'C'),
	(10, 1, 2912, '2022-05-04', 'A'),
	(11, 10, 3080, '2022-05-04', 'B'),
	(12, 13, 3234, '2022-05-04', 'C'),
	(13, 2, 2329, '2022-05-05', 'A'),
	(14, 11, 3696, '2022-05-05', 'B'),
	(15, 15, 2910, '2022-05-05', 'C'),
	(16, 1, 1630, '2022-05-06', 'A'),
	(17, 9, 3326, '2022-05-06', 'B'),
	(18, 16, 3201, '2022-05-06', 'C'),
	(19, 2, 1304, '2022-05-07', 'A'),
	(20, 12, 4323, '2022-05-07', 'B'),
	(21, 17, 3841, '2022-05-07', 'C'),
	(22, 5, 1564, '2022-05-08', 'A'),
	(23, 11, 5187, '2022-05-08', 'B'),
	(24, 14, 3072, '2022-05-08', 'C'),
	(25, 3, 1407, '2022-05-09', 'A'),
	(26, 8, 4149, '2022-05-09', 'B'),
	(27, 14, 2457, '2022-05-09', 'C'),
	(28, 4, 1547, '2022-05-10', 'A'),
	(29, 7, 2904, '2022-05-10', 'B'),
	(30, 13, 1719, '2022-05-10', 'C'),
	(31, 3, 1392, '2022-05-11', 'A'),
	(32, 9, 2613, '2022-05-11', 'B'),
	(33, 14, 1375, '2022-05-11', 'C'),
	(34, 6, 1809, '2022-05-12', 'A'),
	(35, 8, 2090, '2022-05-12', 'B'),
	(36, 14, 1100, '2022-05-12', 'C'),
	(37, 2, 1447, '2022-05-13', 'A'),
	(38, 12, 2717, '2022-05-13', 'B'),
	(39, 17, 1320, '2022-05-13', 'C'),
	(40, 6, 1881, '2022-05-14', 'A'),
	(41, 12, 3532, '2022-05-14', 'B'),
	(42, 14, 1056, '2022-05-14', 'C'),
	(43, 2, 1504, '2022-05-15', 'A'),
	(44, 9, 3178, '2022-05-15', 'B'),
	(45, 18, 1372, '2022-05-15', 'C'),
	(46, 5, 1804, '2022-05-16', 'A'),
	(47, 7, 2224, '2022-05-16', 'B'),
	(48, 17, 1646, '2022-05-16', 'C'),
	(49, 2, 1443, '2022-05-17', 'A'),
	(50, 12, 2891, '2022-05-17', 'B'),
	(51, 18, 2139, '2022-05-17', 'C'),
	(52, 1, 1010, '2022-05-18', 'A'),
	(53, 8, 2312, '2022-05-18', 'B'),
	(54, 13, 1497, '2022-05-18', 'C'),
	(55, 5, 1212, '2022-05-19', 'A'),
	(56, 10, 2543, '2022-05-19', 'B'),
	(57, 18, 1946, '2022-05-19', 'C'),
	(58, 6, 1575, '2022-05-20', 'A'),
	(59, 8, 2034, '2022-05-20', 'B'),
	(60, 13, 1362, '2022-05-20', 'C');
/*!40000 ALTER TABLE `bankbooks_stock` ENABLE KEYS */;

-- 테이블 whyfi.bankbooks_stocksituation 구조 내보내기
CREATE TABLE IF NOT EXISTS `bankbooks_stocksituation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `change` int(11) NOT NULL,
  `article` varchar(200) NOT NULL,
  `stock_type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.bankbooks_stocksituation:~18 rows (대략적) 내보내기
/*!40000 ALTER TABLE `bankbooks_stocksituation` DISABLE KEYS */;
INSERT INTO `bankbooks_stocksituation` (`id`, `change`, `article`, `stock_type`) VALUES
	(1, -30, '래퍼 XXX 폭행죄로 입건 ... 이번이 처음 아냐', 'A'),
	(2, -20, '보이그룹 OO 군 입대로 인한 활동 중단, 1년 6개월의 매출은?', 'A'),
	(3, -10, '싸피엔터 소속 배우 OOO 음주운전 적발, ‘팬 여러분께 심려 끼쳐 죄송하다’', 'A'),
	(4, 10, '싸피엔터 제작 드라마 ‘나의 코딩이야기’ 시청률 24%로 동시간대 1위 달성', 'A'),
	(5, 20, '보이그룹 OOO 콘서트 전회 매진 ... 주가 상승 기대감', 'A'),
	(6, 30, '싸피엔터 소속 아이돌 OO 빌보드 차트 1위 ... 매출 2400억 증가', 'A'),
	(7, -30, 'OOO 휴대폰 설계 결함에 소비자 뿔났다 ... 해외서 집단 소송 이어져', 'B'),
	(8, -20, '파운더리 산업 주도권 대만 XX 기업에 밀려 ... 매출 빨간불', 'B'),
	(9, -10, '24년간 국민차 자리 지켜오던 OO 차량 역사 속으로 ... 단종이 과연 정답인가?', 'B'),
	(10, 10, '싸피전자 내년 생산라인 증대 발표', 'B'),
	(11, 20, '헤일로 No.6, 점유율 24%로 세계 1위 달성 쾌거', 'B'),
	(12, 30, '싸피전자에서 개발한 OO 소프트웨어 MWC에서 호평 일색', 'B'),
	(13, -30, '美 FDA, 불순물 검출로 인한 라OO 성분 두통약 퇴출 공식화', 'C'),
	(14, -20, '라OO, 20년만에 퇴출 위기 … 효과가 낮고 또한 부작용이 심해', 'C'),
	(15, -10, '싸피바이오에서 OO 바이러스 먹는 치료제의 임상 목표 달성에 실패했다는 소식이 전해져 ...', 'C'),
	(16, 10, '싸피바이오에서 OO 바이러스 먹는 치료제 임상 3상 돌입 ...', 'C'),
	(17, 20, '게OO, 두통약에서 탈모 완화 효과가 나타나 ... 철저히 검증 중', 'C'),
	(18, 30, '싸피바이오, 노벨 의학상의 영향으로 세계 점유율 24% 달성', 'C');
/*!40000 ALTER TABLE `bankbooks_stocksituation` ENABLE KEYS */;

-- 테이블 whyfi.django_admin_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.django_admin_log:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;

-- 테이블 whyfi.django_content_type 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.django_content_type:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
	(1, 'accounts', 'user'),
	(7, 'admin', 'logentry'),
	(9, 'auth', 'group'),
	(8, 'auth', 'permission'),
	(5, 'bankbooks', 'bankbook'),
	(4, 'bankbooks', 'mystock'),
	(2, 'bankbooks', 'stock'),
	(3, 'bankbooks', 'stocksituation'),
	(10, 'contenttypes', 'contenttype'),
	(6, 'quiz', 'quiz'),
	(11, 'sessions', 'session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;

-- 테이블 whyfi.django_migrations 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.django_migrations:~21 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
	(1, 'contenttypes', '0001_initial', '2022-05-20 01:54:36.457015'),
	(2, 'contenttypes', '0002_remove_content_type_name', '2022-05-20 01:54:36.570359'),
	(3, 'auth', '0001_initial', '2022-05-20 01:54:36.880997'),
	(4, 'auth', '0002_alter_permission_name_max_length', '2022-05-20 01:54:36.952817'),
	(5, 'auth', '0003_alter_user_email_max_length', '2022-05-20 01:54:36.978717'),
	(6, 'auth', '0004_alter_user_username_opts', '2022-05-20 01:54:37.002680'),
	(7, 'auth', '0005_alter_user_last_login_null', '2022-05-20 01:54:37.026640'),
	(8, 'auth', '0006_require_contenttypes_0002', '2022-05-20 01:54:37.047556'),
	(9, 'auth', '0007_alter_validators_add_error_messages', '2022-05-20 01:54:37.071492'),
	(10, 'auth', '0008_alter_user_username_max_length', '2022-05-20 01:54:37.095428'),
	(11, 'auth', '0009_alter_user_last_name_max_length', '2022-05-20 01:54:37.119364'),
	(12, 'auth', '0010_alter_group_name_max_length', '2022-05-20 01:54:37.154803'),
	(13, 'auth', '0011_update_proxy_permissions', '2022-05-20 01:54:37.203535'),
	(14, 'auth', '0012_alter_user_first_name_max_length', '2022-05-20 01:54:37.228767'),
	(15, 'accounts', '0001_initial', '2022-05-20 01:54:37.593736'),
	(16, 'admin', '0001_initial', '2022-05-20 01:54:37.768976'),
	(17, 'admin', '0002_logentry_remove_auto_add', '2022-05-20 01:54:37.798892'),
	(18, 'admin', '0003_logentry_add_action_flag_choices', '2022-05-20 01:54:37.826552'),
	(19, 'bankbooks', '0001_initial', '2022-05-20 01:54:38.057489'),
	(20, 'quiz', '0001_initial', '2022-05-20 01:54:38.106370'),
	(21, 'sessions', '0001_initial', '2022-05-20 01:54:38.180664');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;

-- 테이블 whyfi.django_session 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.django_session:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;

-- 테이블 whyfi.quiz_quiz 구조 내보내기
CREATE TABLE IF NOT EXISTS `quiz_quiz` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `question` varchar(200) NOT NULL,
  `answer` varchar(2) NOT NULL,
  `commentary` varchar(200) NOT NULL,
  `quiz_type` varchar(10) NOT NULL,
  `choices_view1` varchar(100) NOT NULL,
  `choices_view2` varchar(100) NOT NULL,
  `choices_view3` varchar(100) NOT NULL,
  `choices_view4` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 whyfi.quiz_quiz:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `quiz_quiz` DISABLE KEYS */;
INSERT INTO `quiz_quiz` (`id`, `question`, `answer`, `commentary`, `quiz_type`, `choices_view1`, `choices_view2`, `choices_view3`, `choices_view4`) VALUES
	(1, '통장을 만드는 데 필요한 준비물이 아닌 것은?', '4', '전화번호는 필요하지 않습니다.', 'choices', '도장', '부모님 신분증', '주민등록등본', '전화번호'),
	(2, '통장을 만드는 데 필요한 준비물은?', '3', '본인 도장이나 자필 싸인이 꼭 필요합니다.', 'choices', '학교 성적표', '선생님 도장', '본인 도장', '부모님 전화번호'),
	(3, 'ATM기에서 송금하기 위해 필요하지 않은 것은?', '4', '다른 사람의 비밀번호는 필요하지 않습니다.', 'choices', '친구의 계좌번호', '송금금액', '나의 비밀번호', '친구의 비밀번호'),
	(4, '은행의 개념이 아닌 것은?', '2', '은행은 돈을 공짜로 주지는 않습니다.', 'choices', '돈을 빌려주는 곳', '돈을 주는 곳', '돈을 맡아서 보관해주는 곳', '환전 해주는 곳'),
	(5, '통장을 만드는 과정이 아닌 것은?', '2', '전화로는 통장을 만들 수 없습니다.', 'choices', '준비물은 부모님의 신분증, 주민등록등본, 도장이 필요합니다.', '은행에 전화하여 통장을 만들어달라고 합니다.', '부모님과 함께 은행에 가서 가입 신청서를 작성합니다.', '가입 신청서를 작성하고 사용할 비밀번호를 입력합니다.'),
	(6, '금융기관 또는 경찰 / 검찰처럼 행동하며 계좌번호와 비밀번호를 알려 달라고 말할 경우 알려줘도 된다.', 'X', '경찰과 검찰, 금융기관은 절대로 개인에게 계좌번호와 비밀번호를 묻지 않습니다.', 'ox', '', '', '', ''),
	(7, '이자는 돈을 빌렸을 때 은행에 감사의 의미로 내는 것이기 때문에 꼭 지불할 필요가 없다.', 'X', '이자는 돈을 빌렸을 때 다달이 원금과 이자를 더하여 갚겠다는 약속을 하고 은행에 지불하는 거예요. 따라서 이자를 납부하지 않는다면 신용도가 떨어질 수 있으니 꼭 납부하세요!', 'ox', '', '', '', ''),
	(8, '주식은 예금 / 적금에 비해 수익률이 높으므로 무조건 사는 게 좋다.', 'X', '일반적으로 주식의 수익은 예금 / 적금에 비해 높은 것은 맞지만, 주식은 가격이 떨어지는 위험성이 존재하기 때문에 신중하게 생각한 후에 사는 것이 좋아요.', 'ox', '', '', '', ''),
	(9, '예금과 적금의 차이는 금액의 차이다.', 'X', '예금은 일정 금액을 한꺼번에 맡기고 만기 때 원금과 이자를 찾는 방식이고, 적금은 매달 일정 금액을 납부해서 차곡차곡 돈을 모으려는 목적으로 가입하는 금융 상품입니다.', 'ox', '', '', '', ''),
	(10, '주식은 예금과 적금에 비해 수익률이 높으므로 무조건 사는 게 좋다.', 'X', '일반적으로 주식의 수익은 예금과 적금에 비해 높은 것은 맞지만, 주식은 가격이 떨어지는 위험성이 존재하기 때문에 신중하게 생각한 후에 사는 것이 좋습니다.', 'ox', '', '', '', '');
/*!40000 ALTER TABLE `quiz_quiz` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
