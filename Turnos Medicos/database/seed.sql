-- AgendaMedica - datos de ejemplo (todos ficticios)
-- Uso: primero database/schema.sql y despues este archivo:
--   mysql -u root am < database/seed.sql
-- Usuario de prueba: demo / demo1234

SET NAMES utf8mb4;
USE `am`;

-- ---------------------------------------------------------------
-- Catalogos
-- ---------------------------------------------------------------
INSERT INTO `estados` (`id_estados`, `estado`) VALUES
(1, 'Pendiente'),
(2, 'En Atencion'),
(3, 'Finalizado');

INSERT INTO `calidad_diagnostico` (`id_calidad`, `calidad`) VALUES
(1, 'Preliminar'),
(2, 'Confirmado');

INSERT INTO `alergias_nomencladas` (`id_nomenclada`, `nombre`, `importancia`) VALUES
(1, 'Alergia a Mani', 'alta'),
(2, 'Alergia a Penicilina', 'alta'),
(3, 'Alergia a Polvo', 'normal'),
(4, 'Alergia a Gatos', 'leve'),
(5, 'Alergia a Aspirina', 'alta');

-- ---------------------------------------------------------------
-- Personas (2 medicos y 3 pacientes ficticios)
-- ---------------------------------------------------------------
INSERT INTO `personas` (`dni_persona`, `nombre`, `apellido`, `email`, `direccion`, `telefono`, `fecha_nac`, `genero`) VALUES
('10000001', 'Laura',  'Mendez', 'laura@demo.test',  'Calle Falsa 123',  '2660000001', '1980-04-12', 'Femenino'),
('10000002', 'Carlos', 'Ibarra', 'carlos@demo.test', 'Av. Ejemplo 456',  '2660000002', '1975-09-30', 'Masculino'),
('20000001', 'Ana',    'Torres', 'ana@demo.test',    'Calle Demo 789',   '2660000003', '1990-01-25', 'Femenino'),
('20000002', 'Luis',   'Gomez',  'luis@demo.test',   'Barrio Centro 10', '2660000004', '1985-06-18', 'Masculino'),
('20000003', 'Marta',  'Rios',   'marta@demo.test',  'Pasaje Test 22',   '2660000005', '2001-11-05', 'Femenino');

INSERT INTO `medicos` (`dni_medico`, `activo`, `id_medico`) VALUES
('10000001', 1, 1),
('10000002', 1, 2);

INSERT INTO `pacientes` (`dni_paciente`, `activo`, `id_paciente`) VALUES
('20000001', 1, 1),
('20000002', 1, 2),
('20000003', 1, 3);

-- ---------------------------------------------------------------
-- Agendas medicas y usuario de prueba (demo / demo1234)
-- ---------------------------------------------------------------
INSERT INTO `agendamedicos` (`id_agendamedico`, `especialidad`, `matricula`, `id_medico`) VALUES
(1, 'Clinica Medica', 'MP-0001', 1),
(2, 'Pediatria',      'MP-0002', 2);

INSERT INTO `usuarios` (`id_usuario`, `password`, `usuario`, `activo`, `id_agendamedico`) VALUES
(1, '$2b$10$CAHj1IftRKwxYa5IqhkMDOB1XvTfj9m.pgKj2riav8d6vKZz0M/Rq', 'demo', 1, 1);

-- ---------------------------------------------------------------
-- Turnos (fechas relativas a hoy: pasados, de hoy y futuros)
-- ---------------------------------------------------------------
INSERT INTO `turnos` (`id_turno`, `id_agendamedico`, `id_paciente`, `fecha_turno`, `horario`, `motivo_consulta`, `id_estados`) VALUES
(1, 1, 1, DATE_SUB(CURDATE(), INTERVAL 14 DAY), '09:00:00', 'Control general', 3),
(2, 1, 2, DATE_SUB(CURDATE(), INTERVAL 7 DAY),  '10:30:00', 'Dolor de garganta', 3),
(3, 1, 3, CURDATE(),                            '11:00:00', 'Consulta por alergias', 2),
(4, 1, 1, CURDATE(),                            '12:00:00', 'Seguimiento de presion arterial', 1),
(5, 1, 2, DATE_ADD(CURDATE(), INTERVAL 3 DAY),  '09:30:00', 'Control posterior a tratamiento', 1),
(6, 2, 3, DATE_ADD(CURDATE(), INTERVAL 5 DAY),  '16:00:00', 'Control pediatrico', 1);

-- ---------------------------------------------------------------
-- Atenciones (2 finalizadas y 1 en curso)
-- ---------------------------------------------------------------
INSERT INTO `atenciones` (`id_entrada`, `id_turno`, `activo`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 1, 0, DATE_SUB(NOW(), INTERVAL 14 DAY), DATE_SUB(NOW(), INTERVAL 14 DAY)),
(2, 2, 0, DATE_SUB(NOW(), INTERVAL 7 DAY),  DATE_SUB(NOW(), INTERVAL 7 DAY)),
(3, 3, 1, NOW(), NULL);

-- ---------------------------------------------------------------
-- Historia clinica de ejemplo
-- ---------------------------------------------------------------
INSERT INTO `diagnosticos` (`id_entrada`, `id_diagnostico`, `descripcion`, `id_calidad`) VALUES
(1, 1, 'Hipertension arterial leve', 2),
(2, 2, 'Faringitis aguda', 1);

INSERT INTO `alergias` (`id_alergia`, `id_entrada`, `fecha_desde`, `fecha_hasta`, `id_nomenclada`) VALUES
(1, 1, '2020-03-01', NULL, 2),
(2, 3, '2018-05-10', NULL, 3);

INSERT INTO `antecedentes` (`id_antecedentes`, `id_entrada`, `descripcion`, `fecha_desde`, `fecha_hasta`) VALUES
(1, 1, 'Antecedentes familiares de hipertension arterial', '2015-01-01', NULL);

INSERT INTO `habitos` (`id_habito`, `id_entrada`, `descripcion`, `fecha_desde`, `fecha_hasta`) VALUES
(1, 1, 'Caminata tres veces por semana', '2022-01-01', NULL);

INSERT INTO `medicamentos` (`id_medicamento`, `id_entrada`, `descripcion`) VALUES
(1, 1, 'Enalapril 10 mg cada 24 horas'),
(2, 2, 'Ibuprofeno 400 mg cada 8 horas durante 3 dias');

INSERT INTO `evoluciones` (`id_evoluciones`, `id_entrada`, `descripcion`) VALUES
(1, 1, 'Paciente estable. Se indica control en 30 dias.'),
(2, 2, 'Mejoria progresiva. Se indica reposo e hidratacion.');

INSERT INTO `plantilla` (`id_plantilla`, `id_agendamedico`, `titulo`, `contenido`) VALUES
(1, 1, 'Control general', 'Motivo de consulta:\nExamen fisico:\nIndicaciones:');
