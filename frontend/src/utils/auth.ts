import router from '@/router';
import store from '@/store';
import { backendURL, backendURLFull } from './constants';
import { closeFullscreen } from './functions';
import { IUser } from './interfaces';

const lsKey = 'fitnesshub-auth';

export function getToken(): string | null {
  return localStorage.getItem(lsKey);
}

export function decodeBase64(str: string): string {
  // Decode base64 to binary
  const binaryString = window.atob(str);

  // Convert binary to UTF-8
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Decode UTF-8 to string
  const text = new TextDecoder().decode(bytes);

  return text;
}

export function getUserFromJWT(): IUser {
  const base64Url = (getToken() || 'A.B.C').split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decodedString = decodeBase64(base64);
  const user = JSON.parse(decodedString);
  console.log(user);
  return user;
}

export async function signOut() {
  localStorage.removeItem(lsKey);
  await router.push({ name: 'home' });
  store.commit('signOut');
}

export async function verfiyUser(): Promise<boolean> {
  const token: string | null = getToken();

  if (!token) return false;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };

  const res = await fetch(`${backendURL}user/verify`, options)
    .then(res => res.json())
    .catch(() => {
      signOut();
      return false;
    });

  if (res.statusCode && res.statusCode === 401) {
    signOut();
    return false;
  }

  return true;
}

export function persistLogin(token: string): void {
  localStorage.setItem(lsKey, token);
}

export function signIn(provider = 'google') {
  localStorage.removeItem(lsKey);

  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=500,left=100,top=100`;

  window.open(`${backendURL}auth/${provider}`, 'fitnesshub-login', params);

  window.onmessage = async (e: MessageEvent) => {
    if (e.data && String(e.data).startsWith('fht=')) {
      console.log(e);
      console.log(backendURL);
      console.log(backendURLFull);
      if (e.origin === backendURLFull) {
        const token = String(e.data).substring(4);
        persistLogin(token);

        if (!store.getters.valid && (await verfiyUser())) {
          store.commit('signIn', getUserFromJWT());
          closeFullscreen('home');
        }
      } else {
        console.error('Unallowed origin', e.origin);
      }
    }
  };
}
