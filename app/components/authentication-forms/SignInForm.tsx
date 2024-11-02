'use client';
import React, { useState } from 'react';
import CustomInput from '../general/CustomInput';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const SignInForm: React.FC = (): React.ReactElement => {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const router = useRouter();

    const postSignInData = () => {
        const url = `${API_BASE_URL}/api/auth/login`;
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
            .then((data) => {
                setLoading(false);
                sessionStorage.setItem('token', data['token']);
                router.push('/expenses');
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setShowErrorMessage(true);
                setLoading(false);
            });
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>
                <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleSubmit}>
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
                    <button
                        className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link className="text-blue-500 hover:underline" href="/signup">
                        Sign up here
                    </Link>
                </p>
                {showErrorMessage && (
                    <div className="mt-4 text-sm text-center text-white bg-red-500 rounded p-2">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignInForm;
