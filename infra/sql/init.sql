-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);
-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

--Alunos criado
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Laís', 'Zanqueta', '2009-04-09', 'Rua das Magnólias, 182','laisazz@email.com', '(16) 98948-0018'),
('Conrad', 'Fisher', '2000-09-09', 'Avenida del Sol, 325', 'conradfisher@email.com', '(16) 98895-6767'),
('Jane', 'Hopper', '2010-11-23', 'Rua Travessa Santo Antônio, 222', 'hopperjane@email.com', '(16) 99147-1322'),
('Damon', 'Salvatore', '1970-02-12', 'Rua Evergreen Street, 99','damonsalv@email.com', '(16) 99618-6380'),
('Sarah', 'Cameron', '2007-10-10', 'Avenida Antônio Joaquim de Carvalho, 135', 'sarahcaa@email.com', '(16) 99618-638'),
('Caroline', 'Forbs', '2003-05-29', 'Willow Creek Drive, 1230', 'forbescarol@email.com', '(16) 98807-9505'),
('Mike', 'Wheeler', '2009-11-11', 'Riverstone Drive, 8787', 'wheeler@email.com', '(16) 99206-4797'),
('Emilly', 'Cooper', '1999-09-23', 'Rue du Jardin, 44', 'emillycopp@email.com','(16) 99117-3555'),
('Willian', 'Newman', '1998-06-07', 'Ocean Breeze Road, 11', 'newmanww@email.com', '(16) 98605-7529'),
('James', 'Beaufort', '2006-06-06', 'Pine Valley Road,02', 'jamesfort@email.com', '(16) 99273-0050');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

-- Livros criados
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('Como Eu Era Antes de Você', 'Jojo Moyes', 'Intrínseca', '2012', '978-8580573293', 10, 10, 80.00, 'Disponível'),
('Um Dia', 'David Nicholls', 'Intrínseca', '2009', '978-8580570056', 7, 7, 75.00, 'Disponível'),
('P.S. Eu Te Amo', 'Cecelia Ahern', 'Novo Conceito', '2004', '978-8579302408', 9, 9, 85.00, 'Disponível'),
('Querido John', 'Nicholas Sparks', 'Novo Conceito', '2006', '978-8579302675', 8, 8, 90.00, 'Disponível'),
('A Cinco Passos de Você', 'Rachael Lippincott', 'Globo Alt', '2019', '978-8525067421', 6, 6, 95.00, 'Disponível'),
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'Penguin Classics', '1847', '978-0141439556', 5, 5, 100.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Martin Claret', '1813', '978-8572328764', 10, 10, 85.00, 'Disponível'),
('Eleanor & Park', 'Rainbow Rowell', 'Novo Século', '2012', '978-8576798082', 7, 7, 70.00, 'Disponível'),
('O Verão Que Mudou Minha Vida', 'Jenny Han', 'Intrínseca', '2009', '978-8580571640', 9, 9, 80.00, 'Disponível'),
('Anna e o Beijo Francês', 'Stephanie Perkins', 'Novo Conceito', '2011', '978-8581630148', 8, 8, 75.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

-- Emprestimos Criados 
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
VALUES
(1, 2, '2025-01-01', '2025-02-02', 'Em andamento'),
(2, 3, '2025-02-02', '2025-03-03', 'Em andamento'),
(3, 4, '2025-03-03', '2025-04-04', 'Em andamento'),
(4, 5, '2025-04-04', '2025-05-05', 'Em andamento'),
(5, 6, '2025-05-05', '2025-06-06', 'Em andamento'),
(6, 7, '2025-06-06', '2025-07-07', 'Em andamento'),
(7, 8, '2025-07-07', '2025-08-08', 'Em andamento'),
(8, 9, '2025-08-08', '2025-09-09', 'Em andamento'),
(9, 10, '2025-09-09', '2025-10-10', 'Em andamento'),
(10, 1, '2025-09-10', '2025-11-11', 'Em andamento');