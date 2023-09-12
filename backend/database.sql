CREATE DATABASE fitfeet;

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
VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38ba','admin@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, TRUE, TRUE);
INSERT INTO users (user_id, email, password, is_retailer, retailer_id, is_admin, is_active)
VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38bb','retailer@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', TRUE, 'fe5f4809-9c2a-47a2-8faf-fe34f43cb2e2', FALSE, TRUE);
INSERT INTO users (user_id, email, password, is_retailer, retailer_id, is_admin, is_active)
VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38bc','user@test.com', '$2b$12$oDvwjsCctlU7UfQO00ZPZOmGjr6TlM8K/ToqBTqjqXr6ibU0GBY9W', FALSE, NULL, FALSE, TRUE);
INSERT INTO users (user_id,email, password, is_retailer, retailer_id, is_admin, is_active)
VALUES ('aca95e36-25d7-4d99-a794-3a1888a2ad34','invalid@test.com', '$2b$12$7mQw.ZtKW.kHtVFuaNWujuPKpMuJHrfJV8ecyF9eayFgoSbu3oYO.', TRUE, NULL, FALSE, FALSE);

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
    foot_length_l INT,
    foot_length_r INT,
    foot_width_l INT,
    foot_width_r INT,
    toe_length_l INT,
    toe_length_r INT,
    small_perim_l INT,
    small_perim_r INT,
    big_perim_l INT,
    big_perim_r INT,
    heel_perim_l INT,
    heel_perim_r INT,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO user_feet(user_id, foot_length_l, foot_length_r, foot_width_l, foot_width_r, toe_length_l, toe_length_r, small_perim_l, small_perim_r, big_perim_l, big_perim_r, heel_perim_l, heel_perim_r)
VALUES ('3801f23d-5dea-477e-803e-5d8e61ba38bc', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

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
INSERT INTO brands (brand) VALUES ('FiveTen'), ('La Sportiva'), ('Evolv');


-- create a constraint table for models
CREATE TABLE models(
    model VARCHAR(255) PRIMARY KEY NOT NULL
);

-- seeding some data from models
INSERT INTO models (model) VALUES ('Model 1'), ('Model 2'),  ('Model 3'), ('Model 4');

-- create a constraint table for size_countries
CREATE TABLE size_countries(
    size_country VARCHAR(255) PRIMARY KEY NOT NULL
);

INSERT INTO size_countries (size_country) VALUES ('US'), ('EUR'), ('UK');

-- create a table for size
CREATE TABLE sizes(
    size_id SERIAL PRIMARY KEY,
    size_country VARCHAR(255) NOT NULL,
    size_number INT NOT NULL,
    CONSTRAINT fk_size_country FOREIGN KEY (size_country) REFERENCES size_countries(size_country),
    CONSTRAINT uc_size_country_number UNIQUE (size_country, size_number)
);

-- seeding data for sizes
INSERT INTO sizes (size_country, size_number) VALUES ('US', 4), ('US', 5), ('US', 6), ('US', 7), ('US', 8), ('US', 9), ('EUR', 37), ('EUR', 38), ('EUR', 39), ('EUR', 40);

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


CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    retailer_id UUID NOT NULL,
    shoe_id INT NOT NULL,
    date_purchased DATE NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers(retailer_id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(shoe_id)
);

-- create a constraint table for order_status
CREATE TABLE order_status(
    order_status VARCHAR(255) PRIMARY KEY NOT NULL
);

-- setting the order_status
INSERT INTO order_status (order_status) VALUES ('REJECTED'), ('ORDERED'), ('PACKED'), ('SHIPPED'), ('COMPLETED');

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
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
    date_purchased DATE NOT NULL,
    date_worn DATE NOT NULL,
    date_disposed DATE,
    star_rating INT NOT NULL,
    user_id UUID,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(shoe_id)
);
