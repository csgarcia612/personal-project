create table if not exists users(
id serial primary key,
auth0_id varchar not null,
username varchar(30) not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
email text not null,
image_url text,
bio text
);

create table if not exists animals(
id serial primary key,
name varchar(30),
breed varchar(50),
age varchar(20),
sex varchar(1),
size varchar(2),
shelter_id varchar(10),
image_url text
);

create table if not exists adopted(
id serial primary key,
user_id integer,
animal_id integer
);

create table if not exists shelters(
id serial,
shelter_id text primary key,
name text,
phone text,
email text,
address1 text,
address2 text,
city text,
state varchar(2),
zipcode integer,
latitude text,
longitude text
);

-- Following table is just for connect-pg-simple package
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;