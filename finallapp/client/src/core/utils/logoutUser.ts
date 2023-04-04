import { AuthorizationRequestData } from '../types/AuthorizationRequestData';
import { User } from '../types/User';
import { BASE_SERVER_URL, LOGOUT_URL } from '../constants/serverConstants';

export const logoutUser = async (): Promise<void | string> => {
    try {
        const rawResponse: Response = await fetch(`${BASE_SERVER_URL}${LOGOUT_URL}`);

        if (rawResponse.ok) {
            const res = await rawResponse.json();
        } else {
            return rawResponse.statusText;
        }
    } catch (e) {
        return (e as Error).message;
    }
};
