SELECT p.*, u.username, u.profile_pic FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE u.user_id = $1
UNION
SELECT p.*, u.username, u.profile_pic FROM posts p
JOIN following f ON f.following_id = p.user_id
JOIN users u ON f.following_id = u.user_id
WHERE f.user_id = $1
ORDER BY desc;