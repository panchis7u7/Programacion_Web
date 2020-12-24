#Carlos Sebastian Madrigal Rodriguez	18121699

CREATE DATABASE IF NOT EXISTS Login;
USE Login;

#AES_ENCRYPT() Regresa un valor binario de retorno, por eso contraseña es de tipo VARBINARY.
CREATE TABLE IF NOT EXISTS usuarios (
	id_usuario INT NOT NULL PRIMARY KEY,
	usuario VARCHAR(20) NOT NULL,
    contraseña VARBINARY(255) NOT NULL 
);

#Se encripan las contraseñas usando AES.
INSERT INTO usuarios VALUES (1, 'Sebastian', AES_ENCRYPT('1234', 'Secreto'));
INSERT INTO usuarios VALUES (2, 'Buki', AES_ENCRYPT('tu_carcel', 'Secreto'));
INSERT INTO usuarios VALUES (3, 'NoToi', AES_ENCRYPT('password', 'Secreto'));

#Mostrar todos los usuarios y su respectiva contraseña cifrada con AES_DECRYPT().
SELECT id_usuario, usuario, CAST(AES_DECRYPT(contraseña, 'Secreto') AS CHAR(255)) AS contraseña FROM usuarios WHERE id_usuario = 1;
SELECT id_usuario, usuario, CAST(AES_DECRYPT(contraseña, 'Secreto') AS CHAR(255)) AS contraseña FROM usuarios WHERE id_usuario = 2;
SELECT id_usuario, usuario, CAST(AES_DECRYPT(contraseña, 'Secreto') AS CHAR(255)) AS contraseña FROM usuarios WHERE id_usuario = 3;

SELECT id_usuario, usuario, CAST(AES_DECRYPT(contraseña, 'Secreto') AS CHAR(255)) AS contraseña FROM usuarios WHERE usuario = 'Sebastian' AND  AES_DECRYPT(contraseña, 'Secreto') = '1234';