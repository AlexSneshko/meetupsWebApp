import { AuthorizationRequestData } from '../types/AuthorizationRequestData';
import { User } from '../types/User';
import { BASE_SERVER_URL, LOGIN_URL } from '../constants/serverConstants';

export const loginUser = async (authData: AuthorizationRequestData): Promise<User | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${LOGIN_URL}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        if (rawResponse.ok) {
            const res = await rawResponse.json();
            return await res.user;
        }
        return rawResponse.statusText;
    } catch (e) {
        return (e as Error).message;
    }
};
