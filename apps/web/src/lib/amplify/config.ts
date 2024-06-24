// Amplify configuration

const {
    VITE_COGNITO_USER_POOL_ID,
    VITE_COGNITO_APP_CLIENT_ID
} = import.meta.env

export const authConfig = {
    Auth: {
        Cognito: {
            userPoolClientId: VITE_COGNITO_APP_CLIENT_ID,
            userPoolId: VITE_COGNITO_USER_POOL_ID
        }
    }
}

export const amplifyConfig = {
    ...authConfig
}

