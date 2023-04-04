import { makeAutoObservable, runInAction } from 'mobx';
import { AuthorizationRequestData } from '../core/types/AuthorizationRequestData';
import { ShortUser, User } from '../core/types/User';
import { loginUser } from '../core/utils/loginUser';
import { logoutUser } from '../core/utils/logoutUser';
import { NotificationStore } from './notificationStore';

export class UserStore {
    _user: User | null = null;
    _notificationStore: NotificationStore;

    constructor(notificationStore: NotificationStore) {
        makeAutoObservable(this);
        this._notificationStore = notificationStore;

            const loadedUser = localStorage.getItem('user');

            if (loadedUser) {
                this._user = JSON.parse(loadedUser);
            }
        
    }

    async loadUser(authRequest: AuthorizationRequestData): Promise<User | null> {
        const data: User | string = await loginUser(authRequest);

        if (typeof data !== 'string') {   
            this._user = data;
            localStorage.setItem('user', JSON.stringify(data));

            this._notificationStore.addNotification({ status: 'success', message: 'Authorized successfully' });

            return data;
        } else {
            this._notificationStore.addNotification({ status: 'error', message: data });

            return null;
        }
    }

    async logout() {
        const data = await logoutUser();

        localStorage.removeItem('user');
        this._user = null;

        this._notificationStore.addNotification({ status: 'success', message: 'Logout successfully' });
    }

    get shortUser(): ShortUser | undefined {
        if (this._user) {
            return { id: this._user.id, name: this._user.name, surname: this._user.surname };
        }
    }

    get user(): User | undefined {
        if (this._user) {
            return this._user;
        }
    }

    get isAuthorized(): boolean {
        return !!this._user;
    }

    get isModerator(): boolean {
        return this._user?.roles === 'CHIEF';
    }
}
