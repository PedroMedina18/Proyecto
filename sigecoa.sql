-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-10-2023 a las 03:00:45
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sigecoa`
--
CREATE DATABASE IF NOT EXISTS `sigecoa` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sigecoa`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add año escolar', 7, 'add_añoescolar'),
(26, 'Can change año escolar', 7, 'change_añoescolar'),
(27, 'Can delete año escolar', 7, 'delete_añoescolar'),
(28, 'Can view año escolar', 7, 'view_añoescolar'),
(29, 'Can add año escolarizacion', 8, 'add_añoescolarizacion'),
(30, 'Can change año escolarizacion', 8, 'change_añoescolarizacion'),
(31, 'Can delete año escolarizacion', 8, 'delete_añoescolarizacion'),
(32, 'Can view año escolarizacion', 8, 'view_añoescolarizacion'),
(33, 'Can add año escolarizacion secciones año escolar', 9, 'add_añoescolarizacionseccionesañoescolar'),
(34, 'Can change año escolarizacion secciones año escolar', 9, 'change_añoescolarizacionseccionesañoescolar'),
(35, 'Can delete año escolarizacion secciones año escolar', 9, 'delete_añoescolarizacionseccionesañoescolar'),
(36, 'Can view año escolarizacion secciones año escolar', 9, 'view_añoescolarizacionseccionesañoescolar'),
(37, 'Can add cargos', 10, 'add_cargos'),
(38, 'Can change cargos', 10, 'change_cargos'),
(39, 'Can delete cargos', 10, 'delete_cargos'),
(40, 'Can view cargos', 10, 'view_cargos'),
(41, 'Can add estados estudiantee', 11, 'add_estadosestudiantee'),
(42, 'Can change estados estudiantee', 11, 'change_estadosestudiantee'),
(43, 'Can delete estados estudiantee', 11, 'delete_estadosestudiantee'),
(44, 'Can view estados estudiantee', 11, 'view_estadosestudiantee'),
(45, 'Can add estudiantes', 12, 'add_estudiantes'),
(46, 'Can change estudiantes', 12, 'change_estudiantes'),
(47, 'Can delete estudiantes', 12, 'delete_estudiantes'),
(48, 'Can view estudiantes', 12, 'view_estudiantes'),
(49, 'Can add generos', 13, 'add_generos'),
(50, 'Can change generos', 13, 'change_generos'),
(51, 'Can delete generos', 13, 'delete_generos'),
(52, 'Can view generos', 13, 'view_generos'),
(53, 'Can add inscripciones', 14, 'add_inscripciones'),
(54, 'Can change inscripciones', 14, 'change_inscripciones'),
(55, 'Can delete inscripciones', 14, 'delete_inscripciones'),
(56, 'Can view inscripciones', 14, 'view_inscripciones'),
(57, 'Can add materias', 15, 'add_materias'),
(58, 'Can change materias', 15, 'change_materias'),
(59, 'Can delete materias', 15, 'delete_materias'),
(60, 'Can view materias', 15, 'view_materias'),
(61, 'Can add nombre materias', 16, 'add_nombrematerias'),
(62, 'Can change nombre materias', 16, 'change_nombrematerias'),
(63, 'Can delete nombre materias', 16, 'delete_nombrematerias'),
(64, 'Can view nombre materias', 16, 'view_nombrematerias'),
(65, 'Can add parentescos', 17, 'add_parentescos'),
(66, 'Can change parentescos', 17, 'change_parentescos'),
(67, 'Can delete parentescos', 17, 'delete_parentescos'),
(68, 'Can view parentescos', 17, 'view_parentescos'),
(69, 'Can add personas', 18, 'add_personas'),
(70, 'Can change personas', 18, 'change_personas'),
(71, 'Can delete personas', 18, 'delete_personas'),
(72, 'Can view personas', 18, 'view_personas'),
(73, 'Can add secciones', 19, 'add_secciones'),
(74, 'Can change secciones', 19, 'change_secciones'),
(75, 'Can delete secciones', 19, 'delete_secciones'),
(76, 'Can view secciones', 19, 'view_secciones'),
(77, 'Can add tipo inscripciones', 20, 'add_tipoinscripciones'),
(78, 'Can change tipo inscripciones', 20, 'change_tipoinscripciones'),
(79, 'Can delete tipo inscripciones', 20, 'delete_tipoinscripciones'),
(80, 'Can view tipo inscripciones', 20, 'view_tipoinscripciones'),
(81, 'Can add requisitos', 21, 'add_requisitos'),
(82, 'Can change requisitos', 21, 'change_requisitos'),
(83, 'Can delete requisitos', 21, 'delete_requisitos'),
(84, 'Can view requisitos', 21, 'view_requisitos'),
(85, 'Can add representantes', 22, 'add_representantes'),
(86, 'Can change representantes', 22, 'change_representantes'),
(87, 'Can delete representantes', 22, 'delete_representantes'),
(88, 'Can view representantes', 22, 'view_representantes'),
(89, 'Can add personal', 23, 'add_personal'),
(90, 'Can change personal', 23, 'change_personal'),
(91, 'Can delete personal', 23, 'delete_personal'),
(92, 'Can view personal', 23, 'view_personal'),
(93, 'Can add notas materias', 24, 'add_notasmaterias'),
(94, 'Can change notas materias', 24, 'change_notasmaterias'),
(95, 'Can delete notas materias', 24, 'delete_notasmaterias'),
(96, 'Can view notas materias', 24, 'view_notasmaterias'),
(97, 'Can add materias inscripcion', 25, 'add_materiasinscripcion'),
(98, 'Can change materias inscripcion', 25, 'change_materiasinscripcion'),
(99, 'Can delete materias inscripcion', 25, 'delete_materiasinscripcion'),
(100, 'Can view materias inscripcion', 25, 'view_materiasinscripcion'),
(101, 'Can add representante estudiante', 26, 'add_representanteestudiante'),
(102, 'Can change representante estudiante', 26, 'change_representanteestudiante'),
(103, 'Can delete representante estudiante', 26, 'delete_representanteestudiante'),
(104, 'Can view representante estudiante', 26, 'view_representanteestudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user`
--

CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_groups`
--

CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_user_user_permissions`
--

CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `año_escolar`
--

CREATE TABLE IF NOT EXISTS `año_escolar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `año_inicio` date NOT NULL,
  `año_final` date NOT NULL,
  `actual` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `año_escolar`
--

INSERT INTO `año_escolar` (`id`, `año_inicio`, `año_final`, `actual`) VALUES
(1, '2019-01-01', '2020-01-01', 0),
(2, '2020-01-01', '2021-01-01', 0),
(3, '2021-01-01', '2022-01-01', 0),
(4, '2022-01-01', '2023-01-01', 0),
(5, '2023-01-01', '2024-01-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `año_escolarizacion`
--

CREATE TABLE IF NOT EXISTS `año_escolarizacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `año` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `año` (`año`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `año_escolarizacion`
--

INSERT INTO `año_escolarizacion` (`id`, `año`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `año_escolarizacion_has_secciones_año_escolar`
--

CREATE TABLE IF NOT EXISTS `año_escolarizacion_has_secciones_año_escolar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `año_id` bigint(20) NOT NULL,
  `año_escolar_id` bigint(20) NOT NULL,
  `seccion_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `año_escolarizacion_h_seccion_id_1e2598b1_fk_secciones` (`seccion_id`),
  KEY `año_escolarizacion_h_año_id_b760be5b_fk_año_escol` (`año_id`),
  KEY `año_escolarizacion_h_año_escolar_id_13a6dde5_fk_año_escol` (`año_escolar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `año_escolarizacion_has_secciones_año_escolar`
--

INSERT INTO `año_escolarizacion_has_secciones_año_escolar` (`id`, `año_id`, `año_escolar_id`, `seccion_id`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 1, 1, 3),
(4, 1, 1, 4),
(5, 2, 1, 1),
(6, 2, 1, 2),
(7, 2, 1, 3),
(8, 3, 1, 1),
(9, 3, 1, 2),
(10, 3, 1, 3),
(11, 4, 1, 1),
(12, 4, 1, 2),
(13, 5, 1, 1),
(14, 5, 1, 2),
(15, 1, 2, 1),
(16, 1, 2, 2),
(17, 1, 2, 3),
(18, 1, 2, 4),
(19, 2, 2, 1),
(20, 2, 2, 2),
(21, 2, 2, 3),
(22, 3, 2, 1),
(23, 3, 2, 2),
(24, 3, 2, 3),
(25, 4, 2, 1),
(26, 4, 2, 2),
(27, 5, 2, 1),
(28, 5, 2, 2),
(29, 1, 3, 1),
(30, 1, 3, 2),
(31, 1, 3, 3),
(32, 1, 3, 4),
(33, 2, 3, 1),
(34, 2, 3, 2),
(35, 2, 3, 3),
(36, 3, 3, 1),
(37, 3, 3, 2),
(38, 3, 3, 3),
(39, 4, 3, 1),
(40, 4, 3, 2),
(41, 5, 3, 1),
(42, 5, 3, 2),
(43, 1, 4, 1),
(44, 1, 4, 2),
(45, 1, 4, 3),
(46, 1, 4, 4),
(47, 2, 4, 1),
(48, 2, 4, 2),
(49, 2, 4, 3),
(50, 3, 4, 1),
(51, 3, 4, 2),
(52, 3, 4, 3),
(53, 4, 4, 1),
(54, 4, 4, 2),
(55, 5, 4, 1),
(56, 5, 4, 2),
(57, 1, 5, 1),
(58, 1, 5, 2),
(59, 1, 5, 3),
(60, 1, 5, 4),
(61, 2, 5, 1),
(62, 2, 5, 2),
(63, 2, 5, 3),
(64, 3, 5, 1),
(65, 3, 5, 2),
(66, 3, 5, 3),
(67, 4, 5, 1),
(68, 4, 5, 2),
(69, 5, 5, 1),
(70, 5, 5, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE IF NOT EXISTS `cargos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Docente', 'Personal encargado de dar calses'),
(2, 'Coordinador', 'Personal encargado de un año'),
(3, 'Administrador', 'Director del sistema'),
(4, 'Asistente Administrativo', 'Personal administrativo de la institucion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(7, 'API', 'añoescolar'),
(8, 'API', 'añoescolarizacion'),
(9, 'API', 'añoescolarizacionseccionesañoescolar'),
(10, 'API', 'cargos'),
(11, 'API', 'estadosestudiantee'),
(12, 'API', 'estudiantes'),
(13, 'API', 'generos'),
(14, 'API', 'inscripciones'),
(15, 'API', 'materias'),
(25, 'API', 'materiasinscripcion'),
(16, 'API', 'nombrematerias'),
(24, 'API', 'notasmaterias'),
(17, 'API', 'parentescos'),
(23, 'API', 'personal'),
(18, 'API', 'personas'),
(26, 'API', 'representanteestudiante'),
(22, 'API', 'representantes'),
(21, 'API', 'requisitos'),
(19, 'API', 'secciones'),
(20, 'API', 'tipoinscripciones'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'API', '0001_initial', '2023-10-25 02:16:23.201600'),
(2, 'contenttypes', '0001_initial', '2023-10-25 02:16:23.732000'),
(3, 'auth', '0001_initial', '2023-10-25 02:16:36.136200'),
(4, 'admin', '0001_initial', '2023-10-25 02:16:38.569800'),
(5, 'admin', '0002_logentry_remove_auto_add', '2023-10-25 02:16:38.663400'),
(6, 'admin', '0003_logentry_add_action_flag_choices', '2023-10-25 02:16:38.819400'),
(7, 'contenttypes', '0002_remove_content_type_name', '2023-10-25 02:16:41.549400'),
(8, 'auth', '0002_alter_permission_name_max_length', '2023-10-25 02:16:42.563400'),
(9, 'auth', '0003_alter_user_email_max_length', '2023-10-25 02:16:43.686600'),
(10, 'auth', '0004_alter_user_username_opts', '2023-10-25 02:16:43.764600'),
(11, 'auth', '0005_alter_user_last_login_null', '2023-10-25 02:16:44.404200'),
(12, 'auth', '0006_require_contenttypes_0002', '2023-10-25 02:16:44.466600'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2023-10-25 02:16:44.513400'),
(14, 'auth', '0008_alter_user_username_max_length', '2023-10-25 02:16:45.558600'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2023-10-25 02:16:46.603800'),
(16, 'auth', '0010_alter_group_name_max_length', '2023-10-25 02:16:47.931800'),
(17, 'auth', '0011_update_proxy_permissions', '2023-10-25 02:16:47.994200'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2023-10-25 02:16:48.977000'),
(19, 'sessions', '0001_initial', '2023-10-25 02:16:49.820400'),
(20, 'API', '0002_alter_representantes_profesion', '2023-10-25 02:49:32.721200'),
(21, 'API', '0003_rename_constraseña_personal_contraseña', '2023-10-25 03:12:01.802600'),
(22, 'API', '0004_auto_20231025_0202', '2023-10-25 06:32:57.547400'),
(23, 'API', '0005_auto_20231027_0359', '2023-10-27 08:30:20.358200'),
(24, 'API', '0006_alter_representanteestudiante_table', '2023-10-29 06:42:14.829600');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_estudiante`
--

CREATE TABLE IF NOT EXISTS `estado_estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estado_estudiante`
--

INSERT INTO `estado_estudiante` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Inscripto', 'Estudiante inscripto en el periodo academico actual'),
(2, 'Inhabilitado', 'Estudiante que no pueden ser inscripto nuevamente'),
(3, 'Retirado', 'Estudiante retirados de la institucion'),
(4, 'No Inscripto', 'Estudiante no inscripto actualmente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `lugar_nacimiento` varchar(100) NOT NULL,
  `direccion_habitacional` varchar(250) NOT NULL,
  `observaciones` varchar(1000) DEFAULT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `año_ingreso_id` bigint(20) NOT NULL,
  `estado_id` bigint(20) NOT NULL,
  `persona_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `persona_id` (`persona_id`),
  KEY `estudiantes_año_ingreso_id_3fa13444_fk_año_escolarizacion_id` (`año_ingreso_id`),
  KEY `estudiantes_estado_id_8f7d500b_fk_estado_estudiante_id` (`estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `lugar_nacimiento`, `direccion_habitacional`, `observaciones`, `fecha_registro`, `fecha_actualizacion`, `año_ingreso_id`, `estado_id`, `persona_id`) VALUES
(1, 'Caracas Venezuela', 'CALLE TERCERA DE RUPERTO LUGO CASA SN NRO 5 ZONA RUPERTO LUGO CARACAS DISTRITO CAPITAL ZONA POSTAL 1030', NULL, '2023-10-29 05:59:34.847800', '2023-10-29 05:59:34.847800', 1, 1, 12),
(2, 'Caracas Venezuela', 'Los magallanes de catia', '', '2023-10-29 06:51:28.846800', '2023-10-29 06:51:28.846800', 2, 1, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE IF NOT EXISTS `generos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `genero` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `genero` (`genero`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `genero`, `descripcion`) VALUES
(1, 'Femenino', NULL),
(2, 'Masculino', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE IF NOT EXISTS `inscripciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `aprobado` tinyint(1) DEFAULT NULL,
  `estudiante_id` bigint(20) NOT NULL,
  `parentesco_id` bigint(20) NOT NULL,
  `representante_legal_id` bigint(20) NOT NULL,
  `seccion_año_id` bigint(20) NOT NULL,
  `tipo_inscripcion_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inscripciones_parentesco_id_a46fce94_fk_parentescos_id` (`parentesco_id`),
  KEY `inscripciones_representante_legal__2d2dbaf0_fk_represent` (`representante_legal_id`),
  KEY `inscripciones_seccion_año_id_a5605f23_fk_año_escol` (`seccion_año_id`),
  KEY `inscripciones_tipo_inscripcion_id_921ed618_fk_tipo_insc` (`tipo_inscripcion_id`),
  KEY `inscripciones_estudiante_id_64dcccda_fk_estudiantes_id` (`estudiante_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id`, `fecha_registro`, `fecha_actualizacion`, `aprobado`, `estudiante_id`, `parentesco_id`, `representante_legal_id`, `seccion_año_id`, `tipo_inscripcion_id`) VALUES
(1, '2023-10-29 05:59:35.223800', '2023-10-29 05:59:35.223800', NULL, 1, 1, 1, 57, 1),
(2, '2023-10-29 06:51:29.057800', '2023-10-29 06:51:29.057800', NULL, 2, 1, 7, 62, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE IF NOT EXISTS `materias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `obligatoria` tinyint(1) NOT NULL,
  `tipo_nota` tinyint(1) NOT NULL,
  `año_id` bigint(20) NOT NULL,
  `nombre_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Materias_nombre_id_5bd8e1f7_fk_Nombres_Materias_id` (`nombre_id`),
  KEY `Materias_año_id_6c805be9_fk_año_escolarizacion_id` (`año_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `obligatoria`, `tipo_nota`, `año_id`, `nombre_id`) VALUES
(1, 1, 1, 1, 4),
(2, 1, 1, 1, 2),
(3, 1, 1, 1, 1),
(4, 1, 1, 1, 3),
(5, 1, 1, 1, 5),
(6, 1, 1, 1, 6),
(7, 1, 1, 1, 7),
(8, 0, 0, 1, 13),
(9, 0, 0, 1, 14),
(10, 1, 1, 2, 4),
(11, 1, 1, 2, 2),
(12, 1, 1, 2, 1),
(13, 1, 1, 2, 3),
(14, 1, 1, 2, 5),
(15, 1, 1, 2, 6),
(16, 1, 1, 2, 7),
(17, 0, 0, 2, 13),
(18, 0, 0, 2, 14),
(19, 1, 1, 3, 4),
(20, 1, 1, 3, 2),
(21, 1, 1, 3, 1),
(22, 1, 1, 3, 3),
(23, 1, 1, 3, 9),
(24, 1, 1, 3, 8),
(25, 1, 1, 3, 10),
(26, 1, 1, 3, 7),
(27, 0, 0, 3, 13),
(28, 0, 0, 3, 14),
(29, 1, 1, 4, 4),
(30, 1, 1, 4, 2),
(31, 1, 1, 4, 1),
(32, 1, 1, 4, 3),
(33, 1, 1, 4, 9),
(34, 1, 1, 4, 8),
(35, 1, 1, 4, 10),
(36, 1, 1, 4, 7),
(37, 1, 1, 4, 12),
(38, 0, 0, 4, 13),
(39, 0, 0, 4, 14),
(40, 1, 1, 5, 4),
(41, 1, 1, 5, 2),
(42, 1, 1, 5, 1),
(43, 1, 1, 5, 3),
(44, 1, 1, 5, 9),
(45, 1, 1, 5, 8),
(46, 1, 1, 5, 10),
(47, 1, 1, 5, 11),
(48, 1, 1, 5, 7),
(49, 1, 1, 5, 12),
(50, 0, 0, 5, 13),
(51, 0, 0, 5, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias_has_inscripcion`
--

CREATE TABLE IF NOT EXISTS `materias_has_inscripcion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nota` int(11) NOT NULL,
  `inscripcion_id` bigint(20) NOT NULL,
  `materia_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `materias_has_inscrip_inscripcion_id_9387f32b_fk_inscripci` (`inscripcion_id`),
  KEY `materias_has_inscripcion_materia_id_b0eff2f3_fk_Materias_id` (`materia_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `materias_has_inscripcion`
--

INSERT INTO `materias_has_inscripcion` (`id`, `nota`, `inscripcion_id`, `materia_id`) VALUES
(1, 0, 1, 1),
(2, 0, 1, 2),
(3, 0, 1, 3),
(4, 0, 1, 4),
(5, 0, 1, 5),
(6, 0, 1, 6),
(7, 0, 1, 7),
(8, 0, 1, 8),
(9, 0, 1, 9),
(10, 0, 2, 10),
(11, 0, 2, 11),
(12, 0, 2, 12),
(13, 0, 2, 13),
(14, 0, 2, 14),
(15, 0, 2, 15),
(16, 0, 2, 16),
(17, 0, 2, 17),
(18, 0, 2, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombres_materias`
--

CREATE TABLE IF NOT EXISTS `nombres_materias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nombres_materias`
--

INSERT INTO `nombres_materias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Matemática', 'Materia'),
(2, 'Ingles y otras lenguas extranjeras', 'Materia'),
(3, 'Educacion FIsica', 'Materia'),
(4, 'Castellano', 'Materia'),
(5, 'Arte y Patrimonio', 'Materia'),
(6, 'Ciencias Naturaleza', 'Materia'),
(7, 'Geografia Historia y Ciudadania', 'Materias'),
(8, 'Quimica', 'Materia'),
(9, 'Fisica', 'Materia'),
(10, 'Biologia', 'Materia'),
(11, 'Ciencias de la tierra', 'Materia'),
(12, 'Formacion para la Soberania Nacional', 'Materia'),
(13, 'Orientacion y Convivencia', 'Materia'),
(14, 'Grupo de Creacion, Recreacion y Participacion', 'Materia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas_materias`
--

CREATE TABLE IF NOT EXISTS `notas_materias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nota` int(11) NOT NULL,
  `estudiante_id` bigint(20) NOT NULL,
  `materia_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notas_materias_estudiante_id_ce237b19_fk_estudiantes_id` (`estudiante_id`),
  KEY `notas_materias_materia_id_bd2ccce8_fk_Materias_id` (`materia_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `notas_materias`
--

INSERT INTO `notas_materias` (`id`, `nota`, `estudiante_id`, `materia_id`) VALUES
(1, 15, 2, 1),
(2, 15, 2, 2),
(3, 15, 2, 3),
(4, 15, 2, 4),
(5, 15, 2, 5),
(6, 15, 2, 6),
(7, 15, 2, 7),
(8, 15, 2, 8),
(9, 15, 2, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parentescos`
--

CREATE TABLE IF NOT EXISTS `parentescos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parentesco` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `parentesco` (`parentesco`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `parentescos`
--

INSERT INTO `parentescos` (`id`, `parentesco`, `descripcion`) VALUES
(1, 'Madre', NULL),
(2, 'Padre', NULL),
(3, 'Tio', NULL),
(4, 'Tia', NULL),
(5, 'Abuelo', NULL),
(6, 'Abuela', NULL),
(7, 'Hermano', NULL),
(8, 'Hermana', NULL),
(9, 'Primo', NULL),
(10, 'Prima', NULL),
(11, 'Otros', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE IF NOT EXISTS `personal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) NOT NULL,
  `contraseña` varchar(500) NOT NULL,
  `inhabilitado` tinyint(1) NOT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `cargo_id` bigint(20) NOT NULL,
  `persona_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `persona_id` (`persona_id`),
  KEY `personal_cargo_id_9b1a9838_fk_cargos_id` (`cargo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id`, `usuario`, `contraseña`, `inhabilitado`, `fecha_registro`, `fecha_actualizacion`, `cargo_id`, `persona_id`) VALUES
(1, 'ADMINISTRADOR', 'pbkdf2:sha256:260000$oKgWzdDzHCggYdxfSR6popwYOCAMvR$bdfb15ceeec3e04059037209a063b0593f57389c0ca02f6db04c1eecdac72afd', 0, '2023-10-25 03:12:22.977400', '2023-10-25 03:12:22.977400', 3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE IF NOT EXISTS `personas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nacionalidad` tinyint(1) NOT NULL,
  `cedula` bigint(20) NOT NULL,
  `propia` tinyint(1) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `genero_id` bigint(20) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  KEY `personas_genero_id_6a17f9b9_fk_generos_id` (`genero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nacionalidad`, `cedula`, `propia`, `fecha_nacimiento`, `telefono`, `correo`, `fecha_registro`, `fecha_actualizacion`, `genero_id`, `apellidos`, `nombres`) VALUES
(1, 1, 30565353, 1, '1980-05-30', 4241250451, 'medinapedrito2@gmail.com', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 1, 'Medina Nazareth', 'Pedro Medina'),
(2, 1, 30575353, 1, '1985-05-30', 4241250451, 'medinaptedrito2@gmail.com', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 1, 'Lopez Luna', 'Juan Garcia'),
(3, 1, 30465353, 1, '1970-05-30', 4261250651, 'med5inapgedrito2@gmail.com', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 2, 'Zambrano Hoyos', 'Emilys Ruby'),
(4, 1, 30565453, 1, '1990-05-30', 4241250951, 'med7inapedrito2@gmail.com', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 1, 'Nazareth Zomara', 'Jose Gabriel'),
(5, 1, 25365478, 1, '2000-05-30', 4121253451, 'meddinapedrito2@gmail.com', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 1, 'Medina Ramirez', 'Alberto Fuentez'),
(6, 1, 25478963, 1, '2000-10-05', 4241579854, 'joaquina@gmail.com', '2023-10-27 18:02:19.494800', '2023-10-27 18:02:19.494800', 2, 'Lopez Gonzalez', 'Alberto Ramirez'),
(7, 1, 28578698, 1, '2000-10-05', 4241579854, 'joaqudsdsina@gmail.com', '2023-10-27 18:03:59.586000', '2023-10-27 18:03:59.586000', 1, 'Garcia Gonzalez', 'Camila Hoyox'),
(8, 1, 24254789, 1, '2000-10-05', 4141579854, 'jodsdaqudsdsina@gmail.com', '2023-10-29 01:04:15.825600', '2023-10-29 01:04:15.825600', 2, 'Miranda Gonzalez', 'Federico Hoyox'),
(11, 1, 26666547, 1, '1998-11-20', 4241254789, 'moniasasca@gmail.com', '2023-10-29 01:24:31.185400', '2023-10-29 01:24:31.185400', 1, 'Medina Egnis', 'Monica Ramirez'),
(12, 1, 31547896, 1, '2006-05-30', NULL, NULL, '2023-10-29 05:59:33.046800', '2023-10-29 05:59:33.046800', 1, ' Medina Camacho', 'Adeleiny Nazaret'),
(13, 1, 31547895, 1, '2006-10-18', NULL, NULL, '2023-10-29 06:51:28.635800', '2023-10-29 06:51:28.635800', 2, ' Lopez Gonzalez', 'Kevin Fernandez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representantes`
--

CREATE TABLE IF NOT EXISTS `representantes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `telefono` bigint(20) DEFAULT NULL,
  `fallecido` tinyint(1) NOT NULL,
  `profesion` varchar(200) DEFAULT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `persona_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `persona_id` (`persona_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `representantes`
--

INSERT INTO `representantes` (`id`, `telefono`, `fallecido`, `profesion`, `fecha_registro`, `fecha_actualizacion`, `persona_id`) VALUES
(1, 2125574589, 0, 'Doctor', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 1),
(2, NULL, 0, 'Docente', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 2),
(3, 4261264841, 0, 'Asistente Administrativo', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 3),
(4, NULL, 1, '', '2023-10-24 21:15:19.433400', '2023-10-24 21:15:19.433400', 4),
(5, 2120458746, 0, 'Odontologo', '2023-10-27 18:02:19.763800', '2023-10-27 18:02:19.763800', 6),
(6, 2120458746, 0, 'Pediatra', '2023-10-27 18:03:59.747000', '2023-10-27 18:03:59.748000', 7),
(7, 2121458746, 0, 'Pediatra', '2023-10-29 01:04:16.963600', '2023-10-29 01:04:16.964600', 8),
(8, NULL, 0, 'Vendedora Ambulante', '2023-10-29 01:24:31.298400', '2023-10-29 01:24:31.298400', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representantes_has_estudiantes`
--

CREATE TABLE IF NOT EXISTS `representantes_has_estudiantes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estudiante_id` bigint(20) NOT NULL,
  `parentesco_id` bigint(20) NOT NULL,
  `representante_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `API_representanteest_estudiante_id_7fc931ba_fk_estudiant` (`estudiante_id`),
  KEY `API_representanteest_parentesco_id_7fceae0a_fk_parentesc` (`parentesco_id`),
  KEY `API_representanteest_representante_id_8ae18fd0_fk_represent` (`representante_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `representantes_has_estudiantes`
--

INSERT INTO `representantes_has_estudiantes` (`id`, `estudiante_id`, `parentesco_id`, `representante_id`) VALUES
(1, 1, 1, 3),
(2, 1, 2, 1),
(3, 2, 1, 7),
(4, 2, 2, 3),
(5, 2, 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requisitos`
--

CREATE TABLE IF NOT EXISTS `requisitos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `certificado_notas` tinyint(1) NOT NULL,
  `boleta_promocion` tinyint(1) NOT NULL,
  `carta_buena_conducta` tinyint(1) NOT NULL,
  `fotos_estudiante` tinyint(1) NOT NULL,
  `fotos_representante` tinyint(1) NOT NULL,
  `fotocopia_cedula_estudiante` tinyint(1) NOT NULL,
  `fotocopia_cedula_representante` tinyint(1) NOT NULL,
  `partida_nacimiento` tinyint(1) NOT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `estudiante_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `estudiante_id` (`estudiante_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `requisitos`
--

INSERT INTO `requisitos` (`id`, `certificado_notas`, `boleta_promocion`, `carta_buena_conducta`, `fotos_estudiante`, `fotos_representante`, `fotocopia_cedula_estudiante`, `fotocopia_cedula_representante`, `partida_nacimiento`, `fecha_registro`, `fecha_actualizacion`, `estudiante_id`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, '2023-10-29 05:59:35.676400', '2023-10-29 05:59:35.676400', 1),
(2, 1, 1, 1, 1, 1, 1, 1, 1, '2023-10-29 06:51:29.591800', '2023-10-29 06:51:29.591800', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secciones`
--

CREATE TABLE IF NOT EXISTS `secciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `secciones`
--

INSERT INTO `secciones` (`id`, `nombre`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'D'),
(5, 'E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_inscripciones`
--

CREATE TABLE IF NOT EXISTS `tipo_inscripciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_inscripciones`
--

INSERT INTO `tipo_inscripciones` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Nuevo Ingreso', 'Estudiante inscripto en el año escolar actual'),
(2, 'Reinscripcion', 'Estudiante inscripto en el nuevo periodo');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `año_escolarizacion_has_secciones_año_escolar`
--
ALTER TABLE `año_escolarizacion_has_secciones_año_escolar`
  ADD CONSTRAINT `año_escolarizacion_h_año_escolar_id_13a6dde5_fk_año_escol` FOREIGN KEY (`año_escolar_id`) REFERENCES `año_escolar` (`id`),
  ADD CONSTRAINT `año_escolarizacion_h_año_id_b760be5b_fk_año_escol` FOREIGN KEY (`año_id`) REFERENCES `año_escolarizacion` (`id`),
  ADD CONSTRAINT `año_escolarizacion_h_seccion_id_1e2598b1_fk_secciones` FOREIGN KEY (`seccion_id`) REFERENCES `secciones` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_año_ingreso_id_3fa13444_fk_año_escolarizacion_id` FOREIGN KEY (`año_ingreso_id`) REFERENCES `año_escolarizacion` (`id`),
  ADD CONSTRAINT `estudiantes_estado_id_8f7d500b_fk_estado_estudiante_id` FOREIGN KEY (`estado_id`) REFERENCES `estado_estudiante` (`id`),
  ADD CONSTRAINT `estudiantes_persona_id_945467ad_fk_personas_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_estudiante_id_64dcccda_fk_estudiantes_id` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `inscripciones_parentesco_id_a46fce94_fk_parentescos_id` FOREIGN KEY (`parentesco_id`) REFERENCES `parentescos` (`id`),
  ADD CONSTRAINT `inscripciones_representante_legal__2d2dbaf0_fk_represent` FOREIGN KEY (`representante_legal_id`) REFERENCES `representantes` (`id`),
  ADD CONSTRAINT `inscripciones_seccion_año_id_a5605f23_fk_año_escol` FOREIGN KEY (`seccion_año_id`) REFERENCES `año_escolarizacion_has_secciones_año_escolar` (`id`),
  ADD CONSTRAINT `inscripciones_tipo_inscripcion_id_921ed618_fk_tipo_insc` FOREIGN KEY (`tipo_inscripcion_id`) REFERENCES `tipo_inscripciones` (`id`);

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `Materias_año_id_6c805be9_fk_año_escolarizacion_id` FOREIGN KEY (`año_id`) REFERENCES `año_escolarizacion` (`id`),
  ADD CONSTRAINT `Materias_nombre_id_5bd8e1f7_fk_Nombres_Materias_id` FOREIGN KEY (`nombre_id`) REFERENCES `nombres_materias` (`id`);

--
-- Filtros para la tabla `materias_has_inscripcion`
--
ALTER TABLE `materias_has_inscripcion`
  ADD CONSTRAINT `materias_has_inscrip_inscripcion_id_9387f32b_fk_inscripci` FOREIGN KEY (`inscripcion_id`) REFERENCES `inscripciones` (`id`),
  ADD CONSTRAINT `materias_has_inscripcion_materia_id_b0eff2f3_fk_Materias_id` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `notas_materias`
--
ALTER TABLE `notas_materias`
  ADD CONSTRAINT `notas_materias_estudiante_id_ce237b19_fk_estudiantes_id` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `notas_materias_materia_id_bd2ccce8_fk_Materias_id` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `personal_cargo_id_9b1a9838_fk_cargos_id` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`),
  ADD CONSTRAINT `personal_persona_id_b230763e_fk_personas_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_genero_id_6a17f9b9_fk_generos_id` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`);

--
-- Filtros para la tabla `representantes`
--
ALTER TABLE `representantes`
  ADD CONSTRAINT `representantes_persona_id_e7f351ec_fk_personas_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `representantes_has_estudiantes`
--
ALTER TABLE `representantes_has_estudiantes`
  ADD CONSTRAINT `API_representanteest_estudiante_id_7fc931ba_fk_estudiant` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `API_representanteest_parentesco_id_7fceae0a_fk_parentesc` FOREIGN KEY (`parentesco_id`) REFERENCES `parentescos` (`id`),
  ADD CONSTRAINT `API_representanteest_representante_id_8ae18fd0_fk_represent` FOREIGN KEY (`representante_id`) REFERENCES `representantes` (`id`);

--
-- Filtros para la tabla `requisitos`
--
ALTER TABLE `requisitos`
  ADD CONSTRAINT `requisitos_estudiante_id_7b458728_fk_estudiantes_id` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
