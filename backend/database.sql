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
VALUES ('aca95e36-25d7-4d99-a794-3a1888a2ad34','fiveten@test.com', '$2b$12$7mQw.ZtKW.kHtVFuaNWujuPKpMuJHrfJV8ecyF9eayFgoSbu3oYO.', FALSE, NULL, FALSE, TRUE);

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

-- -- seeding some retailer data
-- INSERT INTO retailers (name, contact_detail, contact_address)
-- VALUES ('FiveTen', '91234567', '5 Tenth Avenue');
-- INSERT INTO retailers (name, contact_detail, contact_address)
-- VALUES ('FiveTenSG', '92345678', '5 Tenth Avenue Singapore');

CREATE TABLE brands(
    id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    retailer_id UUID NOT NULL,
    CONSTRAINT fk_retailer_id FOREIGN KEY (retailer_id) REFERENCES retailers(id)
);


-- -- seeding some brand data
-- INSERT INTO brands (brand_name, retailer_id)
-- VALUES ('FiveTen', '1');
-- INSERT INTO brands (brand_name, retailer_id)
-- VALUES ('FiveTen', '2');


CREATE TABLE shoes(
    id SERIAL PRIMARY KEY,
    brand_id INT NOT NULL,
    model VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    CONSTRAINT fk_brand_id FOREIGN KEY (brand_id) REFERENCES brands(id)
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
INSERT INTO order_status (order_status) VALUES ('ORDERED'), ('PACKED'), ('SHIPPED'), ('COMPLETED');

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
    shoe_id INT NOT NULL,
    date_purchased DATE NOT NULL,
    date_worn DATE NOT NULL,
    date_disposed DATE NOT NULL,
    star_rating INT NOT NULL,
    user_id UUID,
    PRIMARY KEY (user_id, shoe_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_shoe_id FOREIGN KEY (shoe_id) REFERENCES shoes(id)
);
