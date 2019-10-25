UPDATE users
SET 
first_name = $1,
last_name = $2,
city = $3,
photo = $4
bio = $5
WHERE user_id = $6;

SELECT first_name, last_name, city, photo, bio FROM users WHERE user_id = $6