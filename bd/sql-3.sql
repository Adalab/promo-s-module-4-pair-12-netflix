USE netflix;

SELECT * FROM users;
SELECT * FROM movies;
SELECT * FROM actors;
SELECT * FROM rel_movies_users;
SELECT * FROM rel_movies_actors;

CREATE TABLE rel_movies_users (
idrelMoviesUsers int auto_increment primary key,
fkUser int,
fkMovies int,
FOREIGN KEY (fkUser) REFERENCES users (idUser),
FOREIGN KEY (fkMovies) REFERENCES movies (idMovies)
);

INSERT INTO rel_movies_users (fkUser, fkMovies)
VALUES (1, 1), (1, 2), (2, 2);

CREATE TABLE rel_movies_actors (
idRelMoviesActors int auto_increment primary key,
fkActors int,
fkMovies int,
FOREIGN KEY (fkActors) REFERENCES actors (idActor),
FOREIGN KEY (fkMovies) REFERENCES movies (idMovies)
);

INSERT INTO rel_movies_actors (fkActors, fkMovies)
VALUES (4, 3), (5, 2), (6, 1);
