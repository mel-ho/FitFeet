CREATE DATABASE fitfeet;

-- user table
CREATE TABLE users(
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_retailer BOOLEAN NOT NULL DEFAULT FALSE,
    retailer_id UUID,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);

-- seeding some user data
INSERT INTO users (id, email, password, is_retailer, retailer_id, is_admin, is_active)
VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38ba','user@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE);
INSERT INTO users (id,email, password, is_retailer, retailer_id, is_admin, is_active)
VALUES ('aca95e36-25d7-4d99-a794-3a1888a2ad34','fiveten@test.com', '$2b$12$7mQw.ZtKW.kHtVFuaNWujuPKpMuJHrfJV8ecyF9eayFgoSbu3oYO.', TRUE, 'fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2', FALSE, TRUE);

-- each user can only have 1 registered address
CREATE TABLE user_address( 
    user_id UUID,
    shipping_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- each user can only have 1 stored feet size detail
CREATE TABLE user_feet(
    user_id UUID,
    foot_length_L INT,
    foot_length_R INT,
    foot_width_L INT,
    foot_width_R INT,
    toe_length_L INT,
    toe_length_R INT,
    small_perim_L INT,
    small_perim_R INT,
    big_perim_L INT,
    big_perim_R INT,
    heel_perim_L INT,
    heel_perim_R INT,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- each user can only have 1 stored climbing experience
CREATE TABLE users_climbingexp(
    user_id UUID,
    sport_climbing BOOLEAN NOT NULL,
    bouldering BOOLEAN NOT NULL,
    trad_climbing BOOLEAN NOT NULL,
    years_exp INT NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE retailers(
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_detail VARCHAR(255) NOT NULL,
    contact_address VARCHAR(255) NOT NULL
);

-- seeding some retailer data
INSERT INTO retailers (id, name, contact_detail, contact_address)
VALUES ('fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2', 'FiveTen', '91234567', '5 Tenth Avenue');

-- create a constraint table for brands
CREATE TABLE brands(
    id SERIAL PRIMARY KEY,
    brandname VARCHAR(255) NOT NULL
);

-- seeding some data for brands
INSERT INTO brands (brandname) VALUES ('FiveTen');
INSERT INTO brands (brandname) VALUES ('La Sportiva');
INSERT INTO brands (brandname) VALUES ('Evolv');

-- create a constraint table for models
CREATE TABLE models(
    id SERIAL PRIMARY KEY,
    brand_id INT,
    model VARCHAR(255),
    CONSTRAINT fk_brands FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- seeding some data from models
INSERT INTO models (brand_id, model) VALUES ('1', 'FiveTen Model 1');
INSERT INTO models (brand_id, model) VALUES ('1', 'FiveTen Model 2');
INSERT INTO models (brand_id, model) VALUES ('2', 'La Sportiva Model 1');
INSERT INTO models (brand_id, model) VALUES ('3', 'Evolv Model 1');

-- create a constraint table for size
CREATE TABLE sizes(
    id SERIAL PRIMARY KEY,
    size_us INT NOT NULL
);

-- seeding data for sizes
INSERT INTO sizes (size_us) VALUES (5);
INSERT INTO sizes (size_us) VALUES (6);
INSERT INTO sizes (size_us) VALUES (7);


CREATE TABLE shoes(
    id SERIAL PRIMARY KEY,
    model_id INT NOT NULL,
    size_id INT NOT NULL,
    CONSTRAINT fk_model_id FOREIGN KEY (model_id) REFERENCES models(id),
    CONSTRAINT fk_size_id FOREIGN KEY (size_id) REFERENCES sizes(id)
);


CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    retailer_id UUID NOT NULL,
    shoe_id INT NOT NULL,
    date_purchased DATE NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers(id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(id)
);

-- create a constraint table for order_status
CREATE TABLE order_status(
    order_status VARCHAR(255) PRIMARY KEY NOT NULL
);

-- setting the order_status
INSERT INTO order_status (order_status) VALUES ('REJECTED'), ('ORDERED'), ('PACKED'), ('SHIPPED'), ('COMPLETED');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    retailer_id UUID NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    order_date DATE NOT NULL,
    order_status VARCHAR(255) NOT NULL,
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers(id),
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT fk_order_status FOREIGN KEY (order_status) REFERENCES order_status(order_status)
);

-- users or non-users can both input shoes. shoes should be an existing one in the shoes database
CREATE TABLE user_shoes(
    user_shoe_id SERIAL PRIMARY KEY,
    shoe_id INT NOT NULL,
    date_purchased DATE NOT NULL,
    date_worn DATE NOT NULL,
    date_disposed DATE NOT NULL,
    star_rating INT NOT NULL,
    user_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(id)
);
