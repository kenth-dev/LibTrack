-- LibTrack Seed Data
-- Run this in Supabase SQL Editor after schema.sql to populate test data

INSERT INTO books (title, author, status) VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Available'),
    ('To Kill a Mockingbird', 'Harper Lee', 'Available'),
    ('1984', 'George Orwell', 'Borrowed'),
    ('Pride and Prejudice', 'Jane Austen', 'Available'),
    ('The Catcher in the Rye', 'J.D. Salinger', 'Borrowed'),
    ('Brave New World', 'Aldous Huxley', 'Available');
