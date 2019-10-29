UPDATE posts 
SET title = $1,
genre = $2
WHERE user_id = $4 AND post_id = $3;