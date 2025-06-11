-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2025 at 02:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elearning`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`options`)),
  `answer` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `course_name`, `question`, `options`, `answer`, `created_at`) VALUES
(1, 'Networking', 'Which of the following is a Layer 3 device in the OSI model?', '[\"Switch\", \"Hub\", \"Router\", \"Bridge\", \"Repeater\"]', 'Router', '2025-06-03 07:57:17'),
(2, 'Networking', 'What is the purpose of the Domain Name System (DNS)?', '[\"To assign IP addresses to devices\", \"To encrypt internet connections\", \"To translate domain names into IP addresses\", \"To host websites\", \"To manage firewall rules\"]', 'To translate domain names into IP addresses', '2025-06-03 07:57:17'),
(3, 'Networking', 'Which of the following IP addresses is a private IP address?', '[\"192.0.2.1\", \"10.0.0.5\", \"8.8.8.8\", \"172.32.0.1\", \"169.254.0.1\"]', '10.0.0.5', '2025-06-03 07:57:17'),
(4, 'Networking', 'What protocol is used to send email from a client to a mail server?', '[\"HTTP\", \"IMAP\", \"POP3\", \"SMTP\", \"FTP\"]', 'SMTP', '2025-06-03 07:57:17'),
(5, 'Networking', 'Which of the following topologies has the highest fault tolerance?', '[\"Bus\", \"Star\", \"Ring\", \"Mesh\", \"Tree\"]', 'Mesh', '2025-06-03 07:57:17'),
(6, 'Networking', 'What is the default port number for HTTP?', '[\"443\", \"22\", \"80\", \"21\", \"110\"]', '80', '2025-06-03 07:57:17'),
(7, 'Networking', 'Which layer of the OSI model is responsible for reliable data transfer?', '[\"Physical\", \"Network\", \"Transport\", \"Session\", \"Data Link\"]', 'Transport', '2025-06-03 07:57:17'),
(8, 'Networking', 'Which device is used to connect different network segments and operates at Layer 2?', '[\"Router\", \"Firewall\", \"Hub\", \"Switch\", \"Gateway\"]', 'Switch', '2025-06-03 07:57:17'),
(9, 'Networking', 'Which of the following is NOT a characteristic of TCP?', '[\"Connection-oriented\", \"Reliable delivery\", \"Sequencing\", \"Fast, low latency\", \"Error checking\"]', 'Fast, low latency', '2025-06-03 07:57:17'),
(10, 'Networking', 'What is the function of ARP (Address Resolution Protocol)?', '[\"Assign IP addresses\", \"Translate domain names\", \"Map MAC addresses to IP addresses\", \"Map IP addresses to MAC addresses\", \"Filter network traffic\"]', 'Map IP addresses to MAC addresses', '2025-06-03 07:57:17'),
(11, 'IT', 'Which of the following is an example of system software?', '[\"Microsoft Word\", \"Adobe Photoshop\", \"Linux Operating System\", \"Google Chrome\", \"WhatsApp\"]', 'Linux Operating System', '2025-06-03 07:58:10'),
(12, 'IT', 'Which of the following is used to protect a computer from unauthorized access?', '[\"Compiler\", \"Firewall\", \"Text Editor\", \"Router\", \"Modem\"]', 'Firewall', '2025-06-03 07:58:10'),
(13, 'IT', 'Which one is a non-volatile memory?', '[\"RAM\", \"Cache\", \"ROM\", \"Registers\", \"Stack\"]', 'ROM', '2025-06-03 07:58:10'),
(14, 'IT', 'Which language is considered low-level and machine-dependent?', '[\"Java\", \"C++\", \"Assembly Language\", \"Python\", \"HTML\"]', 'Assembly Language', '2025-06-03 07:58:10'),
(15, 'IT', 'Which device is used to convert digital signals into analog and vice versa?', '[\"Switch\", \"Repeater\", \"Router\", \"Modem\", \"Bridge\"]', 'Modem', '2025-06-03 07:58:10'),
(16, 'IT', 'What does GUI stand for?', '[\"General User Input\", \"Graphic Utility Interface\", \"Graphical User Interface\", \"General Unit Interface\", \"Graphical User Integration\"]', 'Graphical User Interface', '2025-06-03 07:58:10'),
(17, 'IT', 'In database management systems, what does SQL stand for?', '[\"Standard Query Language\", \"Sequential Query Language\", \"Structured Query Language\", \"Server Query Language\", \"Static Query Language\"]', 'Structured Query Language', '2025-06-03 07:58:10'),
(18, 'IT', 'What is the primary function of an operating system?', '[\"Manage internet connections\", \"Store files in the cloud\", \"Manage hardware and software resources\", \"Provide antivirus protection\", \"Monitor energy usage\"]', 'Manage hardware and software resources', '2025-06-03 07:58:10'),
(19, 'IT', 'Which of the following is NOT a cloud storage provider?', '[\"Google Drive\", \"Dropbox\", \"OneDrive\", \"Oracle VM\", \"iCloud\"]', 'Oracle VM', '2025-06-03 07:58:10'),
(20, 'IT', 'Which of the following best describes phishing?', '[\"Downloading illegal software\", \"Sending spam emails\", \"Tricking users into revealing personal information\", \"Installing firewalls\", \"Encrypting network traffic\"]', 'Tricking users into revealing personal information', '2025-06-03 07:58:10');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` char(30) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `Credits` int(5) NOT NULL,
  `Lecturer ID` int(5) NOT NULL,
  `pages` int(11) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 1,
  `enrollment_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `Credits`, `Lecturer ID`, `pages`, `is_published`, `enrollment_count`) VALUES
(4, 'Networking', 'this is module structure', 15, 5, 50, 1, 2),
(5, 'IT', 'MODULE SLIDES', 20, 6, 45, 1, 2),
(8, 'English', 'introduction', 10, 2, 50, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `enrollment_date` datetime DEFAULT current_timestamp(),
  `completion_status` varchar(20) DEFAULT 'in_progress',
  `completion_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `enrollment_date`, `completion_status`, `completion_date`) VALUES
(1, 28, 5, '2025-06-11 10:08:36', 'in_progress', NULL),
(2, 28, 4, '2025-06-11 10:50:31', 'in_progress', NULL),
(3, 28, 8, '2025-06-11 11:07:43', 'in_progress', NULL),
(4, 37, 4, '2025-06-11 11:43:54', 'in_progress', NULL),
(5, 37, 5, '2025-06-11 11:44:50', 'in_progress', NULL),
(6, 37, 8, '2025-06-11 11:54:21', 'in_progress', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lecturer_id` int(11) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `firstname`, `lastname`, `username`, `email`, `password`, `role`, `status`) VALUES
(28, 'ntwali', 'tresor', 'tresor', 'tresor001@gmail.com', '$2b$10$/RDVAhsWdKTIJt8r13OmWO0H7.jKEoA6x35rfqQzmwvHtw/wvUHeC', 'learner', 'active'),
(29, 'dudu', 'keza', 'dudu', 'dudu@gmail.com', '$2b$10$cYYW6GWKN8tmi2ZeXZGvjOD0z6Nox2FRFyKZHcbvtsnIl4YW.ksTW', 'lecturer', 'active'),
(30, 'dorocas', 'wase', 'wase', 'dodowase@gmail.com', '$2b$10$PNO61rW.KOijW4kkaMp9Y.K2f.7nMb169H7rJ2Bd.JSbAWMNP8r5e', 'administrator', 'active'),
(36, 'HIRWA', 'Fanny', 'hirwaf', 'hirwa@gmail.com', '$2b$10$rYS3nb04qIM1vBATFH0YiuInsfPymCUE0DcnRdOREEs6wMF0BgWR2', 'administrator', 'active'),
(37, 'HIRWA', 'Francoise', 'hirwafanny', 'hirwafrancoise01@gmail.com', '$2b$10$RP51dSUHXws/mD9Ep3rCp.RC8Is1Wth4Xmzpr5rbaoTR6Dk27Br2G', 'learner', 'active'),
(38, 'hirwa', 'fani', 'fani', 'hirwafani@gmail.com', '$2b$10$1QCfmQgcs857PK7BpyhTcu4bM2cE36STIdoR7VQb8OPzwm9.sGyiC', 'lecturer', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lecturer_id` (`lecturer_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `registration` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `registration` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
