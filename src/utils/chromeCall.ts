export interface MessageChrome {
  token?: string;
  userData?: {};
  formData?: {};
  currentTask?: {
    id: string,
    name: string
  },
  selectTask?: string;
  cookiesData?: {};
}

export type MessageChromeKeys = keyof MessageChrome;

export function setStoredCookies(cookiesData: any): Promise<void> {
  const vals: MessageChrome = {
    cookiesData
  }
  return new Promise((resolve) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.from === 'background' && message.action === 'updatePopup') {
        const { title, url } = message.data;
        document.getElementById('pageTitle').textContent = title;
        document.getElementById('pageUrl').textContent = url;
      }
    });
  })
}