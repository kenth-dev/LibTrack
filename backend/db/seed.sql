-- LibTrack Seed Data
-- Run this in Supabase SQL Editor after schema.sql to populate test data

INSERT INTO books (title, author, status, cover_image) VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Available', 'http://localhost:8000/static/covers/book-cover-placeholder.svg'),
    ('To Kill a Mockingbird', 'Harper Lee', 'Available', 'http://localhost:8000/static/covers/book-cover-placeholder.svg'),
    ('1984', 'George Orwell', 'Borrowed', 'http://localhost:8000/static/covers/book-cover-placeholder.svg'),
    ('Pride and Prejudice', 'Jane Austen', 'Available', 'http://localhost:8000/static/covers/book-cover-placeholder.svg'),
    ('The Catcher in the Rye', 'J.D. Salinger', 'Borrowed', 'http://localhost:8000/static/covers/book-cover-placeholder.svg'),
    ('Brave New World', 'Aldous Huxley', 'Available', 'http://localhost:8000/static/covers/book-cover-placeholder.svg');
