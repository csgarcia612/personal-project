update users 
set username = ${username}, first_name = ${first_name}, last_name = ${last_name}, email = ${email}, image_url = ${image_url}, bio = ${bio} 
where auth0_id = ${auth0_id};
