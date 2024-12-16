'use client'
import React, { Suspense, useEffect, useState } from 'react';
import AuthHeader from '../header';
import ResetPasswordForm from '@/screens/Auth/reset-password';
import { useSearchParams } from 'next/navigation';
import { useResetVerifyQuery } from '@/api-queries/auth/auth-queries';
import ExpiredLink from '@/screens/Auth/expired-link';

function AdminResetLink() {
    const searchParams = useSearchParams();
    const userEmail = searchParams.get('email');
    const paramToken = searchParams.get('token');
    const { mutateAsync: verify_link, isSuccess } = useResetVerifyQuery();
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyToken = async () => {
            if (paramToken) {
                try {
                    await verify_link({ token: paramToken });
                    setIsValid(true);
                } catch (error) {
                    setIsValid(false);
                }
            } else {
                setIsValid(false);
            }
        };
        verifyToken();
    }, [paramToken, verify_link]);


    if (isValid === null) {
        return <div>Loading...</div>; // Show a loading indicator while verifying
    }

    return (
        <>
            {!isValid ? (
                <ExpiredLink />
            ) : (
                <>
                    <AuthHeader
                        mainHead="Welcome !"
                        userEmail={userEmail}
                        discription={`Create a strong password, a combo of\nuppercase letters, lowercase letters, numbers, and\neven some special characters (!, @, $, %, ^, &, *, +, #)`} />
                    <ResetPasswordForm paramToken={paramToken} inviteLink={true} />
                </>
            )}
        </>
    );
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminResetLink />
        </Suspense>
    );
}
