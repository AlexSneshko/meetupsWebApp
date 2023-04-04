import { CreatedMeetup, Meetup } from '../../types/Meetup';
import { BASE_SERVER_URL, MEETUPS_URL } from '../../constants/serverConstants';
import { UNKNOWN_ERROR } from '../../constants/errorConstants';

export const sendCreatedMeetupToServer = async (newMeetup: CreatedMeetup): Promise<Meetup | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMeetup),
            credentials: 'include'
        });

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (error: any) {
        return (error as Error).message;
    }
};
