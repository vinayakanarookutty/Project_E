import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthLayout } from "@/layouts/auth-layout"
import { useForm } from "react-hook-form"
import { signUp } from "aws-amplify/auth"
import { AmplifyUtils } from "@/lib/amplify/utils"

type SignUpForm = {
    email: string
    password: string
}

export function SignUpPage() {
    const form = useForm<SignUpForm>()
    const navigate = useNavigate()
    const onSubmit = async (data: SignUpForm) => {
        // Save the email to local storage to use in the confirm email page
        AmplifyUtils.setSignUpAuthFlowUser(data.email)

        const res = await signUp({
            username: data.email,
            password: data.password
        })

        if (res.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
            navigate("/confirm-email")
        }
    }

    return (
        <AuthLayout>
            <Card className="mx-auto max-w-sm py-4">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your email to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} className="w-80" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="password" {...field} className="w-80" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full mt-4">
                                Create an account
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="#" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    )
}
