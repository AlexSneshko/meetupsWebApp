import { BASE_SERVER_URL, MEETUPS_URL } from '../../constants/serverConstants';
import { Meetup } from '../../types/Meetup';

export const getMeetupFromServerById = async (id: string): Promise<Meetup | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}/${id}`);

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (error: any) {
        return (error as Error).message;
    }
};
