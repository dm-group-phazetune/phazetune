UPDATE users
SET 
first_name = $1,
last_name = $2,
location = $3,
bio = $4
WHERE user_id = $5;

SELECT first_name, last_name, location, bio FROM users WHERE user_id = $5