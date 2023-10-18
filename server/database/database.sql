create TABLE "user"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    "password" VARCHAR(255),
    isLoggedIn BOOLEAN DEFAULT FALSE
);

create TABLE "deal"(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price INT,
    tiketPrice INT,
    yieldPercent NUMERIC(5, 2),
    soldPercent INT,
    daysLeft INT,
    imgUrl VARCHAR(255)
);