
const SIGN_UP_AUTH_FLOW_USER_KEY = "SIGN_UP_AUTH_FLOW_USER";

export class AmplifyUtils {
    static setSignUpAuthFlowUser(email: string) {
        localStorage.setItem(SIGN_UP_AUTH_FLOW_USER_KEY, email);
    }
    static getSignUpAuthFlowUser() {
        return localStorage.getItem(SIGN_UP_AUTH_FLOW_USER_KEY);
    }

    static clearSignUpAuthFlowUser() {
        localStorage.removeItem(SIGN_UP_AUTH_FLOW_USER_KEY);
    }
}