import {cookies} from "next/headers";
import Passage from "@passageidentity/passage-node";


const passage = new Passage({
    appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: 'HEADER',
})

export class AuthenticatedUser {
    isAuthorized: boolean
    userID: string
}

export async function getAuthenticatedUserFromSession(): AuthenticatedUser {
    const cookieStore = cookies()
    const authToken = cookieStore.get('psg_auth_token')

    try {
        const req = {
            headers: {
                authorization: `Bearer ${authToken?.value}`,
            },
        };
        const userID = await passage.authenticateRequest(req);

        if (userID) {
            const {email, phone} = await passage.user.get(userID);
            const identifier = email ? email : phone;
            return {isAuthorized: true, userID: identifier};
        }
    } catch (error) {
        // authentication failed
    }
    return {isAuthorized: false, userID: ''};
}
