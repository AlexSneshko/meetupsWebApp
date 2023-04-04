import React from 'react'
import { MeetupsStore } from "../store/meetupsStore";
import { NewsStore } from "../store/newsStore";
import { NotificationStore } from "../store/notificationStore";
import { UserStore } from "../store/userStore";

const notificationStore = new NotificationStore();
export const meetupsStore = new MeetupsStore(notificationStore);
export const newsStore = new NewsStore(notificationStore);
const userStore = new UserStore(notificationStore);


export const MeetupsStoreContext = React.createContext<MeetupsStore>({} as MeetupsStore)
export const NewsStoreContext = React.createContext<NewsStore>({} as NewsStore)
export const UserStoreContext = React.createContext<UserStore>(userStore)
export const NotificationStoreContext = React.createContext<NotificationStore>(notificationStore)
