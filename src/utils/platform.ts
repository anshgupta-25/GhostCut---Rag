import { Capacitor } from '@capacitor/core';

/**
 * Returns true when the app is running inside a native Capacitor shell
 * (Android / iOS), false when it's running in a regular browser.
 */
export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

/**
 * Returns the current platform: 'android' | 'ios' | 'web'
 */
export function getPlatform(): string {
  return Capacitor.getPlatform();
}
