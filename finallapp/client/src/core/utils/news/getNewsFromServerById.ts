import { BASE_SERVER_URL, NEWS_URL } from '../../constants/serverConstants';
import { News } from '../../types/News';

export const getNewsFromServerById = async (id: string): Promise<News | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${NEWS_URL}/${id}`);

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (e) {
        return (e as Error).message;
    }
};
