import React from 'react'
import { z } from 'zod';

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required" }), newPassword: z.string().min(8, { message: "New password is required" }),
    confirmPassword: z.string().min(8, { message: "Confirm password is required" }),
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const profileSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    profilePicture: z.string().optional(),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export type ProfileFormData = z.infer<typeof profileSchema>;

const profile = () => {
    
    return (
        <div>profile</div>
    )
}

export default profile