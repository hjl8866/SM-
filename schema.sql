CREATE TABLE IF NOT EXISTS devices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  serial_number TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  activate_time TEXT NOT NULL,
  warranty_end TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO devices (serial_number, model, activate_time, warranty_end)
VALUES ('TEST001','iPhone 15 Pro','2025-01-01','2026-01-01');
