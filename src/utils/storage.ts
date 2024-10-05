export interface LocalStorage {
  token?: string;
  userData?: {};
  formData?: {};
  expiry?: number;
  currentTask?: {
    id: string,
    name: string
  },
  selectTask?: string;
  cookiesData?: {};
  user?:{}
}

export type LocalStorageKeys = keyof LocalStorage;


export function getCookieFromExtension(): string | null {
  // Pastikan ini sesuai dengan URL dari mana cookie disetel
  const cookieURL = 'chrome-extension://' + chrome.runtime.id;
  let tokenCookies: string;
  chrome.cookies.get({ url: cookieURL, name: 'yourCookieName' }, (cookie) => {
    if (cookie) {
      tokenCookies = cookie.value;
    } else {
      tokenCookies =  null
    }
  });
  return tokenCookies;
};


export function setStoredToken(token: string, ttl: number): Promise<void> {
  const now = new Date().getTime(); // Waktu saat ini dalam milidetik
  const expiry = now + ttl; // Hitung waktu kedaluwarsa

  const vals: LocalStorage = {
    token,
    expiry
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export async function getStoredToken(): Promise<string> {
  const keys: LocalStorageKeys[] = ['token', 'expiry'];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      const now = new Date().getTime(); // Waktu saat ini dalam milidetik

      if (res.expiry && now > res.expiry) {
        // Jika token sudah kedaluwarsa, hapus dari storage
        chrome.storage.local.remove(['token', 'expiry'], () => {
          resolve(''); // Token tidak ada atau kedaluwarsa
        });
      } else {
        // Jika token masih valid
        resolve(res.token ?? '');
      }
    });
  });
}

export function setStoredCookies(cookiesData: any): Promise<void> {
  const vals: LocalStorage = {
    cookiesData
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}


export async function getStoredCookies(): Promise<any> {
  const keys: LocalStorageKeys[] = ['cookiesData']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cookiesData ?? {})
    })
  })
}


export function setFormData(formData: any): Promise<void> {
  const vals: LocalStorage = {
    formData
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}


export async function getFormData(): Promise<any> {
  const keys: LocalStorageKeys[] = ['formData']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.formData ?? {})
    })
  })
}


export async function getUserStorage(): Promise<any> {
  const keys: LocalStorageKeys[] = ['user']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.user ?? {})
    })
  })
}


export function setUserStorage(userData: any): Promise<void> {
  const vals: LocalStorage = {
    user: userData
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}