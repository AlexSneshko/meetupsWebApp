import { BASE_SERVER_URL, MEETUPS_URL, VOTEDUSERS_URL } from '../../constants/serverConstants';
import { Meetup } from '../../types/Meetup';

export const deleteUserVoteFromServer = async (id: string) => {
    try {
        const res: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}${VOTEDUSERS_URL(id)}`, {
            method: 'DELETE',
            credentials: 'include'
        });
    } catch (error) {
        return (error as Error).message;
    }
};
