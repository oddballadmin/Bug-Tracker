DROP TABLE IF EXISTS bugs;
DROP TABLE IF EXISTS users;

-- CREATE USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP 
                        ON UPDATE CURRENT_TIMESTAMP,
  num_of_bugs_fixed   INT DEFAULT 0,
  num_of_bugs_reported INT DEFAULT 0,
  is_admin BOOLEAN     DEFAULT FALSE,
  current_bug_id_claimed INT DEFAULT NULL,
  CONSTRAINT fk_users_current_bug
    FOREIGN KEY (current_bug_id_claimed)
    REFERENCES bugs(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- CREATE BUGS TABLE
CREATE TABLE IF NOT EXISTS bugs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP 
                        ON UPDATE CURRENT_TIMESTAMP,
  reported_by INT NOT NULL,
  assigned_to INT DEFAULT NULL,
  CONSTRAINT fk_bugs_reported_by
    FOREIGN KEY (reported_by)
    REFERENCES users(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_bugs_assigned_to
    FOREIGN KEY (assigned_to)
    REFERENCES users(id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- INSERT USER values
-- seed.sql

-- 1) Wipe out old test data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE bugs;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert users
INSERT INTO users 
  (username, password, email, num_of_bugs_fixed, num_of_bugs_reported, is_admin, current_bug_id_claimed)
VALUES
  ('alice', '$2b$10$LNJ8K3iifpc.wAdvMH/EI.o3AMvUqHb846nQuF5AGmbCBU3HKdgce', 'alice@example.com', 0, 0, TRUE,  NULL),
  ('bob',   '$2b$10$LNJ8K3iifpc.wAdvMH/EI.o3AMvUqHb846nQuF5AGmbCBU3HKdgce', 'bob@example.com',   0, 0, FALSE, NULL),
  ('carol', '$2b$10$LNJ8K3iifpc.wAdvMH/EI.o3AMvUqHb846nQuF5AGmbCBU3HKdgce', 'carol@example.com', 0, 0, FALSE, NULL),
  ('dave',  '$2b$10$LNJ8K3iifpc.wAdvMH/EI.o3AMvUqHb846nQuF5AGmbCBU3HKdgce', 'dave@example.com',  0, 0, FALSE, NULL);

-- Insert bugs
INSERT INTO bugs 
  (title, description, status, reported_by, assigned_to)
VALUES
  ('Login page error',        'On submitting the login form, nothing happens.',      'open',       1, 2),
  ('Profile upload fails',     'Users cannot upload profile pictures—upload hangs.',  'open',       2, 3),
  ('Notifications not sent',   'Email notifications are never delivered.',           'in progress', 3, 1),
  ('Dashboard metrics wrong',  'Charts on dashboard show incorrect values.',         'open',       4, 1),
  ('Search function slow',     'Searching takes 10+ seconds for basic queries.',    'in progress', 1, 4),
  ('CSV export missing cols',  'Data export omits the "status" and "assigned_to".', 'closed',     2, 3);
