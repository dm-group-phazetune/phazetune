SELECT users.username, posts.genre, posts.title, posts.audio_url, posts.post_id
FROM users
JOIN posts
ON users.user_id = posts.user_id
WHERE username = $1