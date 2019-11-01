SELECT p.*, u.username FROM posts p
INNER JOIN users u
ON p.user_id = u.user_id
WHERE p.genre = $1


-- SELECT * FROM posts