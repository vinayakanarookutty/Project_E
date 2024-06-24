import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {
    InputOTP, InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { AuthLayout } from "@/layouts/auth-layout";
import { AmplifyUtils } from "@/lib/amplify/utils";
import { confirmSignUp } from "aws-amplify/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ConfirmEmailForm = {
    confirmationCode: string;
};

export const ConfirmEmailPage = () => {
    const form = useForm<ConfirmEmailForm>();
    const navigate = useNavigate();
    const onSubmit = async (data: ConfirmEmailForm) => {
        const email = AmplifyUtils.getSignUpAuthFlowUser();
        if (!email) {
            return;
        }
        const res = await confirmSignUp({
            confirmationCode: data.confirmationCode,
            username: email,
        });
        if (res.isSignUpComplete) {
            AmplifyUtils.clearSignUpAuthFlowUser();
            navigate("/sign-in")
        }
    };
    return (
        <AuthLayout>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="mx-auto max-w-sm py-4">
                        <CardHeader>
                            <CardTitle className="text-xl">Confirm Email</CardTitle>
                            <CardDescription>
                                Enter the confirmation code sent to your email
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="confirmationCode"
                                render={({ field }) => (
                                    <FormItem className="w-80">
                                        <FormControl className="w-full">
                                        <InputOTP maxLength={6} {...field} className="rounded-none">
                                            <InputOTPGroup {...field}>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Confirm
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </AuthLayout>
    );
};
