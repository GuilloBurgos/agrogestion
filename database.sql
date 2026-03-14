CREATE DATABASE agrogestion DEFAULT CHARACTER SET = 'utf8mb4';

drop DATABASE agrogestion

USE agrogestion;

CREATE TABLE  usuarios (
  idUsuarios INT NOT NULL AUTO_INCREMENT,
  nombre_completo VARCHAR(45) NULL,
  usuario VARCHAR(45) NULL,
  password VARCHAR(45) NULL,
  rol ENUM('ADMIN', 'DUENIO') NULL,
  email VARCHAR(255) NULL,
  PRIMARY KEY (idUsuarios))
ENGINE = InnoDB;

CREATE TABLE administrador (
  idAdmin INT NOT NULL AUTO_INCREMENT,
  nombre_completo VARCHAR(45) NULL,
  tipo_documento VARCHAR(20),
  num_documento VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  telefono VARCHAR(100) NULL,
  usuario VARCHAR(255) NULL,
  password VARCHAR(200),
  rol ENUM('ADMIN'),
  PRIMARY KEY (`idAdmin`))
ENGINE = InnoDB;

DELIMITER $$

CREATE TRIGGER trg_insert_admin_to_usuarios
AFTER INSERT ON administrador
FOR EACH ROW
BEGIN
  INSERT INTO usuarios (nombre_completo, usuario, password, rol, email)
  VALUES (NEW.nombre_completo, NEW.usuario, NEW.password, 'ADMIN', NEW.email);
END$$

DELIMITER ;

SHOW TRIGGERS;
SELECT * FROM usuarios;

DROP TABLE tipos_trabajo

CREATE TABLE tipos_trabajo (
    id_tipo_trabajo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_trabajo VARCHAR(50) NOT NULL
)ENGINE = InnoDB;

INSERT INTO tipos_trabajo (nombre_trabajo) VALUES
('Ordeñador de ganado'),
('Recolector de maíz'),
('Recolector de yuca'),
('Limpieza de cultivos'),
('Fumigador'),
('Arreglo de cercas');

drop TABLE trabajadores;

CREATE TABLE trabajadores (
    id_trabajador INT PRIMARY KEY AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(30) UNIQUE NOT NULL,
    id_tipo_trabajo INT,
    telefono VARCHAR(20),
    telefono_familiar VARCHAR(20),
    direccion VARCHAR(150),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_ingreso DATE,
    observaciones TEXT,    
    FOREIGN KEY (id_tipo_trabajo) REFERENCES tipos_trabajo(id_tipo_trabajo)
)ENGINE = InnoDB;


INSERT INTO administrador 
(nombre_completo, tipo_documento, num_documento, email, telefono, usuario, password, rol) 
VALUES
('Carlos Pérez Gómez', 1, '1002345678', 'carlos.perez@example.com', '3001234567', 'cperez', 'admin123', 'ADMIN'),
('María Rodríguez López', 2, '2003456789', 'maria.rodriguez@example.com', '3109876543', 'mrodriguez', 'admin456', 'ADMIN'),
('Juan Martínez Díaz', 1, '3004567890', 'juan.martinez@example.com', '3207654321', 'jmartinez', 'admin789', 'ADMIN');

SELECT * FROM administrador

INSERT INTO administrador 
(nombre_completo, tipo_documento, num_documento, email, telefono, usuario, password, rol) 
VALUES
('Carlos doria', 1,'1005322211','carlosd@gmail.com','300564352','cdoria','admin321','ADMIN');

INSERT INTO usuarios (nombre_completo, usuario, password, rol,email) 
VALUES ('María Gómez', 'empleado456', 'empleadopass', 'DUENIO','duenio@gmail.com');




-- INSERT INTO trabajadores (
--     nombre_completo, tipo_documento, numero_documento, id_tipo_trabajo,
--     telefono, telefono_familiar, direccion, estado, fecha_ingreso, observaciones
-- ) VALUES
-- ('Juan Pérez', 'CC', '1020304050', 'Mantenimiento general', '3001234567', '3109876543', 'Vereda El Roble, Finca La Esperanza', 'activo', '2023-05-10', 'Experto en reparaciones eléctricas'),
-- ('María Gómez', 'CC', '1122334455', 'Alimentación animal', '3012345678', '3118765432', 'Vereda La Palma, Finca El Progreso', 'activo', '2022-11-20', 'Responsable de alimentación de ganado'),
-- ('Carlos Ruiz', 'TI', '9988776655', 'Limpieza de corrales', '3023456789', '3127654321', 'Vereda El Sauce, Finca La Victoria', 'inactivo', '2021-08-15', 'Actualmente no está en labores activas');

SELECT * FROM administrador

SHOW TABLES

SELECT * FROM trabajadores