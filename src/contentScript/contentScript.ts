// import { formatCookies, openNewTab } from '@utils/cookieUtils';
// import { browser } from 'webextension-polyfill-ts';

// async function handleMessage(request, sender) {
//   console.log(`content script sent a message: ${request}`);
//   if(request.action === 'forwardToContentScript'){
//             console.log('Message received in content script:', request);
//             const tab = await openNewTab(request.data.url)
//             browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
//               if (tabId === tab.id && changeInfo.status === 'complete') {
//                 // Setel cookie untuk tab yang baru dibuat
//                 try {
//                   request.data.cookieDetails.map(detail=>{
//                     detail.cookies.map(cookie=>{
//                       formatCookies(cookie, request.data.url)
//                     })
//                   })
//                   console.log('Cookie telah diatur dengan sukses.');
//                 } catch (error) {
//                   console.error('Error mengatur cookie:', error);
//                 }
//               }
//             });
//             browser.tabs.reload(tab.id);

//   }
// }

// browser.runtime.onMessage.addListener(handleMessage);