import { makeAutoObservable } from 'mobx';
import { CreatedMeetup, Meetup, MeetupStatus } from '../core/types/Meetup';
import { User } from '../core/types/User';
import { getMeetupFromServerById } from '../core/utils/meetups/getMeetupFromServerById';
import { getMeetupsFromServer } from '../core/utils/meetups/getMeetupsFromServer';
import { getMeetupsVotedUsersFromServer } from '../core/utils/meetups/getMeetupsVotedUsersFromServer';
import { removeMeetupFromServerById } from '../core/utils/meetups/removeMeetupFromServer';
import { sendCreatedMeetupToServer } from '../core/utils/meetups/sendCreatedMeetupToServer';
import { updateMeetupOnServer } from '../core/utils/meetups/updateMeetupOnServer';
import { NotificationStore } from './notificationStore';

export class MeetupsStore {
    meetups: Array<Meetup> = [];
    _notificationStore: NotificationStore;

    constructor(notificationStore: NotificationStore) {
        this.loadMeetups();
        makeAutoObservable(this);

        this._notificationStore = notificationStore;
    }

    async loadMeetups(): Promise<void> {
        const receivedMeetups: Array<Meetup> | string = await getMeetupsFromServer();

        if (typeof receivedMeetups === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: receivedMeetups });
        } else {
            this.meetups = receivedMeetups;
        }
    }

    async addMeetup(meetup: CreatedMeetup): Promise<void> {
        const createdMeetup: Meetup | string = await sendCreatedMeetupToServer({
            ...meetup,
            start: meetup.start ? meetup.start : new Date().toISOString(),
            finish: meetup.finish ? meetup.finish : new Date(new Date().getTime() + 2000).toISOString()
        });

        if (typeof createdMeetup === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: createdMeetup });
        } else {
            this._notificationStore.addNotification({ status: 'success', message: 'Meetup successfully added' });
        }
    }

    async updateMeetup(meetup: Meetup): Promise<void> {
        const updatedMeetup: Meetup | string = await updateMeetupOnServer(meetup);

        if (typeof updatedMeetup === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: updatedMeetup });
        } else {
            this._notificationStore.addNotification({ status: 'success', message: 'Meetup successfully updated' });
        }
    }

    async removeMeetup(id: string): Promise<void> {
        const deletedMeetup: Meetup | string = await removeMeetupFromServerById(id);

        if (typeof deletedMeetup === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: deletedMeetup });
        } else {
            this._notificationStore.addNotification({ status: 'success', message: 'Meetup successfully removed' });
        }

        this.loadMeetups()
    }

    async getMeetupById(id: string): Promise<Meetup | null> {
        const meetup: Meetup | string = await getMeetupFromServerById(id);

        if (typeof meetup === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: meetup });
            return null;
        }

        return meetup;
    }

    async updateMeetupStatusById(id: string): Promise<void> {
        const meetup = await this.getMeetupById(id);

        if (meetup) {
            await this.updateMeetup({ ...meetup, status: this.getNextStatus(meetup.status) });
        }
    }

    getNextStatus(prevStatus: MeetupStatus): MeetupStatus {
        if (prevStatus === 'PAST') {
            return 'PAST';
        }

        const statusList: Array<MeetupStatus> = ['REQUEST', 'DRAFT', 'CONFIRMED', 'PAST'];

        const prevStatusIndex = statusList.indexOf(prevStatus);

        return statusList[prevStatusIndex + 1];
    }

    async getVotedUsersByMeetupId(id: string): Promise<User[]> {
        const votedUsers: User[] | string = await getMeetupsVotedUsersFromServer(id);

        if (typeof votedUsers === 'string') {
            this._notificationStore.addNotification({ status: 'error', message: votedUsers });

            return [];
        } else {
            return votedUsers;
        }
    }

    async countVotedUserByMeetupId(id: string): Promise<number> {
        const votedUsers = await this.getVotedUsersByMeetupId(id);

        return votedUsers.length;
    }

    getMeetupsByStatus(status: MeetupStatus): Array<Meetup> {
        return this.meetups.filter((meetup) => meetup.status === status)
    }
}
