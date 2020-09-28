-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 05-09-2020 a las 04:18:02
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `starpos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `c_categories`
--

CREATE TABLE `c_categories` (
  `categories_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `facilities_id` int(11) NOT NULL,
  `code` varchar(13) COLLATE utf8_spanish_ci NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `c_categories`
--

INSERT INTO `c_categories` (`categories_id`, `organization_id`, `facilities_id`, `code`, `name`, `created`, `updated`) VALUES
(2, 1, 1, '40837Cfaa6e', 'Elegante', '2020-08-22 13:51:34', '2020-08-22 13:51:34'),
(3, 42, 1, '8DFad5fbafA', 'Escolares', '2020-08-24 11:39:40', '2020-08-24 11:14:33'),
(5, 42, 13, 'C021cbc3aF5', 'Clasicos', '2020-08-24 11:39:49', '2020-08-24 11:15:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `c_customer`
--

CREATE TABLE `c_customer` (
  `customer_id` int(11) NOT NULL,
  `uuid` varchar(11) COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `lastname` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mobilephone` bigint(15) DEFAULT NULL,
  `email` varchar(140) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(140) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `e_employees`
--

CREATE TABLE `e_employees` (
  `employees_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `facilities_id` int(11) NOT NULL,
  `idemp` int(11) DEFAULT NULL,
  `code` bigint(12) NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `phone` bigint(15) NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `jobtype_id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `e_employees`
--

INSERT INTO `e_employees` (`employees_id`, `organization_id`, `facilities_id`, `idemp`, `code`, `name`, `address`, `phone`, `email`, `jobtype_id`, `created`, `updated`) VALUES
(1, 42, 1, 760001, 760001, 'Mercamio SAS el sure', 'Cra. 33a #39-34', 3147674969, 'jhondember0424@gmail.com', 2, '2020-08-22 13:34:25', '2020-08-22 13:34:25'),
(2, 42, 13, 12345678, 12345678, 'Duvan Zapata', 'Cra. 33a #89-84', 3147674969, 'duvanzapa@gmail.com', 1, '2020-08-24 09:53:42', '2020-08-24 09:53:42'),
(4, 42, 13, 94384399, 94384399, 'Jhon Eulises M', 'Cra. 33a #39-349', 3116267576, 'jhonmurillo12345@gmail.com', 5, '2020-08-24 10:46:25', '2020-08-24 10:46:25'),
(5, 42, 13, 1234194352, 1234194352, 'Jhon Denver Cesar', 'Cra. 33a #39-349', 3116267576, 'jhonmurillo12345@gmail.com', 6, '2020-08-24 10:46:28', '2020-08-24 10:46:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `f_facilities`
--

CREATE TABLE `f_facilities` (
  `facilities_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `code` bigint(12) NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `phone` bigint(15) NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `f_facilities`
--

INSERT INTO `f_facilities` (`facilities_id`, `organization_id`, `code`, `name`, `address`, `phone`, `email`, `created`, `updated`) VALUES
(1, 42, 760001, 'Mercamio SAS el sure', 'Cra. 33a #39-349', 3147674969, 'jhondember0424@gmail.com', '2020-08-22 12:58:03', '2020-08-22 12:58:03'),
(13, 48, 8978456, 'Mercamio el Norte', 'Cra. 60 #03-08', 4051426, 'marcamionorth@gmail.com', '2020-08-24 09:22:54', '2020-08-24 09:22:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `j_jobtype`
--

CREATE TABLE `j_jobtype` (
  `jobtype_id` int(11) NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `j_jobtype`
--

INSERT INTO `j_jobtype` (`jobtype_id`, `name`) VALUES
(1, 'Gerente'),
(2, 'Representante de Ventas'),
(3, 'Auxiliar'),
(4, 'Cocinero'),
(5, 'Vendedor'),
(6, 'Aux de Ventas'),
(7, 'Recepcionista'),
(8, 'Mesero'),
(9, 'Jefe de cocina'),
(10, 'Chef ejecutivo'),
(11, 'Pastelero'),
(12, 'Lavaloza'),
(13, 'Cajero'),
(14, 'Vigilante'),
(15, 'Domiciliario'),
(16, 'Aux administrativo'),
(17, 'Empleado'),
(18, 'Surtidor/Pasillero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `o_organization`
--

CREATE TABLE `o_organization` (
  `organization_id` int(11) NOT NULL,
  `nit` bigint(12) NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(60) COLLATE utf8_spanish_ci DEFAULT NULL,
  `phone` bigint(15) NOT NULL DEFAULT 0,
  `mobilephone` bigint(15) NOT NULL DEFAULT 0,
  `email` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `o_organization`
--

INSERT INTO `o_organization` (`organization_id`, `nit`, `name`, `address`, `phone`, `mobilephone`, `email`, `created`, `updated`) VALUES
(1, 1234194352, 'Codelinesw', 'Cra. 33a #39-34', 4051426, 3117222333, 'codelinesw@gmail.com', '2020-08-22 12:45:42', '2020-08-22 12:45:42'),
(42, 1234194352, 'Merca mio S.A.S', 'Cra. 33a #39-34', 235456, 3116267576, 'mercamiosas@gmail.com', '2020-08-24 17:00:18', '2020-08-24 17:00:18'),
(48, 6545454, 'Gobernacion Comida Gourmet', 'Cra. 33a #89-84', 4372401, 3147674969, 'gobercomida@gmail.com', '2020-08-24 06:15:57', '2020-08-24 06:15:57'),
(50, 959595, 'Organizacion de prueba', 'Cra 95', 426868, 556565, 'prueba@gmail.com', '2020-09-04 10:17:08', '2020-09-04 10:17:08'),
(51, 959595, 'Organizacion de prueba', 'Cra 95', 426868, 556565, 'prueba@gmail.com', '2020-09-04 10:20:06', '2020-09-04 10:20:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_products`
--

CREATE TABLE `p_products` (
  `products_id` int(11) NOT NULL,
  `organization_id` int(11) NOT NULL,
  `facilities_id` int(11) NOT NULL,
  `imgI` text COLLATE utf8_spanish_ci NOT NULL,
  `imgII` text COLLATE utf8_spanish_ci NOT NULL,
  `imgIII` text COLLATE utf8_spanish_ci NOT NULL,
  `imgIV` text COLLATE utf8_spanish_ci NOT NULL,
  `code` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `name` text COLLATE utf8_spanish_ci NOT NULL,
  `purprice` bigint(12) NOT NULL,
  `salesprice` bigint(12) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `gender` varchar(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `color` varchar(120) COLLATE utf8_spanish_ci DEFAULT NULL,
  `description` text COLLATE utf8_spanish_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `p_products`
--

INSERT INTO `p_products` (`products_id`, `organization_id`, `facilities_id`, `imgI`, `imgII`, `imgIII`, `imgIV`, `code`, `name`, `purprice`, `salesprice`, `categories_id`, `qty`, `gender`, `color`, `description`, `created`, `updated`) VALUES
(1, 42, 13, '/opt/lampp/htdocs/starpos/storage/images/products/159855318624adidas.jpeg', '/opt/lampp/htdocs/starpos/storage/images/products/159856070224nike.jpg', '', '', 'AF76dFeF1b8', 'Zapatillas Adidas Modelo 2021', 75000, 95000, 3, 30, 'H', 'color-blue-light,color-yellow,color-green-lemon,color-green-lemon,color-blue,color-black', '/opt/lampp/htdocs/starpos/storage/Description/Products/Zapatillas_Adidas_Modelo_20212020-08-27_.txt', '2020-08-27 15:53:17', '2020-08-27 15:53:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `p_products_size`
--

CREATE TABLE `p_products_size` (
  `products_size_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `size` int(11) DEFAULT 0,
  `qty` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `r_roles`
--

CREATE TABLE `r_roles` (
  `roles_id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `s_sales`
--

CREATE TABLE `s_sales` (
  `sales_id` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `facilities_id` int(11) DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL,
  `state` varchar(2) COLLATE utf8_spanish_ci DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `created` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `u_users`
--

CREATE TABLE `u_users` (
  `users_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `username` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `c_categories`
--
ALTER TABLE `c_categories`
  ADD PRIMARY KEY (`categories_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `facilities_id` (`facilities_id`);

--
-- Indices de la tabla `c_customer`
--
ALTER TABLE `c_customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indices de la tabla `e_employees`
--
ALTER TABLE `e_employees`
  ADD PRIMARY KEY (`employees_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `facilities_id` (`facilities_id`),
  ADD KEY `jobtype_id` (`jobtype_id`);

--
-- Indices de la tabla `f_facilities`
--
ALTER TABLE `f_facilities`
  ADD PRIMARY KEY (`facilities_id`),
  ADD KEY `organization_id` (`organization_id`);

--
-- Indices de la tabla `j_jobtype`
--
ALTER TABLE `j_jobtype`
  ADD PRIMARY KEY (`jobtype_id`);

--
-- Indices de la tabla `o_organization`
--
ALTER TABLE `o_organization`
  ADD PRIMARY KEY (`organization_id`),
  ADD UNIQUE KEY `organization_id` (`organization_id`);

--
-- Indices de la tabla `p_products`
--
ALTER TABLE `p_products`
  ADD PRIMARY KEY (`products_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `facilities_id` (`facilities_id`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Indices de la tabla `p_products_size`
--
ALTER TABLE `p_products_size`
  ADD PRIMARY KEY (`products_size_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `r_roles`
--
ALTER TABLE `r_roles`
  ADD PRIMARY KEY (`roles_id`);

--
-- Indices de la tabla `s_sales`
--
ALTER TABLE `s_sales`
  ADD PRIMARY KEY (`sales_id`),
  ADD KEY `employee_efbk` (`employee_id`),
  ADD KEY `customer_cfbk` (`customer_id`);

--
-- Indices de la tabla `u_users`
--
ALTER TABLE `u_users`
  ADD PRIMARY KEY (`users_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `c_categories`
--
ALTER TABLE `c_categories`
  MODIFY `categories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `c_customer`
--
ALTER TABLE `c_customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `e_employees`
--
ALTER TABLE `e_employees`
  MODIFY `employees_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `f_facilities`
--
ALTER TABLE `f_facilities`
  MODIFY `facilities_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `j_jobtype`
--
ALTER TABLE `j_jobtype`
  MODIFY `jobtype_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `o_organization`
--
ALTER TABLE `o_organization`
  MODIFY `organization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `p_products`
--
ALTER TABLE `p_products`
  MODIFY `products_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `p_products_size`
--
ALTER TABLE `p_products_size`
  MODIFY `products_size_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `r_roles`
--
ALTER TABLE `r_roles`
  MODIFY `roles_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `s_sales`
--
ALTER TABLE `s_sales`
  MODIFY `sales_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `u_users`
--
ALTER TABLE `u_users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `c_categories`
--
ALTER TABLE `c_categories`
  ADD CONSTRAINT `facilities_cbki` FOREIGN KEY (`facilities_id`) REFERENCES `f_facilities` (`facilities_id`),
  ADD CONSTRAINT `organization_cfbk` FOREIGN KEY (`organization_id`) REFERENCES `o_organization` (`organization_id`);

--
-- Filtros para la tabla `e_employees`
--
ALTER TABLE `e_employees`
  ADD CONSTRAINT `facilities_ebki` FOREIGN KEY (`facilities_id`) REFERENCES `f_facilities` (`facilities_id`),
  ADD CONSTRAINT `jobtype_jfbk` FOREIGN KEY (`jobtype_id`) REFERENCES `j_jobtype` (`jobtype_id`),
  ADD CONSTRAINT `organization_efbk` FOREIGN KEY (`organization_id`) REFERENCES `o_organization` (`organization_id`);

--
-- Filtros para la tabla `f_facilities`
--
ALTER TABLE `f_facilities`
  ADD CONSTRAINT `organization_ofbk` FOREIGN KEY (`organization_id`) REFERENCES `o_organization` (`organization_id`);

--
-- Filtros para la tabla `p_products`
--
ALTER TABLE `p_products`
  ADD CONSTRAINT `categories_pcfbk` FOREIGN KEY (`categories_id`) REFERENCES `c_categories` (`categories_id`),
  ADD CONSTRAINT `facilities_pfbk` FOREIGN KEY (`facilities_id`) REFERENCES `f_facilities` (`facilities_id`),
  ADD CONSTRAINT `organization_pfbk` FOREIGN KEY (`organization_id`) REFERENCES `o_organization` (`organization_id`);

--
-- Filtros para la tabla `p_products_size`
--
ALTER TABLE `p_products_size`
  ADD CONSTRAINT `product_idsizep` FOREIGN KEY (`product_id`) REFERENCES `p_products` (`products_id`);

--
-- Filtros para la tabla `s_sales`
--
ALTER TABLE `s_sales`
  ADD CONSTRAINT `customer_cfbk` FOREIGN KEY (`customer_id`) REFERENCES `c_customer` (`customer_id`),
  ADD CONSTRAINT `employee_efbk` FOREIGN KEY (`employee_id`) REFERENCES `e_employees` (`employees_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
