CREATE DATABASE IF NOT EXISTS medicos;
USE medicos;

CREATE TABLE IF NOT EXISTS med_medicos(
    med_CRM SERIAL PRIMARY KEY,
    med_nome VARCHAR(50) NOT NULL,
    med_tel BIGINT UNSIGNED NOT NULL,
    med_estado VARCHAR(255) NOT NULL,
    med_cidade VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS esp_modalidade(
    esp_id SERIAL PRIMARY KEY,
    esp_nome_mod VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS med_esp_medicos_especialidades(
    med_esp_id_id SERIAL PRIMARY KEY,
    med_esp_CRM BIGINT UNSIGNED NOT NULL,
    med_esp_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (med_esp_CRM) REFERENCES med_medicos(med_CRM),
    FOREIGN KEY (med_esp_id) REFERENCES esp_modalidade(esp_id)
);


INSERT INTO med_medicos (med_CRM,med_nome,med_tel,med_estado,med_cidade)
VALUES (3342,'Romeo',9915931,'Boa Vista','Roraima'),
(372,'Joao',36784903,'Porto Velho','Rondonia');

INSERT INTO esp_modalidade(esp_nome_mod) VALUES
('ALERGOLOGIA'),
('ANGIOLOGIA'),
('BUCO MAXILO'),
('CARDIOLOGIA CLINICA'),
('CARDIOLOGIA INFANTIL'),
('CIRURGIA CABECA E PESCOCO'),
('CIRURGIA CARDIACA'),
('CIRURGIA DE TORAX'),
('CIRURGIA GERAL'),
('CIRURGIA PEDIATRICA'),
('CIRURGIA PLASTICA'),
('CIRURGIA TORACIC'),
('CIRURGIA VASCULAR'),
('CLÍNICA MEDICA');

INSERT INTO med_esp_medicos_especialidades(med_esp_CRM,med_esp_id) VALUES
(3342,2),
(3342,6),
(3342,3),
(372,4),
(372,3);

CREATE VIEW MedicoS as
SELECT med_CRM,med_nome,med_tel,med_estado,med_cidade,esp_nome_mod FROM med_medicos m
INNER JOIN med_esp_medicos_especialidades  me
on m.med_CRM = me.med_esp_CRM
INNER JOIN esp_modalidade e ON
me.med_esp_id = e.esp_id;

-- SELECT med_CRM, med_nome, med_est_cid, esp_nome_mod FROM med_medicos m
-- INNER JOIN med_esp_medicos_especialidades  me
-- on m.med_CRM = me.med_esp_CRM
-- INNER JOIN esp_modalidade e ON
-- me.med_esp_id = e.esp_id WHERE med_CRM = 352;