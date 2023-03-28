USE netflix;
SELECT * FROM actors;
SELECT * FROM movies;
SELECT title , gender FROM movies WHERE year > 1990;

SELECT title FROM movies WHERE category = 'Top 10';

UPDATE movies SET year = '1997' WHERE idMovies = 2;

SELECT * FROM actors;
SELECT name, lastname FROM actors WHERE birthday BETWEEN '1950-01-01' and '1960-12-31';
SELECT name, lastname FROM actors WHERE country = 'Estados Unidos';

SELECT * FROM users;
SELECT name FROM users WHERE plan_details = 'Standard';
SET SQL_SAFE_UPDATES = 0;
DELETE FROM users WHERE name LIKE 'm%';

ALTER TABLE actors ADD image VARCHAR (1024);
SELECT * FROM actors;

-- Eliminar con delete from *

