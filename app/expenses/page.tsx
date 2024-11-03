'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PinusHeader from '../components/expenses/PinusHeader';
import ExpensesContent from '../components/expenses/ExpensesContent';

const ExpensesPage = () => {
    const router = useRouter();
    const [authenticationLoading, setAuthenticationLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            router.push('/');
        } else {
            setAuthenticationLoading(false);
        }
    }, [router]);
    if (!authenticationLoading) {
        return (
            <div className="bg-white min-h-screen w-full">
                <div className="pb-4">
                    <div className=" w-full flex flex-col items-center">
                        <PinusHeader />
                        <ExpensesContent />
                    </div>
                </div>
                <footer className="fixed bottom-0 w-full bg-yellow-500 text-center p-1 text-black font-bold">
                    Copyright © 2024. All rights reserved.
                </footer>
            </div>
        );
    } else {
        return <div className="bg-white min-h-screen"></div>;
    }
};

export default ExpensesPage;
