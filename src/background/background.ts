import { setStoredCookies } from "@utils/storage";
import { browser } from 'webextension-polyfill-ts';
import { debouncedCookieHandler } from '@utils/browserDetector';

// async function handleMessage(request, sender) {
//   console.log(`content script sent a message`);
//   if(request.action === 'forwardToContentScript'){
//       const tabs = await browser.tabs.query({ active: true, currentWindow: true })
//       if (tabs.length > 0) {
//         const tabId = tabs[0].id;
//         const response = await browser.tabs.sendMessage(tabId, { action: 'forwardToContentScript', data: request.data })
//         return response
//       }

//   }
// }

// browser.runtime.onMessage.addListener(handleMessage);
browser.tabs.onActivated.addListener(debouncedCookieHandler);
browser.cookies.onChanged.addListener(debouncedCookieHandler);


// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ proxyActive: false });
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'getCookies') {
//     chrome.cookies.getAll({ domain: message.domain }, (cookies) => {
//       setStoredCookies({
//         domain: message.domain,
//         cookies:cookies
//       })
//       sendResponse({ cookies: cookies });
//     });
//     // Indicate that we will send a response asynchronously
//     return true;
//   }
//   if (message.action === 'getTabInfo') {
//     // Mendapatkan informasi tab aktif
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tab = tabs[0];
//       if (tab) {
//         // contentWebActive
//         sendResponse({
//           title: tab.title,
//           faviconUrl: tab.favIconUrl,
//           url: tab.url
//         });
//       } else {
//         sendResponse({ error: 'Tidak ada tab aktif' });
//       }
//     });
//     // Indicate that we will send a response asynchronously
//     return true;
//   }


//   if (message.action === 'openNewTabAndSetCookie') {
//     const { cookieDetails, url } = message.data;

//     // Validate cookie details and URL
//     if (!cookieDetails || !Array.isArray(cookieDetails) || !url) {
//       console.error('Invalid cookie data or URL');
//       return;
//     }

//     chrome.tabs.create({ url }, (tab) => {
//       if (chrome.runtime.lastError) {
//         console.error(`Error creating tab: ${chrome.runtime.lastError}`);
//         return;
//       }

//       // Set cookies on the newly created tab
//       cookieDetails.forEach(cookie => {
//         const { hostOnly, session, ...validCookieDetails } = cookie;

//         // Remove the hostOnly property
//         const cookieConfig = {
//           ...validCookieDetails,
//           url: tab.url,
//           expires: Date.now() + (1000 * 60 * 60 * 24 * 30)
//         };

//         chrome.cookies.set(cookieConfig, (result) => {
//           console.error(`Error setting cookie: ${JSON.stringify(chrome.runtime.lastError)}`);
//           if (chrome.runtime.lastError) {
//           } else {
//             console.log('Cookie set successfully:', result);
//           }
//         });
//       });
//     });
//   }
// });
