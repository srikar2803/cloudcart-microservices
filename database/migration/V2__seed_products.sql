INSERT INTO products (
    name,
    category,
    brand,
    price,
    rating
)
SELECT
    'Product-' || gs,
    (
        ARRAY[
            'Mobiles',
            'Electronics',
            'Fashion',
            'Accessories'
        ]
    )[floor(random()*4+1)],
    (
        ARRAY[
            'Apple',
            'Samsung',
            'Sony',
            'Boat',
            'Titan',
            'Adidas',
            'Levis',
            'Puma'
        ]
    )[floor(random()*8+1)],
    round((random()*100000 + 500)::numeric,2),
    round((random()*4 + 1)::numeric,1)
FROM generate_series(1,1000) gs;
