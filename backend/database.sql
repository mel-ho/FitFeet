-- create database
CREATE DATABASE fitfeet;

-- change directory into fitfeet database
\c fitfeet

-- user table
CREATE TABLE users(
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_retailer BOOLEAN NOT NULL DEFAULT FALSE,
    retailer_id UUID,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);

-- seeding some user data
INSERT INTO users (user_id, email, password, is_retailer, retailer_id, is_admin, is_active)
VALUES
('aca95e36-25d7-4d99-a794-3a1888a2ad34','invalid@test.com', '$2b$12$7mQw.ZtKW.kHtVFuaNWujuPKpMuJHrfJV8ecyF9eayFgoSbu3oYO.', TRUE, NULL, FALSE, FALSE),
('3801f23d-5dea-477e-803e-5d8e61ba38ba','admin@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, TRUE, TRUE),
('3801f23d-5dea-477e-803e-5d8e61ba38bb','retailer@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', TRUE, 'fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2', FALSE, TRUE),
('3801f23d-5dea-477e-803e-5d8e61ba38bc','user@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('2801f23d-5dea-477e-803e-5d8e61ba38bb', 'user1@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('4801f23d-5dea-477e-803e-5d8e61ba38bb', 'user2@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('5801f23d-5dea-477e-803e-5d8e61ba38bb', 'user3@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('6801f23d-5dea-477e-803e-5d8e61ba38bb', 'user4@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('7801f23d-5dea-477e-803e-5d8e61ba38bb', 'user5@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('8801f23d-5dea-477e-803e-5d8e61ba38bb', 'user6@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('9801f23d-5dea-477e-803e-5d8e61ba38bb', 'user7@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3701f23d-5dea-477e-803e-5d8e61ba38bb', 'user8@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3601f23d-5dea-477e-803e-5d8e61ba38bb', 'user9@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3501f23d-5dea-477e-803e-5d8e61ba38bb', 'user10@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3401f23d-5dea-477e-803e-5d8e61ba38bb', 'user11@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3301f23d-5dea-477e-803e-5d8e61ba38bb', 'user12@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3201f23d-5dea-477e-803e-5d8e61ba38bb', 'user13@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE),
('3101f23d-5dea-477e-803e-5d8e61ba38bb', 'user14@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE);

-- each user can only have 1 registered address
CREATE TABLE user_address( 
    user_id UUID,
    shipping_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO user_address (user_id, shipping_address) VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38bc', 'This is the address of user@test.com');

-- each user can only have 1 stored feet size detail
CREATE TABLE user_feet(
    user_id UUID,
    foot_length_l NUMERIC(4,2),
    foot_length_r NUMERIC(4,2),
    foot_width_l NUMERIC(4,2),
    foot_width_r NUMERIC(4,2),
    toe_length_l NUMERIC(4,2),
    toe_length_r NUMERIC(4,2),
    small_perim_l NUMERIC(4,2),
    small_perim_r NUMERIC(4,2),
    big_perim_l NUMERIC(4,2),
    big_perim_r NUMERIC(4,2),
    heel_perim_l NUMERIC(4,2),
    heel_perim_r NUMERIC(4,2),
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO user_feet(user_id, foot_length_l, foot_length_r, foot_width_l, foot_width_r, toe_length_l, toe_length_r, small_perim_l, small_perim_r, big_perim_l, big_perim_r, heel_perim_l, heel_perim_r)
VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38bc', 25, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('2801f23d-5dea-477e-803e-5d8e61ba38bb', 23.7, 23.7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('4801f23d-5dea-477e-803e-5d8e61ba38bb', 24.1, 24.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('5801f23d-5dea-477e-803e-5d8e61ba38bb', 24.5, 24.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('6801f23d-5dea-477e-803e-5d8e61ba38bb', 25, 25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('7801f23d-5dea-477e-803e-5d8e61ba38bb', 25.4, 25.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('8801f23d-5dea-477e-803e-5d8e61ba38bb', 25.8, 25.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('9801f23d-5dea-477e-803e-5d8e61ba38bb', 26.2, 26.2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3701f23d-5dea-477e-803e-5d8e61ba38bb', 27.1, 27.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3601f23d-5dea-477e-803e-5d8e61ba38bb', 22, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3501f23d-5dea-477e-803e-5d8e61ba38bb', 22.9, 22.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3401f23d-5dea-477e-803e-5d8e61ba38bb', 23.7, 23.7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3301f23d-5dea-477e-803e-5d8e61ba38bb', 24.5, 24.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3201f23d-5dea-477e-803e-5d8e61ba38bb', 25.4, 25.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
('3101f23d-5dea-477e-803e-5d8e61ba38bb', 26.2, 26.2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

-- each user can only have 1 stored climbing experience
CREATE TABLE user_climbingexp(
    user_id UUID,
    sport_climbing BOOLEAN NOT NULL,
    bouldering BOOLEAN NOT NULL,
    trad_climbing BOOLEAN NOT NULL,
    years_exp INT NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO user_climbingexp(user_id, sport_climbing, bouldering, trad_climbing, years_exp) VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38bc', TRUE, TRUE, FALSE, 10);

CREATE TABLE retailers(
    retailer_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_detail VARCHAR(255) NOT NULL,
    contact_address VARCHAR(255) NOT NULL
);

-- seeding some retailer data
INSERT INTO retailers (retailer_id, name, contact_detail, contact_address)
VALUES ('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2', 'FiveTen', '91234567', '5 Tenth Avenue');

-- create a constraint table for brands
CREATE TABLE brands(
    brand VARCHAR(255) PRIMARY KEY NOT NULL
);

-- seeding some data for brands
INSERT INTO brands (brand) VALUES ('FiveTen'), ('La Sportiva'), ('Evolv'), ('Black Diamond');


-- create a constraint table for models
CREATE TABLE models(
    model VARCHAR(255) PRIMARY KEY NOT NULL,
    img_link VARCHAR(255)
);

-- seeding some data from models
INSERT INTO models (model, img_link) VALUES ('Miura', 'https://lcdn.lasportivausa.com/pub/media/catalog/product/2/0/20j_706706_miura_lime_1_4.jpg'),
('Tarantula','https://lcdn.lasportivausa.com/pub/media/catalog/product/3/0/30j_999311_tarantula_black_poppy_1_1.jpg'),
('Solution','https://lcdn.lasportivausa.com/pub/media/catalog/product/2/0/20g_000100_solution_whiteyellow_1_5.jpg'),
('Method','https://cdn11.bigcommerce.com/s-hgn1l9sh63/images/stencil/1000w/attribute_rule_images/16894_source_1662270110.png'),
('Futura','https://lcdn.lasportivausa.com/pub/media/catalog/product/2/0/20r_600100_futura_blueyellow_1_4.jpg'),
('Momentum','https://cdn11.bigcommerce.com/s-hgn1l9sh63/images/stencil/1000w/attribute_rule_images/11260_source_1687931318.png');


-- create a constraint table for size_countries
CREATE TABLE size_countries(
    size_country VARCHAR(255) PRIMARY KEY NOT NULL
);

INSERT INTO size_countries (size_country) VALUES ('US'), ('EUR'), ('UK');

-- create a table for size
CREATE TABLE sizes(
    size_id SERIAL PRIMARY KEY,
    size_country VARCHAR(255) NOT NULL,
    size_number NUMERIC(4,2)NOT NULL,
    CONSTRAINT fk_size_country FOREIGN KEY (size_country) REFERENCES size_countries(size_country),
    CONSTRAINT uc_size_country_number UNIQUE (size_country, size_number)
);

-- seeding data for sizes
INSERT INTO sizes (size_country, size_number) VALUES ('US', 5), ('US', 5.5), ('US', 6), ('US', 6.5), ('US', 7), ('US', 7.5), ('US', 8),('US', 8.5),  ('US', 9), ('US', 10), ('EUR', 37), ('EUR', 38), ('EUR', 39), ('EUR', 40);

CREATE TABLE shoes(
    shoe_id SERIAL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    size_id INT NOT NULL,
    CONSTRAINT fk_brand FOREIGN KEY (brand) REFERENCES brands(brand),
    CONSTRAINT fk_model FOREIGN KEY (model) REFERENCES models(model),
    CONSTRAINT fk_size_id FOREIGN KEY (size_id) REFERENCES sizes(size_id),
    CONSTRAINT unique_brand_model_size UNIQUE (brand, model, size_id)
);

INSERT INTO shoes(brand, model, size_id) VALUES 
('La Sportiva', 'Miura', 2), ('La Sportiva', 'Tarantula', 2), ('La Sportiva', 'Solution', 2), ('La Sportiva', 'Futura', 2), ('Black Diamond', 'Method', 2), ('Black Diamond', 'Momentum', 2),
('La Sportiva', 'Miura', 3), ('La Sportiva', 'Tarantula', 3), ('La Sportiva', 'Solution', 3), ('La Sportiva', 'Futura', 3), ('Black Diamond', 'Method', 3), ('Black Diamond', 'Momentum', 3),
('La Sportiva', 'Miura', 4), ('La Sportiva', 'Tarantula', 4), ('La Sportiva', 'Solution', 4), ('La Sportiva', 'Futura', 4), ('Black Diamond', 'Method', 4), ('Black Diamond', 'Momentum', 4),
('La Sportiva', 'Miura', 5), ('La Sportiva', 'Tarantula', 5), ('La Sportiva', 'Solution', 5), ('La Sportiva', 'Futura', 5), ('Black Diamond', 'Method', 5), ('Black Diamond', 'Momentum', 5),
('La Sportiva', 'Miura', 6), ('La Sportiva', 'Tarantula', 6), ('La Sportiva', 'Solution', 6), ('La Sportiva', 'Futura', 6), ('Black Diamond', 'Method', 6), ('Black Diamond', 'Momentum', 6),
('La Sportiva', 'Miura', 7), ('La Sportiva', 'Tarantula', 7), ('La Sportiva', 'Solution', 7), ('La Sportiva', 'Futura', 7), ('Black Diamond', 'Method', 7), ('Black Diamond', 'Momentum', 7);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    retailer_id UUID NOT NULL,
    shoe_id INT NOT NULL,
    date_purchased DATE NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers(retailer_id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(shoe_id)
);

INSERT INTO products (retailer_id, shoe_id, date_purchased, quantity) VALUES
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',7,'01-01-2001',10),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',13,'01-01-2001',12),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',19,'01-01-2001',12),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',26,'01-01-2001',0),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',33,'01-01-2001',10),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',11,'01-01-2001',12),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',24,'01-01-2001',12),
('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2',36,'01-01-2001',0);

-- create a constraint table for order_status
CREATE TABLE order_status(
    order_status VARCHAR(255) PRIMARY KEY NOT NULL
);

-- setting the order_status
INSERT INTO order_status (order_status) VALUES ('rejected'), ('ordered'), ('packed'), ('shipped'), ('completed');

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    retailer_id UUID NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    order_date DATE NOT NULL,
    order_status VARCHAR(255) NOT NULL,
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers(retailer_id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT fk_order_status FOREIGN KEY (order_status) REFERENCES order_status(order_status)
);

-- users or non-users can both input shoes. shoes should be an existing one in the shoes database
CREATE TABLE user_shoes(
    user_shoe_id SERIAL PRIMARY KEY,
    shoe_id INT NOT NULL,
    date_purchased DATE,
    date_worn DATE,
    date_disposed DATE,
    star_rating INT NOT NULL,
    user_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(shoe_id)
);

INSERT INTO user_shoes(shoe_id, date_purchased, date_worn, date_disposed, star_rating, user_id) VALUES
(7,NULL,NULL,NULL,4,'2801f23d-5dea-477e-803e-5d8e61ba38bb'),
(13,NULL,NULL,NULL,4,'4801f23d-5dea-477e-803e-5d8e61ba38bb'),
(19,NULL,NULL,NULL,5,'5801f23d-5dea-477e-803e-5d8e61ba38bb'),
(26,NULL,NULL,NULL,4,'6801f23d-5dea-477e-803e-5d8e61ba38bb'),
(33,NULL,NULL,NULL,5,'7801f23d-5dea-477e-803e-5d8e61ba38bb'),
(11,NULL,NULL,NULL,4,'3501f23d-5dea-477e-803e-5d8e61ba38bb'),
(24,NULL,NULL,NULL,4,'3401f23d-5dea-477e-803e-5d8e61ba38bb'),
(36,NULL,NULL,NULL,4,'3301f23d-5dea-477e-803e-5d8e61ba38bb');

