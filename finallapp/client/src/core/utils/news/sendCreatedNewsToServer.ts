import { News, CreatedNews } from '../../types/News';
import { BASE_SERVER_URL, NEWS_URL } from '../../constants/serverConstants';
import { UNKNOWN_ERROR } from '../../constants/errorConstants';

export const sendCreatedNewsToServer = async (newNews: CreatedNews): Promise<News | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${NEWS_URL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNews)
        });

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (e) {
        return (e as Error).message;
    }
};
