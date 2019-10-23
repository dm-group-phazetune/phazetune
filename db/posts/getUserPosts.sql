SELECT users.username, posts.genre, posts.sound_url, posts.youtube, posts.post_id
FROM users
JOIN posts
ON users.user_id = posts.user_id
WHERE username = $1