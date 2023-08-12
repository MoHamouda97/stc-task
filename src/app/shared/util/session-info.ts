import { SessionKey } from "../types/session-key";

export function setSessionInfo(key: SessionKey, value: any) {
    sessionStorage.setItem(key, value);
}

export function getSessionInfo(key: SessionKey): string {
    return sessionStorage.getItem(key) as string;
}