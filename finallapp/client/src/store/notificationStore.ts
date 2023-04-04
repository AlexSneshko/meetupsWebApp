import { makeAutoObservable } from 'mobx';

export type NotificationStatus = 'success' | 'error';
export interface Notification {
    status: NotificationStatus;
    message: string;
}

export class NotificationStore {
    _notifications: Array<Notification> = [];

    constructor() {
        makeAutoObservable(this);
    }

    get isEmpty(): boolean {
        return this._notifications.length === 0;
    }

    addNotification(notification: Notification) {
        this._notifications.push(notification);

        setTimeout(() => {
            this._notifications.shift()
        }, 5000)
    }
}
