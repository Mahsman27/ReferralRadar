import { detect } from "../../lib/detect";
import { loadHistory, clearHistory } from "../../lib/storage";

async function init(): Promise<void> {
  await showCurrentPageStatus();
  await showHistory();
  setupSettings();
}

async function showCurrentPageStatus(): Promise<void> {
  const statusEl = document.getElementById("page-status")!;
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tabs[0]?.url;
  if (!url) {
    statusEl.textContent = "No page detected";
    return;
  }

  const matches = detect(url);
  if (matches.length === 0) {
    statusEl.className = "clean";
    statusEl.textContent = "No affiliate links detected";
  } else {
    statusEl.className = "detected";
    const networks = [...new Set(matches.map((m) => m.network))];
    statusEl.textContent = `Affiliate link detected via ${networks.join(", ")}`;
  }
}

async function showHistory(): Promise<void> {
  const list = document.getElementById("history-list")!;
  const clearBtn = document.getElementById("clear-history")!;
  const history = await loadHistory();

  if (history.length === 0) {
    list.innerHTML = "<li>No history yet</li>";
    return;
  }

  clearBtn.style.display = "block";
  list.innerHTML = history
    .slice(0, 10)
    .map(
      (page) =>
        `<li><span class="history-network">${page.matches[0].network}</span>${page.url}</li>`
    )
    .join("");

  clearBtn.onclick = async () => {
    await clearHistory();
    list.innerHTML = "<li>History cleared</li>";
    clearBtn.style.display = "none";
  };
}

function setupSettings(): void {
  const toastCheckbox = document.getElementById("toggle-toast") as HTMLInputElement;
  const badgesCheckbox = document.getElementById("toggle-badges") as HTMLInputElement;

  chrome.storage.sync.get(["toastEnabled", "badgesEnabled"], (result) => {
    toastCheckbox.checked = result.toastEnabled !== false;
    badgesCheckbox.checked = result.badgesEnabled !== false;
  });

  toastCheckbox.addEventListener("change", () => {
    chrome.storage.sync.set({ toastEnabled: toastCheckbox.checked });
  });

  badgesCheckbox.addEventListener("change", () => {
    chrome.storage.sync.set({ badgesEnabled: badgesCheckbox.checked });
  });
}

init();