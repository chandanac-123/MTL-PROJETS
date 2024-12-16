'use client'
import React, { useEffect, useState, Suspense } from 'react';
import AuthHeader from '../header';
import ResetPasswordForm from '@/screens/Auth/reset-password';
import { useResetVerifyQuery } from '@/api-queries/auth/auth-queries';
import { useSearchParams } from 'next/navigation';
import ExpiredLink from '@/screens/Auth/expired-link';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const paramToken = searchParams.get('token');
    const { mutateAsync: verify_link } = useResetVerifyQuery();
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
                        head="Set New Password"
                        discription={`Create a strong password, a combo of\nuppercase letters, lowercase letters, numbers, and\neven some special characters (!, @, $, %, ^, &, *, +, #)`}
                    />
                    <ResetPasswordForm paramToken={paramToken} inviteLink={false}/>
                </>
            )}
        </>
    );
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
