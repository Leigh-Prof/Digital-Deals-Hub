-- Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text not null default 'folder',
  color text not null default '#2563EB',
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  short_description text not null default '',
  thumbnail_url text not null default '',
  google_drive_url text not null,
  category text not null references categories(slug),
  tags text[] not null default '{}',
  file_type text not null default 'PDF',
  featured boolean not null default false,
  hidden boolean not null default false,
  views integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- Enable RLS (read-only public access)
alter table categories enable row level security;
alter table products enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (hidden = false);
create policy "Public update views" on products for update using (true) with check (true);
