-- Create carts table
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id)
);

-- Create cart_items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES carts ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES products ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(cart_id, product_id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policies for carts
CREATE POLICY "Users can view their own cart." ON carts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart." ON carts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart." ON carts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart." ON carts
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for cart_items
CREATE POLICY "Users can view their own cart items." ON cart_items
    FOR SELECT USING (
        cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can insert their own cart items." ON cart_items
    FOR INSERT WITH CHECK (
        cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can update their own cart items." ON cart_items
    FOR UPDATE USING (
        cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can delete their own cart items." ON cart_items
    FOR DELETE USING (
        cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
    );

-- Functions and Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_carts_updated_at
BEFORE UPDATE ON carts
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_cart_items_updated_at
BEFORE UPDATE ON cart_items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
