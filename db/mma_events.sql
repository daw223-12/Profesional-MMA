-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2026 a las 14:31:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mma_events`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT 0.00,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `capacity` int(10) UNSIGNED DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `promotion_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `name`, `date`, `location`, `price`, `status`, `capacity`, `image_url`, `promotion_id`, `created_at`, `updated_at`) VALUES
(13, 'Quia et et.', '2026-07-09 09:29:00', 'West Violettemouth', 50.08, 'published', 15917, 'https://img.magnific.com/psd-gratis/plantilla-redes-sociales-boxeo-deisgn_505751-6904.jpg?semt=ais_hybrid&w=740&q=80', 2, '2026-05-31 16:17:49', '2026-06-06 21:54:26'),
(32, 'Evento pucelano', '2026-06-10 10:00:00', 'Valladolid', 10.00, 'published', 50, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/2021-05-15_Valladolid_2_edited.jpg/330px-2021-05-15_Valladolid_2_edited.jpg', 3, '2026-06-06 21:02:32', '2026-06-06 21:02:32'),
(33, 'DWT', '2026-02-20 20:00:00', 'Barcelona', 20.00, 'published', 50000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Ja0c9AfVQNFPUUTf2ASu0SvSbZyAziA1cw&s', 2, '2026-06-06 22:11:08', '2026-06-06 22:11:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites`
--

CREATE TABLE `favorites` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `favorites`
--

INSERT INTO `favorites` (`user_id`, `event_id`, `created_at`, `updated_at`) VALUES
(2, 32, '2026-06-06 23:28:49', '2026-06-06 23:28:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fighters`
--

CREATE TABLE `fighters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `wins` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `losses` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `draws` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `height` decimal(5,2) DEFAULT NULL,
  `reach` decimal(5,2) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fighters`
--

INSERT INTO `fighters` (`id`, `name`, `nickname`, `wins`, `losses`, `draws`, `height`, `reach`, `photo_url`, `created_at`, `updated_at`) VALUES
(1, 'Ilia Topuria', 'El Primero', 16, 0, 0, 1.70, 175.00, 'https://example.com/images/ilia-topuria.jpg', '2026-05-31 16:17:48', '2026-06-03 09:44:48'),
(2, 'Ms. Mossie Mueller PhD', 'Felicita', 21, 10, 0, 160.94, 191.97, 'https://via.placeholder.com/640x480.png/00dd44?text=ullam', '2026-05-31 16:17:48', '2026-05-31 16:17:48'),
(3, 'Salvador Hintz', 'Arianna', 18, 6, 0, 172.88, 174.72, 'https://via.placeholder.com/640x480.png/004466?text=veniam', '2026-05-31 16:17:48', '2026-05-31 16:17:48'),
(4, 'Bernita Kunze', 'Lamar', 23, 10, 2, 162.00, 174.00, 'https://images.stockcake.com/public/1/2/5/1250dfec-2f01-49ba-8919-10fa8ec30756_large/victorious-mma-fighter-stockcake.jpg', '2026-05-31 16:17:48', '2026-06-06 21:58:32'),
(54, 'Pepe Rodriguez', 'Jet', 14, 2, 2, 180.00, 175.00, 'https://gotofight.com/wp-content/uploads/listing-uploads/logo/2024/11/12/111_673383a05be78.webp', '2026-06-07 00:06:18', '2026-06-07 09:50:07'),
(55, 'Guillermo Alvarez', 'El pillo', 5, 0, 0, 175.00, 175.00, NULL, '2026-06-07 01:09:07', '2026-06-07 01:09:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fights`
--

CREATE TABLE `fights` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `fight_type` varchar(255) NOT NULL DEFAULT 'single',
  `result_method` varchar(255) DEFAULT NULL,
  `result_round` tinyint(3) UNSIGNED DEFAULT NULL,
  `result_time` varchar(255) DEFAULT NULL,
  `rule_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fights`
--

INSERT INTO `fights` (`id`, `name`, `fight_type`, `result_method`, `result_round`, `result_time`, `rule_id`, `event_id`, `created_at`, `updated_at`) VALUES
(12, 'Main Event', 'single', NULL, NULL, NULL, 5, 32, '2026-06-07 10:01:05', '2026-06-07 10:01:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fight_fighters`
--

CREATE TABLE `fight_fighters` (
  `fight_id` bigint(20) UNSIGNED NOT NULL,
  `fighter_id` bigint(20) UNSIGNED NOT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `is_winner` tinyint(1) NOT NULL DEFAULT 0,
  `result_order` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `fight_fighters`
--

INSERT INTO `fight_fighters` (`fight_id`, `fighter_id`, `team_name`, `position`, `weight`, `is_winner`, `result_order`, `created_at`, `updated_at`) VALUES
(12, 55, 'Red Corner', NULL, 70.00, 0, NULL, '2026-06-07 10:01:06', '2026-06-07 10:01:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gyms`
--

CREATE TABLE `gyms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `specialty` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gyms`
--

INSERT INTO `gyms` (`id`, `name`, `location`, `specialty`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Prohaska, Reynolds and Torp', 'East Minnieland', 'Wrestling', 'https://via.placeholder.com/640x480.png/00aabb?text=sunt', '2026-05-31 16:17:48', '2026-05-31 16:17:48'),
(2, 'Emmerich PLC', 'North Roryville', 'BJJ', 'https://via.placeholder.com/640x480.png/00ddff?text=nihil', '2026-05-31 16:17:48', '2026-05-31 16:17:48'),
(3, 'Lang-Doyle', 'West Eleonore', 'Striking', 'https://via.placeholder.com/640x480.png/007733?text=quo', '2026-05-31 16:17:48', '2026-05-31 16:17:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gym_fighters`
--

CREATE TABLE `gym_fighters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gym_id` bigint(20) UNSIGNED NOT NULL,
  `fighter_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `gym_fighters`
--

INSERT INTO `gym_fighters` (`id`, `gym_id`, `fighter_id`, `start_date`, `end_date`, `image_url`, `created_at`, `updated_at`) VALUES
(2, 2, 1, '2026-06-01', NULL, NULL, NULL, NULL),
(4, 3, 4, '2001-02-10', NULL, NULL, '2026-06-06 21:58:32', '2026-06-06 21:58:32'),
(5, 2, 55, '2026-06-12', NULL, NULL, '2026-06-07 01:09:07', '2026-06-07 01:09:07'),
(6, 2, 54, '2002-02-10', NULL, NULL, '2026-06-07 09:50:08', '2026-06-07 09:50:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_31_164008_create_personal_access_tokens_table', 1),
(5, '2026_05_31_164205_create_gyms_table', 1),
(6, '2026_05_31_164206_create_fighters_table', 1),
(7, '2026_05_31_164206_create_promotions_table', 1),
(8, '2026_05_31_164207_create_mma_events_table', 1),
(9, '2026_05_31_164208_create_rules_table', 1),
(10, '2026_05_31_164209_create_fights_table', 1),
(11, '2026_05_31_164210_create_tickets_table', 1),
(12, '2026_05_31_164213_create_favorites_table', 1),
(13, '2026_05_31_164214_create_fight_fighters_table', 1),
(14, '2026_05_31_164214_create_gym_fighters_table', 1),
(15, '2026_05_31_164224_add_project_fields_to_users_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(62, 'App\\Models\\User', 6, 'api-token', 'dd065dce24759d137ce0b8bc92a48ed26600134a64b8dbb395697a7bcd885f12', '[\"*\"]', '2026-06-07 01:00:15', NULL, '2026-06-07 00:55:41', '2026-06-07 01:00:15'),
(65, 'App\\Models\\User', 2, 'api-token', '6d0aad26b7a331007c0e3563f82ee57914960b4e7c43e59cefe117ca3dfc66c4', '[\"*\"]', '2026-06-07 10:08:18', NULL, '2026-06-07 09:58:52', '2026-06-07 10:08:18'),
(66, 'App\\Models\\User', 2, 'api-token', 'cf74cc91be83dd4f2118ed2588b416737c7878baf3f08ccd2f9a020c157d75f2', '[\"*\"]', '2026-06-07 10:30:30', NULL, '2026-06-07 10:23:31', '2026-06-07 10:30:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `promotions`
--

INSERT INTO `promotions` (`id`, `name`, `description`, `website_url`, `image_url`, `created_at`, `updated_at`) VALUES
(2, 'Lehner-O\'Connell', 'Quibusdam ut voluptas velit recusandae. Quam dolorem vel ad voluptatem voluptas laudantium reprehenderit. Delectus aspernatur minima possimus est doloribus sed. Repudiandae recusandae culpa et dolore praesentium.', 'https://www.huels.com/laudantium-quo-veniam-reiciendis-et-error-voluptate-excepturi', 'https://via.placeholder.com/640x480.png/0000ee?text=beatae', '2026-05-31 16:17:48', '2026-05-31 16:17:48'),
(3, 'Hagenes, Altenwerth and Kautzer', 'Occaecati voluptates odit iusto saepe. Consequatur sed magnam iure id. Nobis est enim vero rerum reiciendis ut soluta. Et eos recusandae iste quae eveniet excepturi.', 'http://www.emard.biz/sit-nisi-accusamus-et-quia-molestiae-inventore-nihil', 'https://via.placeholder.com/640x480.png/0022bb?text=eveniet', '2026-05-31 16:17:48', '2026-05-31 16:17:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rules`
--

CREATE TABLE `rules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight_class` varchar(255) NOT NULL,
  `rounds` tinyint(3) UNSIGNED NOT NULL,
  `minutes_per_round` tinyint(3) UNSIGNED NOT NULL,
  `style` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rules`
--

INSERT INTO `rules` (`id`, `name`, `weight_class`, `rounds`, `minutes_per_round`, `style`, `created_at`, `updated_at`) VALUES
(4, 'Reglas hechas por un promoter', 'Peso Pesado', 3, 5, 'MMA', '2026-06-03 13:28:29', '2026-06-06 23:58:37'),
(5, 'Ejemplazo', 'Peso medio', 5, 5, 'Estiloso', '2026-06-06 23:58:08', '2026-06-06 23:58:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `total_price` decimal(8,2) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'reserved',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `is_premium` tinyint(1) NOT NULL DEFAULT 0,
  `promotion_id` bigint(20) UNSIGNED DEFAULT NULL,
  `gym_id` bigint(20) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `is_premium`, `promotion_id`, `gym_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Basic User', 'basic@test.com', '2026-05-31 16:17:50', '$2y$12$k.hAZXodnYNjeb1OsSNhQeshGatI98TOWk6pqDhemZvAFW2cH9xke', 'user', 1, NULL, NULL, 'w36RR25tdE', '2026-05-31 16:17:50', '2026-06-06 23:31:17'),
(2, 'Francisco Juesas', 'fran@test.com', NULL, '$2y$12$kvqKZcOsSLdepZQ6efNbVOwrLX7g4se9pe8ruujsn0GLct4raiVfK', 'super_admin', 1, NULL, NULL, NULL, '2026-05-31 19:42:50', '2026-06-03 12:09:19'),
(3, 'Premium User', 'premium@test.com', NULL, '$2y$12$35W4DffYLURBxU6I41GXlencZdEZffXWUiw2qFyoke27XJa0Wr622', 'user', 1, NULL, NULL, NULL, '2026-06-03 12:00:03', '2026-06-03 12:54:47'),
(5, 'Promoter Admin', 'promoter@test.com', NULL, '$2y$12$XFgout/lyX.riw0cfOGQ0uE6.VyAfYqI84G5XlWeaqDbqAVOGrmCO', 'promoter_admin', 0, 2, NULL, NULL, '2026-06-03 12:57:59', '2026-06-06 23:12:53'),
(6, 'Gym Admin', 'gym@test.com', NULL, '$2y$12$GJ8NQKGYXDmKSX78A2F3YuhMwZ2FLnUJXR/POUXK39/12Wgz0178u', 'gym_admin', 1, NULL, 2, NULL, '2026-06-03 13:00:44', '2026-06-07 09:53:30'),
(8, 'New User', 'newuser@test.com', NULL, '$2y$12$OF6ZdOoMd/m9vUvIam5sx.d92tv.2NZ2Zld1ioE3izd86Tl1hrm52', 'user', 0, NULL, NULL, NULL, '2026-06-06 23:11:40', '2026-06-06 23:11:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_promotion_id_foreign` (`promotion_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`event_id`),
  ADD KEY `favorites_event_id_foreign` (`event_id`);

--
-- Indices de la tabla `fighters`
--
ALTER TABLE `fighters`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fights`
--
ALTER TABLE `fights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fights_rule_id_foreign` (`rule_id`),
  ADD KEY `fights_event_id_foreign` (`event_id`);

--
-- Indices de la tabla `fight_fighters`
--
ALTER TABLE `fight_fighters`
  ADD PRIMARY KEY (`fight_id`,`fighter_id`),
  ADD KEY `fight_fighters_fighter_id_foreign` (`fighter_id`);

--
-- Indices de la tabla `gyms`
--
ALTER TABLE `gyms`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gym_fighters`
--
ALTER TABLE `gym_fighters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gym_fighters_gym_id_foreign` (`gym_id`),
  ADD KEY `gym_fighters_fighter_id_foreign` (`fighter_id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indices de la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tickets_user_id_foreign` (`user_id`),
  ADD KEY `tickets_event_id_foreign` (`event_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_promotion_id_foreign` (`promotion_id`),
  ADD KEY `users_gym_id_foreign` (`gym_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `fights`
--
ALTER TABLE `fights`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `gyms`
--
ALTER TABLE `gyms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `gym_fighters`
--
ALTER TABLE `gym_fighters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `rules`
--
ALTER TABLE `rules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fights`
--
ALTER TABLE `fights`
  ADD CONSTRAINT `fights_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fights_rule_id_foreign` FOREIGN KEY (`rule_id`) REFERENCES `rules` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fight_fighters`
--
ALTER TABLE `fight_fighters`
  ADD CONSTRAINT `fight_fighters_fight_id_foreign` FOREIGN KEY (`fight_id`) REFERENCES `fights` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fight_fighters_fighter_id_foreign` FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `gym_fighters`
--
ALTER TABLE `gym_fighters`
  ADD CONSTRAINT `gym_fighters_fighter_id_foreign` FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `gym_fighters_gym_id_foreign` FOREIGN KEY (`gym_id`) REFERENCES `gyms` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tickets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_gym_id_foreign` FOREIGN KEY (`gym_id`) REFERENCES `gyms` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
