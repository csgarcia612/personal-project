INSERT INTO users (auth0_id, username, first_name, last_name, email, image_url, bio)
values ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
