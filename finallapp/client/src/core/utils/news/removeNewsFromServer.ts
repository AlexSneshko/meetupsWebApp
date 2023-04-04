import { BASE_SERVER_URL, NEWS_URL } from '../../constants/serverConstants';
import { News } from '../../types/News';

export const removeNewsFromServer = async (id: string): Promise<News | string> => {
    try {
        const rawResponse = await fetch(`${BASE_SERVER_URL}${NEWS_URL}/${id}`, {
            method: 'DELETE'
        });

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (e) {
        return (e as Error).message;
    }
};
