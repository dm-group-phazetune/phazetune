-- Register user
INSERT INTO users
(first_name, last_name, username, hash, city, photo, bio, follow_count)
VALUES
('test', 'test', 'test', 'test', 'test', 'test', 'test', 0);

-- update user table
UPDATE users
SET bio = 'hasdiuhfuhds',
  city = 'CA' 
WHERE
  username = '8';