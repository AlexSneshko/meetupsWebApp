import { Meetup } from '../../types/Meetup';
import { BASE_SERVER_URL, MEETUPS_URL } from '../../constants/serverConstants';
import { UNKNOWN_ERROR } from '../../constants/errorConstants';

export const updateMeetupOnServer = async (editedMeetup: Meetup): Promise<Meetup | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedMeetup),
            credentials: 'include'
        });

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (error: any) {
        return (error as Error).message;
    }
};
