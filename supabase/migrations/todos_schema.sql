-- Create todos table
CREATE TABLE todos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task TEXT NOT NULL,
    is_complete BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to view their own todos
CREATE POLICY "Users can view their own todos" ON todos
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to create their own todos
CREATE POLICY "Users can create their own todos" ON todos
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own todos
CREATE POLICY "Users can update their own todos" ON todos
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Allow users to delete their own todos
CREATE POLICY "Users can delete their own todos" ON todos
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX todos_user_id_idx ON todos(user_id);
CREATE INDEX todos_created_at_idx ON todos(created_at);

-- Add type safety for task field
ALTER TABLE todos
    ADD CONSTRAINT task_length CHECK (char_length(task) > 0 AND char_length(task) <= 500); 