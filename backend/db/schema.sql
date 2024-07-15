CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    profile_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    typing_speed FLOAT,
    accuracy FLOAT,
    progress JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE typing_lessons (
    lesson_id UUID PRIMARY KEY,
    topic VARCHAR(100),
    difficulty VARCHAR(50),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE typing_data (
    data_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    lesson_id UUID REFERENCES typing_lessons(lesson_id),
    speed FLOAT,
    accuracy FLOAT,
    errors JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE generated_texts (
    text_id UUID PRIMARY KEY,
    topic VARCHAR(100),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
