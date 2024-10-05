// Polyfill
import { browser } from 'webextension-polyfill-ts';

// Types
import {
  TypeCookie,
  TypeExtendedCookie,
  TypeCookieState,
  TypeBadge,
  TypeCookiesState,
  TypeSetDetailsTypeCookie,
} from '../types/GlobalTypes';

// Helpers
import { sum, groupBy, sortBy } from 'ramda';
import {
  formatDistanceToNow,
  fromUnixTime,
  format,
  addHours,
  getUnixTime,
  parse,
} from 'date-fns';
import * as R from 'ramda';


import { parseDomain, ParseResultType } from "parse-domain";

// Ramda Functions
export const groupCookiesByDomain = groupBy(
  (cookie: TypeCookie) => cookie.domain
);
export const sortCookiesByDomain = sortBy(
  (mappedCookies: TypeCookieState) => mappedCookies.domain.length
);

export const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const getMainDomain = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Extract the main domain from the hostname
    const parts = hostname.split('.');
    if (parts.length > 2) {
      // Assuming the domain is the last two parts
      return parts.slice(-2).join('.');
    }

    return hostname; // Return as is if it's already a main domain
  } catch (error) {
    console.error('Error parsing URL:', error);
    return ''; // Return empty string if parsing fails
  }
};



export const formatCookies = async (cookies, url) => {
  // @ts-ignore
  const newCookie = formatNewCookie(cookies, url);
  console.log('FINAL COOKIE', newCookie);

  browser.cookies
      .remove({
        url: newCookie.url!,
        name: newCookie.name,
        storeId: newCookie.storeId,
      })
      .then(() => {
        browser.cookies.set(newCookie).then(e => {
          console.log('FIN', e);
        });
  });

};

export const changeActiveTabURL = async (newURL) => {
  // Mendapatkan tab yang sedang aktif
  const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });

  if (activeTab) {
      // Mengubah URL tab aktif
      await browser.tabs.update(activeTab.id, { url: newURL });
      console.log("Tab URL updated to:", newURL);
  } else {
      console.log("No active tab found.");
  }
}


export const perfTracker = async (name: string, fnc: () => void) => {
  console.time(name);
  await fnc();
  console.timeEnd(name);
};

export const getCookiesSize = (
  cookies: Array<TypeCookie>,
  returnNumber: boolean = false
) => {
  const sizes = cookies.map(cookie => calculateOneCookieSize(cookie) as number);
  const size = sum(sizes);
  if (returnNumber) return size;
  return humanReadableSize(size);
};

export const humanReadableSize = (size: number) =>
  size > 1000 ? `${(size / 1000).toFixed(2)} kb` : `${size} bytes`;

// export const getSizeOfValues = (...args: string[]) =>
//   Buffer.byteLength(args.join(''));
export const getSizeOfValues = (...args: string[]): number => {
  const encoder = new TextEncoder();
  return encoder.encode(args.join('')).length;
};

export const calculateOneCookieSize = (
  cookie: TypeCookie,
  humanReadable: boolean = false
) => {
  const size = getSizeOfValues(cookie.name, cookie.value);
  if (humanReadable) return humanReadableSize(size);
  return size;
};

export const getCurrentDomainFromUrl = (url: string | null | undefined) => {
  if (!url) return '';

  const parsedDomainUrl = parseDomain(url);
  if (parsedDomainUrl.type !== ParseResultType.Listed) return '';

  return [parsedDomainUrl.domain, parsedDomainUrl.topLevelDomains].join('.');
};

export const getCurrentUrlFromTab = (fullUrl: string | undefined | null) => {
  if (R.isEmpty(fullUrl) || R.isNil(fullUrl)) {
    return null;
  }

  const parsedDomainUrl = parseDomain(fullUrl as string);
  if (parsedDomainUrl.type !== ParseResultType.Listed) {
    return null;
  }

  const currentUrl =
    parsedDomainUrl?.subDomains[0] === '' || parsedDomainUrl?.subDomains[0] === 'www'
      ? [parsedDomainUrl.domain, parsedDomainUrl.topLevelDomains].join('.')
      : [
          parsedDomainUrl?.subDomains[0],
          parsedDomainUrl?.domain,
          parsedDomainUrl?.topLevelDomains,
        ].join('.');
  return currentUrl;
};

export const formatNewCookie = (
  cookie: TypeExtendedCookie,
  currentUrl: string
): TypeSetDetailsTypeCookie => {
  const PICK_FIELDS: Array<keyof TypeExtendedCookie> = [
    'name',
    'storeId',
    'value',
    'expirationDate',
    'path',
    'httpOnly',
    'secure',
  ];

  const secure = currentUrl.indexOf('https://') === 0;
  const hostOnlyDomain =
    cookie.domain.substr(0, 1) === '.'
      ? cookie.domain.substring(1)
      : cookie.domain;
  // @ts-ignore
  return {
    ...R.pick(PICK_FIELDS, {
      ...cookie,
      expirationDate: getUnixTime(
        parse(cookie.expirationDateString, DATE_TIME_FORMAT, new Date())
      ),
    }),
    ...(!cookie.hostOnly && Boolean(cookie.domain.substr(0, 1) === '.')
      ? { domain: hostOnlyDomain }
      : {}),
    url: `http${secure ? 's' : ''}://${hostOnlyDomain}${cookie.path}`,
  };
};

export const getURL = (url: string | null) => {
  if (!url) return '';
  try {
    const domain = new URL(url).hostname;
    return domain === 'newtab' ? '' : domain.replace('www.', '');
  } catch (error) {
    return '';
  }
};

export const openTabAndSetCookie = async (cookies, url: string) => {
  try {
    // Buat tab baru
    const tab = await browser.tabs.create({ url });

    // Tunggu hingga tab selesai dimuat
    browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        // Setel cookie untuk tab yang baru dibuat
        try {
          formatCookies(cookies, url)
          console.log('Cookie telah diatur dengan sukses.');
        } catch (error) {
          console.error('Error mengatur cookie:', error);
        }
      }
    });
  } catch (error) {
    console.error('Error membuka tab:', error);
  }
};

export const openNewTab = async (url: string) => {
  try {
    const tab = await browser.tabs.create({ url, active: false });
    return tab
  } catch (error) {
    console.error('Error opening new tab:', error);
  }
};

export const currentTab = async () => {
  const tab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab[0];
};

export const getAllCookies = async (): Promise<TypeCookiesState | null> => {
    const tab = await currentTab();

    // Get the main domain from the URL
    const mainDomain = getMainDomain(tab.url as string);

    // If domain extraction failed, return null
    if (!mainDomain) {
      return null;
    }

    // Fetch cookies based on the main domain
    const cookies = await browser.cookies.getAll({ domain: mainDomain });
    console.log('Parsed Domain cookies >>>', cookies);

    // Group cookies by domain
    const groupedCookies = groupCookiesByDomain(cookies);

    // Map cookies to the desired format
    const mappedCookies = Object.entries(groupedCookies).map(
      ([domain, cookiesList]) => {
        const size = getCookiesSize(cookiesList as TypeCookie[], true) as number;

        const formattedCookies = (cookiesList as TypeCookie[]).map((cookie) => {
          const cookieSize = calculateOneCookieSize(cookie) as number;
          const newCookie: TypeExtendedCookie = {
            ...cookie,
            size: cookieSize,
            formatedSize: humanReadableSize(cookieSize),
            expirationMessage: getExpirationDate(cookie),
            expirationDateString: getExpirationDateString(cookie.expirationDate),
            badges: generateBadges(cookie),
          };
          return newCookie;
        });

        return {
          domain,
          size,
          formatedSize: humanReadableSize(size),
          cookies: formattedCookies,
        };
      }
    );

    return sortCookiesByDomain(mappedCookies) as TypeCookiesState;

};

export const compareCookies = (
  newCookies: TypeCookiesState,
  oldCookies: TypeCookiesState
) => JSON.stringify(newCookies) === JSON.stringify(oldCookies);

export const getExpirationDate = (cookie: TypeCookie) => {
  if (cookie.session) return 'Session';
  if (!cookie.expirationDate) return null;

  return formatDistanceToNow(fromUnixTime(cookie.expirationDate));
};

export const getExpirationDateString = (
  time: number | null | undefined = null
) => {
  return format(
    time ? fromUnixTime(time) : addHours(new Date(), 1),
    DATE_TIME_FORMAT
  );
};

export const generateBadges = (cookie: TypeCookie) => {
  let badges: Array<TypeBadge> = [];

  if (cookie.httpOnly)
    badges.push({
      badgeName: 'HttpOnly',
    });
  if (cookie.secure)
    badges.push({
      badgeName: 'Secure',
    });

  return badges;
};
