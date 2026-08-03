import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class Notification {
    private swPush = inject(SwPush);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isBrowser) {
      return false;
    }

    const notificationObj = (window as any).Notification;

    if (!notificationObj) {
      console.warn('Browser does not support notifications.');
      return false;
    }

    const permission = await notificationObj.requestPermission();
    return permission === 'granted';
  }

  showLocalNotification(title: string, body: string) {
    if (!this.isBrowser) {
      return;
    }

    const win = window as any;
    if (!('Notification' in win)) {
      return;
    }

    if (win.Notification.permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return;
    }

    new win.Notification(title, {
      body,
      icon: 'assets/icons/icon-192x192.png',
    });
  }

  async subscribeToPush(serverPublicKey: string): Promise<PushSubscription | null> {
    if (!this.swPush.isEnabled) {
      console.warn('Service worker / Push is not enabled.');
      return null;
    }

    try {
      const subscription = await this.swPush.requestSubscription({
        serverPublicKey,
      });

      console.log('Push subscription:', subscription);
      return subscription;
    } catch (err) {
      console.error('Could not subscribe to notifications', err);
      return null;
    }
  }

  listenToPushClicks() {
    this.swPush.notificationClicks.subscribe((event) => {
      console.log('Notification clicked:', event);
    });
  }
}
