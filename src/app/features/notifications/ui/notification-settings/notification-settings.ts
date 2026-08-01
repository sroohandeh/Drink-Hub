import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../../shared/ui/card/card';
import { Notification } from '../../data/notification';

@Component({
  selector: 'app-notification-settings',
  imports: [Card],
  templateUrl: './notification-settings.html',
  styleUrl: './notification-settings.css',
})
export class NotificationSettings {
  private notificationService = inject(Notification);
  status = signal<string | null>(null);

  async enableNotifications() {
    const granted = await this.notificationService.requestPermission();
    if (granted) {
      this.status.set('اعلان‌ها فعال شدند؛ حالا می‌توانید نوتیفیکیشن دریافت کنید.');
    } else {
      this.status.set('مجوز اعلان داده نشد یا مرورگر از اعلان پشتیبانی نمی‌کند.');
    }
  }

  testNewDrinkNotification() {
    this.notificationService.showLocalNotification(
      'نوشیدنی جدید اضافه شد',
      'دوغ سنتی با نعنا تازه به لیست نوشیدنی‌های شما اضافه شد.',
    );
  }

  subscribeToPush() {
    const fakePublicKey = 'BEXAMPLE_VAPID_PUBLIC_KEY...';
    this.notificationService.subscribeToPush(fakePublicKey);
  }
}
