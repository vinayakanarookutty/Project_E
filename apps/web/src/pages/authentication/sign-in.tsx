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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/spinner";
import { AuthLayout } from "@/layouts/auth-layout";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "aws-amplify/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignInPage() {
  const form = useForm<SignUpForm>();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: async (data: SignUpForm) => {
      const res = await signIn({
        username: data.email,
        password: data.password,
      });
      return res;
    },
    onSuccess: (res) => {
      if (res.isSignedIn) {
        navigate("/");
      }
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    await signInMutation.mutateAsync(data);
  };

  return (
    <AuthLayout>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Enter your information to Sign In</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
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
                      <Input
                        placeholder="password"
                        {...field}
                        className="w-80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {signInMutation.isPending ? (
                  <LoadingSpinner className="text-white" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </AuthLayout>
  );
}
