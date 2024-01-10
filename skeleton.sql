CREATE TABLE IF NOT EXISTS user (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    craeteAt DATETIME NULL DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS board(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1024) NOT NULL,
    cnt INT NULL DEFAULT 0,
    createAt DATETIME NULL DEFAULT now(),
    PRIMARY KEY (id)
);

INSERT INTO board (name, title, content) VALUES ('홍길동', '첫번째 게시물', '첫번째 내용입니다...');
INSERT INTO board (name, title, content) VALUES ('김길동', '두번째 게시물', '두번째 내용입니다...');
INSERT INTO board (name, title, content) VALUES ('박길동', '세번째 게시물', '세번째 내용입니다...');
