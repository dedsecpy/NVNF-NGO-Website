create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  amount_npr numeric not null,
  amount_usd numeric,
  frequency text check (frequency in ('one_time', 'monthly')),
  status text default 'pending',
  donor_email text,
  created_at timestamptz default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
