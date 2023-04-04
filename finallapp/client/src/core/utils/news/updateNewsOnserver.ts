import { News } from '../../types/News';
import { BASE_SERVER_URL, NEWS_URL } from '../../constants/serverConstants';
import { UNKNOWN_ERROR } from '../../constants/errorConstants';

export const updateNewsOnServer = async (editedNews: News): Promise<News | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${NEWS_URL}/${editedNews.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedNews)
        });

        return rawResponse.ok ? await rawResponse.json() : rawResponse.statusText;
    } catch (e) {
        return (e as Error).message;
    }
};
