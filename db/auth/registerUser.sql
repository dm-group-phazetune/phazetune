INSERT INTO users
(first_name, last_name, username, hash, location, follow_count)
VALUES
($1 , $2, $3, $4, $5, 0)
RETURNING *;