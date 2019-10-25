SELECT following.follow_id, following.following_id, posts.user_id
FROM following
JOIN posts
ON following.follow_id = posts.follow_id