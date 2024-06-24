import { Amplify } from "aws-amplify"
import App from "./App"
import { ReactQueryProvider } from "./components/providers/react-query"

const {
    VITE_COGNITO_USER_POOL_ID,
    VITE_COGNITO_APP_CLIENT_ID
} = import.meta.env

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolClientId: VITE_COGNITO_APP_CLIENT_ID,
            userPoolId: VITE_COGNITO_USER_POOL_ID
        }
    }
})

export const RootPage = () => {
    return(
        <ReactQueryProvider>
            <App />
        </ReactQueryProvider>
    )
}