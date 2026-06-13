import { useState, useEffect, useCallback } from 'react';
import { logTemplates, regions } from '../data/logTemplates';

export type LogEntry = {
  id: string;
  timestamp: string;
  type: keyof typeof logTemplates;
  status: 'success' | 'warning' | 'critical' | 'info';
  message: string;
  meta: string;
  region: (typeof regions)[number];
};

interface UseLogStreamOptions {
  minIntervalMs?: number;
  maxIntervalMs?: number;
  maxEntries?: number;
}

export const useLogStream = (options: UseLogStreamOptions = {}) => {
  const { minIntervalMs = 800, maxIntervalMs = 2200, maxEntries = 150 } = options;
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const generateLog = useCallback((): LogEntry => {
    const types = Object.keys(logTemplates) as (keyof typeof logTemplates)[];
    const type = types[Math.floor(Math.random() * types.length)];
    const statuses = Object.keys(logTemplates[type]) as (
      | 'success'
      | 'warning'
      | 'critical'
      | 'info'
    )[];
    const status = statuses[0]; // Take the defined status for the type
    const variants = (logTemplates[type] as Record<string, string[]>)[status];
    let message = variants[Math.floor(Math.random() * variants.length)];

    // Replace placeholders
    message = message.replace('{rand5}', Math.floor(10000 + Math.random() * 90000).toString());
    message = message.replace('{id}', Math.floor(1000 + Math.random() * 9000).toString());

    const id = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toISOString();
    const region = regions[Math.floor(Math.random() * regions.length)];
    const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    const metaBank = [
      `id=usr_${Math.floor(Math.random() * 9000)} ip=${randomIP}`,
      `latency=${Math.floor(Math.random() * 160 + 20)}ms status=200`,
      `endpoint=/v2/ingest code=${Math.random() > 0.9 ? '429' : '200'}`,
    ];

    return {
      id,
      timestamp,
      type,
      status,
      message,
      meta: metaBank[Math.floor(Math.random() * metaBank.length)],
      region,
    };
  }, []);

  useEffect(() => {
    // Initial logs
    const initialLogs = Array.from({ length: 10 }, generateLog);
    setLogs(initialLogs);

    const scheduleNext = () => {
      const delay = Math.random() * (maxIntervalMs - minIntervalMs) + minIntervalMs;
      return setTimeout(() => {
        setLogs((prev) => [generateLog(), ...prev].slice(0, maxEntries));
        timeoutId = scheduleNext();
      }, delay);
    };

    let timeoutId = scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [generateLog, maxEntries, maxIntervalMs, minIntervalMs]);

  const clearLogs = () => setLogs([]);

  return { logs, clearLogs };
};
