-- Insert sample data into users
INSERT INTO users (user_id, username, password_hash, email)
VALUES
('UUID_GENERATE()', 'john_doe', 'HASHED_PASSWORD', 'john@example.com'),
('UUID_GENERATE()', 'jane_doe', 'HASHED_PASSWORD', 'jane@example.com');

-- Insert sample data into typing_lessons
INSERT INTO typing_lessons (lesson_id, topic, difficulty, content)
VALUES
('UUID_GENERATE()', 'Basics', 'Easy', 'This is a basic typing lesson content.'),
('UUID_GENERATE()', 'Intermediate', 'Medium', 'This is an intermediate typing lesson content.');

-- Add more seed data as needed
