INSERT INTO following
(user_id, follow_id)
VALUES
($1, $2)

-- UPDATE users
-- SET follow_count = follow_count + 1
-- WHERE username = $2