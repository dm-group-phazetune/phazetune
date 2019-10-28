SELECT 
  username, 
  city, 
  photo, 
  bio, 
  follow_count
FROM users
WHERE username = $1;