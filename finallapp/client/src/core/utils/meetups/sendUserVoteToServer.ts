import { BASE_SERVER_URL, MEETUPS_URL, VOTEDUSERS_URL } from '../../constants/serverConstants';
import { Meetup } from '../../types/Meetup';

export const sendUserVoteToServer = async (id: string) => {
    try {
        const res: Response = await fetch(`${BASE_SERVER_URL}${MEETUPS_URL}${VOTEDUSERS_URL(id)}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            credentials: 'include'
        });

        if (!res.ok) {
            return res.statusText;
        }
    } catch (error) {
        return (error as Error).message;
    }
};
