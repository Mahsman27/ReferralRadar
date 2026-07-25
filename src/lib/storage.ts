import type { DetectedPage } from "./types";

const HISTORY_KEY = "detected_pages";
const MAX_HISTORY = 100;

export async function savePage(page: DetectedPage): Promise<void> {
  const history = await loadHistory();
  history.unshift(page);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  await setItem(HISTORY_KEY, history);
}

export async function loadHistory(): Promise<DetectedPage[]> {
  const result = await getItem<DetectedPage[]>(HISTORY_KEY);
  return result ?? [];
}

export async function clearHistory(): Promise<void> {
  await setItem(HISTORY_KEY, []);
}

function getItem<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key] as T | undefined);
    });
  });
}

function setItem(key: string, value: unknown): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => resolve());
  });
}