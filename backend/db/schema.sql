-- LibTrack Database Schema
-- Run this in Supabase SQL Editor to create tables and enums

-- Create enums
CREATE TYPE book_status AS ENUM ('Available', 'Borrowed');
CREATE TYPE request_status AS ENUM ('Pending', 'Borrowed', 'Returned');

-- Create books table
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    status book_status NOT NULL DEFAULT 'Available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create borrow_requests table
CREATE TABLE borrow_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
    student_name TEXT NOT NULL,
    status request_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX idx_borrow_requests_book_id ON borrow_requests(book_id);
CREATE INDEX idx_borrow_requests_created_at ON borrow_requests(created_at DESC);
CREATE INDEX idx_books_status ON books(status);

-- Enable Row Level Security on both tables
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE borrow_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow all reads (anon and authenticated)
CREATE POLICY "Allow read access to books" ON books
    FOR SELECT USING (true);

CREATE POLICY "Allow read access to borrow_requests" ON borrow_requests
    FOR SELECT USING (true);

-- The backend uses the service role key to bypass RLS for inserts/updates
