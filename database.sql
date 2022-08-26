create database gamestore;

create sequence seq_genre start 1;
create sequence seq_platform start 1;
create sequence seq_company start 1;
create sequence seq_qualification start 1;
create sequence seq_games start 1;

create table genre(
    id bigint NOT NULL PRIMARY KEY DEFAULT nextval('seq_genre'),
    title text
);

create table company(
    id bigint NOT NULL PRIMARY KEY DEFAULT nextval('seq_company'),
    name text
);

create table platform(
    id bigint NOT NULL PRIMARY KEY DEFAULT nextval('seq_platform'),
    title text,
    company bigint
);

create table qualification(
    id bigint NOT NULL PRIMARY KEY DEFAULT nextval('seq_qualification'),
    code text,
    description text
);

create table games(
    id bigint NOT NULL PRIMARY KEY DEFAULT nextval('seq_games'),
    title text,
    company text,
    qualification bigint[],
    genre bigint[],
    multiplayer boolean,
    platform bigint[],
    release_date date,
    poster text,
    trailer text
);

insert into genre values
    (1, 'Horror'),
    (2, 'Action'),
    (3, 'Adventure'),
    (4, 'Shooter'),
    (5, 'Puzzle');

insert into company values
    (1, 'Sony - PlayStation'),
    (2, 'Microsoft'),
    (3, 'Nintendo'),
    (4, 'Naughty Dog'),
    (5, 'Rocksteady Studios');

insert into platform values
    (1, 'PS4', 1),
    (2, 'PS5', 1),
    (3, 'XBOX ONE', 2),
    (4, 'XBOX 360', 2),
    (5, 'XBOX Series S', 2),
    (6, 'XBOX Series X', 2),
    (7, 'Nintento wii', 3),
    (8, 'Nintento SWITCH', 3);

insert into qualification values
    (1, '3+', 'Video game or software content suitable for ages 3 and above only.'),
    (2, '7+', 'Video game or software content suitable for ages 7 and above only.'),
    (3, '12+', 'Video game or software content suitable for ages 12 and above only.'),
    (4, '16+', 'Video game or software content suitable for ages 16 and above only.'),
    (5, '18+', 'Video game or software content suitable for ages 18 and above only.');

insert into games values
    (
        1, 
        'Uncharted 4',
        array[4],
        array[3],
        array[2,3],
        false,
        array[1,2],
        '2016-05-10',
        '',
        ''
    );