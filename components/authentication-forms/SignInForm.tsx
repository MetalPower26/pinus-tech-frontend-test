'use client';
import React, { useState } from 'react';
import CustomInput from '../general/CustomInput';
import Link from 'next/link';
import { API_ENDPOINT } from '@/utils/constants';

const SignInForm: React.FC = (): React.ReactElement => {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const postSignInData = () => {
        const url = `${API_ENDPOINT}/api/auth/login`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailOrUsername: emailOrUsername,
                password: password,
            }),
        }).then((resp) => {
            if (resp.status === 400) {
                return resp.json().then((err) => {
                    return Promise.reject(new Error(err.message));
                });
            }
            return resp.json();
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowErrorMessage(false);
        setLoading(true);
        postSignInData()
            .then(() => {
                setLoading(false);
                alert('You have successfully logged in!');
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setShowErrorMessage(true);
                setLoading(false);
            });
    };
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-y-2">
                <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
                    <CustomInput
                        setState={setEmailOrUsername}
                        label="Email/Username"
                        value={emailOrUsername}
                    />
                    <CustomInput
                        setState={setPassword}
                        label="Password"
                        value={password}
                        type="password"
                    />
                    <input
                        className="text-black border-[1px] border-black cursor-pointer"
                        type="submit"
                        value="Sign In"
                        disabled={loading}
                    />
                </form>
            </div>
            <p className="text-black">
                Don&apos;t have an account? Sign up{' '}
                <Link
                    href="/signup"
                    className="text-blue-700 underline cursor-pointer">
                    here
                </Link>
                .
            </p>
            {showErrorMessage ? (
                <span className="bg-red-500">{errorMessage}</span>
            ) : null}
        </div>
    );
};

export default SignInForm;
