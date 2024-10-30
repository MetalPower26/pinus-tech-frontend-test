'use client';
import React, { useState } from 'react';
import CustomInput from '../general/CustomInput';
import Link from 'next/link';
import { API_ENDPOINT } from '@/utils/constants';
import { redirect } from 'next/navigation';

const SignUpForm: React.FC = (): React.ReactElement => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const postSignUpData = () => {
        const url = `${API_ENDPOINT}/api/auth/register`;
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
                redirect('/');
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setShowErrorMessage(true);
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-y-2">
                <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
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
                    <input
                        className="text-black border-[1px] border-black cursor-pointer"
                        type="submit"
                        value="Sign Up"
                        disabled={loading}
                    />
                </form>
            </div>
            <p className="text-black">
                Already have an account? Sign in{' '}
                <Link
                    href="/"
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

export default SignUpForm;
