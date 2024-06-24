import { SignInPage, SignUpPage } from "@/pages"
import { ConfirmEmailPage } from "@/pages/authentication/confirm-email"
import { HomePage } from "@/pages/home/home"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const RouterProvider = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/sign-in"
                    element={<SignInPage />}
                />
                <Route
                    path="/sign-up"
                    element={<SignUpPage />}
                />
                <Route
                    path="/confirm-email"
                    element={<ConfirmEmailPage />}
                />
                <Route
                    path="/"
                    element={<HomePage />}
                >
                </Route>
            </Routes>
        </BrowserRouter>
    )
}