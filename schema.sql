PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS customers (
  shopify_id TEXT PRIMARY KEY,
  email TEXT,
  email_normalized TEXT,
  marketing_state TEXT NOT NULL DEFAULT 'NOT_SUBSCRIBED',
  updated_at TEXT NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0 CHECK (deleted IN (0, 1)),
  synced_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS customers_email ON customers(email_normalized);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  marketing_consent INTEGER NOT NULL DEFAULT 0 CHECK (marketing_consent IN (0, 1)),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS contacts_email ON contacts(email_normalized);

CREATE TABLE IF NOT EXISTS subscribers (
  email_normalized TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  state TEXT NOT NULL DEFAULT 'SUBSCRIBED',
  email_verified INTEGER NOT NULL DEFAULT 0 CHECK (email_verified IN (0, 1)),
  subscribed_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS consent_events (
  id TEXT PRIMARY KEY,
  email_normalized TEXT NOT NULL,
  consent INTEGER NOT NULL CHECK (consent IN (0, 1)),
  source TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS consent_events_email ON consent_events(email_normalized);

CREATE TABLE IF NOT EXISTS webhook_events (
  event_id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  subject_id TEXT,
  received_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ratelimits (
  key TEXT PRIMARY KEY,
  requests INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ratelimits_expiry ON ratelimits(expires_at);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expires_at INTEGER
);
