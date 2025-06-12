CREATE DATABASE serverly;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  pseudo VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE nodes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  fqdn VARCHAR(255) NOT NULL, -- Fully Qualified Domain Name
  ip_address VARCHAR(45) NOT NULL,
  location_id INT, -- Référence à la table `locations`
  token VARCHAR(255) NULL UNIQUE, -- pour communication sécurisée avec l'agent
  status VARCHAR(20) DEFAULT 'unknown',
  ssh_port INT DEFAULT 22,
  maintenance BOOLEAN DEFAULT FALSE,
  cpu_usage FLOAT DEFAULT -1,
  ram_usage FLOAT DEFAULT -1,
  storage_usage FLOAT DEFAULT -1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
);

CREATE TABLE node_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  node_id INT NOT NULL,
  os VARCHAR(100),
  os_version VARCHAR(255),
  architecture VARCHAR(100),
  processor VARCHAR(100),
  cpu_count INTEGER,
  cpu_percent FLOAT,
  memory_total_gb BIGINT,
  memory_used_gb BIGINT,
  memory_percent FLOAT,
  disk_total_gb BIGINT,
  disk_used_gb BIGINT,
  disk_percent FLOAT,
  boot_time BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);

CREATE TABLE servers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  node_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  ssh_port INT DEFAULT 22,
  username VARCHAR(100),
  os_type VARCHAR(100),
  status VARCHAR(20) DEFAULT 'unknown',
  notes TEXT,
  token VARCHAR(255) NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);

CREATE TABLE server_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  server_id INT NOT NULL,
  hostname VARCHAR(255),
  os VARCHAR(100),
  os_version TEXT,
  cpu_usage FLOAT,
  ram_total BIGINT,
  ram_used BIGINT,
  uptime BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE
);


CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);