import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sqlite3Wasm from 'node-sqlite3-wasm'

const { Database } = sqlite3Wasm

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbDir = path.join(__dirname, '..', '..', 'data')
const dbPath = path.join(dbDir, 'agent-collaboration-v2.db')

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const db = new Database(dbPath)

// Mitigate "database is locked" on Windows by using WAL mode and a busy timeout.
try {
  db.exec('PRAGMA journal_mode = WAL;')
  db.exec('PRAGMA busy_timeout = 5000;')
} catch (err) {
  // Some WASM builds may not support WAL; continue with defaults.
}

db.exec(`
  CREATE TABLE IF NOT EXISTS agent_collaboration (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week INTEGER NOT NULL UNIQUE,
    day_name TEXT NOT NULL,
    date_string TEXT,
    total_agents INTEGER NOT NULL DEFAULT 0,
    total_events INTEGER NOT NULL DEFAULT 0,
    total_chains INTEGER NOT NULL DEFAULT 0,
    chains_json TEXT NOT NULL,
    agents_json TEXT NOT NULL,
    events_json TEXT NOT NULL,
    modules_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`)

const DAY_NAMES = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export function resolveDay(dayParam) {
  if (typeof dayParam === 'number' && dayParam >= 0 && dayParam < 7) {
    return { index: dayParam, name: DAY_NAMES[dayParam], label: DAY_LABELS[dayParam] }
  }
  const normalized = String(dayParam || '').toLowerCase().trim()
  const index = DAY_NAMES.indexOf(normalized)
  if (index >= 0) return { index, name: DAY_NAMES[index], label: DAY_LABELS[index] }
  return { index: 0, name: DAY_NAMES[0], label: DAY_LABELS[0] }
}

export function listDays() {
  return DAY_NAMES.map((name, index) => ({ name, label: DAY_LABELS[index], index }))
}

export function getCollaborationByDay(dayParam) {
  const { index } = resolveDay(dayParam)
  const row = db.get('SELECT * FROM agent_collaboration WHERE day_of_week = ?', [index])
  if (!row) return null
  return {
    dayOfWeek: row.day_of_week,
    dayName: row.day_name,
    dateString: row.date_string,
    totalAgents: row.total_agents,
    totalEvents: row.total_events,
    totalChains: row.total_chains,
    chains: JSON.parse(row.chains_json),
    agents: JSON.parse(row.agents_json),
    events: JSON.parse(row.events_json),
    modules: JSON.parse(row.modules_json),
    updatedAt: row.updated_at,
  }
}

export function saveCollaboration(dayParam, payload) {
  const { index, name } = resolveDay(dayParam)
  const now = new Date().toISOString()
  const dateString = payload.dateString || now.slice(0, 10)

  const sql = `
    INSERT INTO agent_collaboration (
      day_of_week, day_name, date_string, total_agents, total_events, total_chains,
      chains_json, agents_json, events_json, modules_json, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(day_of_week) DO UPDATE SET
      date_string = excluded.date_string,
      total_agents = excluded.total_agents,
      total_events = excluded.total_events,
      total_chains = excluded.total_chains,
      chains_json = excluded.chains_json,
      agents_json = excluded.agents_json,
      events_json = excluded.events_json,
      modules_json = excluded.modules_json,
      updated_at = excluded.updated_at
  `

  db.run(sql, [
    index,
    name,
    dateString,
    payload.totalAgents ?? 12,
    payload.totalEvents ?? payload.events?.length ?? 0,
    payload.totalChains ?? payload.chains?.length ?? 6,
    JSON.stringify(payload.chains),
    JSON.stringify(payload.agents),
    JSON.stringify(payload.events),
    JSON.stringify(payload.modules),
    now,
    now,
  ])

  return getCollaborationByDay(name)
}

export function hasAnyCollaboration() {
  const row = db.get('SELECT COUNT(*) as count FROM agent_collaboration')
  return row.count > 0
}
