import { CreatedNews, News } from '../core/types/News';
import { makeAutoObservable, runInAction } from 'mobx';
import { getNewsFromServer } from '../core/utils/news/getNewsFromServer';
import { sendCreatedNewsToServer } from '../core/utils/news/sendCreatedNewsToServer';
import { removeNewsFromServer } from '../core/utils/news/removeNewsFromServer';
import { updateNewsOnServer } from '../core/utils/news/updateNewsOnserver';
import { getNewsFromServerById } from '../core/utils/news/getNewsFromServerById';
import { NotificationStore } from './notificationStore';

export class NewsStore {
    allNews: Array<News> = [];
    _notificationStore: NotificationStore;

    constructor(notificationStore: NotificationStore) {
        makeAutoObservable(this);

        this._notificationStore = notificationStore;
    }

    async loadAllNews() {
        const data: Array<News> | string = await getNewsFromServer();

        if (typeof data === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: data });
        } else {      
            this.allNews = data;
        }

        return data;
    }

    async addNews(news: CreatedNews): Promise<void> {
        const createdNews: News | string = await sendCreatedNewsToServer(news);

        if (typeof createdNews === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: createdNews });
        } else {
            this._notificationStore.addNotification({ status: 'success', message: 'News added successfuly' });
        }
    }

    async removeNews(id: string): Promise<void> {
        const removedNews: News | string = await removeNewsFromServer(id);

        if (typeof removedNews === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: removedNews });
        } else {
            this._notificationStore.addNotification({ status: 'success', message: 'News added successfuly' });
        }
    }

    async updateNews(news: News): Promise<void> {
        const updatedNews: News | string = await updateNewsOnServer(news);

        if (typeof updatedNews === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: updatedNews });
        } else {
            this._notificationStore.addNotification({ status: 'success', message: 'News updated successfuly' });
        }
    }

    async getNewsById(id: string): Promise<News | null> {
        const news = await getNewsFromServerById(id);

        if (typeof news === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: news });
            return null;
        } else {
            return news;
        }
    }
}
