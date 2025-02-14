// src/lib/usageStore.ts

// WARNING: This in‑memory store is for demonstration purposes only.
// In production, use a persistent database.
interface UsageRecord {
    date: string; // YYYY-MM-DD format
    count: number;
  }
  
  const usageData: Record<string, UsageRecord> = {};
  
  /**
   * Returns the current usage count for the given user.
   */
  export function getUsage(userId: string): number {
    const today = new Date().toISOString().slice(0, 10);
    const record = usageData[userId];
    if (!record || record.date !== today) {
      return 0;
    }
    return record.count;
  }
  
  /**
   * Increments the usage count for the given user and returns the new count.
   */
  export function incrementUsage(userId: string): number {
    const today = new Date().toISOString().slice(0, 10);
    if (!usageData[userId] || usageData[userId].date !== today) {
      usageData[userId] = { date: today, count: 0 };
    }
    usageData[userId].count += 1;
    return usageData[userId].count;
  }
  