'use client';
import React, { useState } from 'react';
import CustomInput from '../general/CustomInput';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const SignUpForm: React.FC = (): React.ReactElement => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const postSignUpData = () => {
        const url = `${API_BASE_URL}/api/auth/register`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({
                name: name,
                email: email,
                username: username,
                password: password,
            }), // Convert data to JSON string
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
        postSignUpData()
            .then(() => {
                setLoading(false);
                router.push('/');
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
                <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
                <form className="flex flex-col gap-y-4 mt-6" onSubmit={handleSubmit}>
                    <CustomInput setState={setName} label="Name" value={name} />
                    <CustomInput
                        setState={setEmail}
                        label="Email"
                        value={email}
                    />
                    <CustomInput
                        setState={setUsername}
                        label="Username"
                        value={username}
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
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link className="text-blue-500 hover:underline" href="/">
                        Sign in here
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

export default SignUpForm;
