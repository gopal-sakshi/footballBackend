CREATE TABLE messages12 (
    id serial not null primary key,
    customer_id text NOT NULL,
    message11 text NOT NULL,
    meta jsonb,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
);

SELECT pg_get_serial_sequence('"public"."messages12"', 'id');
ALTER SEQUENCE public.messages12_id_seq RESTART WITH 101;

insert into messages12 (customer_id, message11, meta, created_at, updated_at) values 
( 'test101', 'wlcmMsg23', null, '2023-07-05T18:41:28.708Z', '2023-07-05T18:41:28.708Z' );

select * from messages12 

-------------------------------------------------------------
