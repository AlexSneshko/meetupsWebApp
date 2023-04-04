import { Meetup } from '../../types/Meetup';
import { BASE_SERVER_URL, MEETUPS_URL } from '../../constants/serverConstants';

export const removeMeetupFromServerById = async (id: string): Promise<Meetup | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (error: any) {
        return (error as Error).message;
    }
};
