import React from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { signInSchema } from '~/lib/schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Link } from 'react-router';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Loader2 } from "lucide-react";

type SigninFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<SigninFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleOnSubmit = (values: SigninFormData) => {
        console.log(values)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
            <Card className="max-w-md w-full shadow-xl">
                <CardHeader className="text-center mb-5">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider  {...form}>
                        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            {...field}
                                        />
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-blue-600"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 mr-2" /> : "Sign in"}
                            </Button>
                        </form>
                    </FormProvider >

                    <CardFooter className="flex items-center justify-center mt-6">
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                                Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
                            </p>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn