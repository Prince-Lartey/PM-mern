import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import type { z } from 'zod';
import { resetPasswordSchema } from '~/lib/schema';

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [isSuccess, setIsSuccess] = useState(false);
    //   const { mutate: resetPassword, isPending } = useResetPasswordMutation();

    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: ResetPasswordFormData) => {
        console.log(values)
    }

    return (
        <div>verify-password</div>
    )
}

export default ResetPassword