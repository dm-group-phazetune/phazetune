INSERT INTO users
(first_name, last_name, username, hash, location, photo, bio, follow_count)
VALUES
($1, $2, $3, $4, $5, $6, $7, 0)