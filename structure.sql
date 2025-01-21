CREATE TABLE api_keys (
    id INT PRIMARY KEY AUTO_INCREMENT,

   `key` VARCHAR(100) NOT NULL,
   `type` ENUM("admin", "client") DEFAULT "client",

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,

    password VARCHAR(100) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP    
);


CREATE TABLE user_emails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),

    user_id INT NOT NULL,

    is_primary BOOLEAN,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id)
);


    CREATE TABLE user_phone_numbers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        
        phone_number VARCHAR(50) NOT NULL,

        user_id INT NOT NULL,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (user_id) REFERENCES users (id)
    );

CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    fname VARCHAR(100) NOT NULL,
    mname VARCHAR(100),
    lname VARCHAR(100) NOT NULL,

    user_id INT NOT NULL,

    date_of_birth DATE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the address
    street_address VARCHAR(255) NOT NULL, -- Street and house number
    neighborhood VARCHAR(100), -- Neighborhood or barangay
    city VARCHAR(100) NOT NULL, -- City or municipality
    `state` VARCHAR(100) NOT NULL, -- State, province, or region
    postal_code VARCHAR(20) NOT NULL, -- ZIP or postal code
    country VARCHAR(100) NOT NULL, -- Country name

    user_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation time
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record update time

    FOREIGN KEY (user_id) REFERENCES users (id)
);

