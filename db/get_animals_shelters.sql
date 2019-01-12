select 
a.id,
a.name as animal_name,
a.breed,
a.age,
a.sex,
a.size,
a.image_url,
s.name as shelter_name,
s.phone,
s.email,
s.address1,
s.address2,
s.city,
s.state,
s.zipcode,
s.latitude,
s.longitude
from animals a
join shelters s
on a.shelter_id = s.shelter_id
ORDER BY a.id ASC