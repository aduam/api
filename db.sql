create database test;

create table people(
  id serial primary key not null,
  names varchar(100) not null,
  surnames varchar(100) not null,
  email varchar(100) not null,
  phone varchar(25) not null,
  address varchar(250) not null,
  image varchar(256),
  active boolean not null
);

create table users(
  id int primary key not null,
  email varchar(100) not null,
  password varchar(256) not null,
  foreign key (id) references people(id)
);

create table posts(
  id serial primary key not null,
  id_user int not null,
  comment text,
  image varchar(256),
  foreign key (id_user) references users(id)
);

create table likes(
  id_post int not null,
  id_owner_post int not null,
  id_liked_post int not null,
  liked boolean not null,
  primary key (id_post, id_owner_post, id_liked_post),
  foreign key (id_post) references posts(id),
  foreign key (id_owner_post) references users(id),
  foreign key (id_liked_post) references users(id)
);