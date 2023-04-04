import { BASE_SERVER_URL, MEETUPS_URL, VOTEDUSERS_URL } from '../../constants/serverConstants';
import { User } from '../../types/User';

export const getMeetupsVotedUsersFromServer = async (id: string): Promise<Array<User> | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}${VOTEDUSERS_URL(id)}`);

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (error: any) {
        return (error as Error).message;
    }
};
