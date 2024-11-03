'use client';
import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import OuterWrapper from './OuterWrapper';
import { API_BASE_URL } from '@/utils/constants';
import ExpenseComponent from './ExpenseComponent';
import AddExpensesModal from './AddExpensesModal';
import { useRouter } from 'next/navigation';

export interface Expense {
    _id: string;
    title: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    userId: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Contains the Total amount of money, Add Expense button and ExpenseComponents
 * @returns ExpensesContent component
 */
const ExpensesContent = () => {
    const [filter, setFilter] = useState<string>('');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    const options = [
        { value: '', label: 'All' },
        { value: 'Grocery', label: 'Grocery' },
        { value: 'Rent', label: 'Rent' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Health', label: 'Health' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Education', label: 'Education' },
        { value: 'Miscellaneous', label: 'Miscellaneous' },
    ];

    const handleChangeFilter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFilter(event.target.value);
    };

    const getExpenses = () => {
        const url = `${API_BASE_URL}/api/expenses`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then((resp) => {
                if (resp.status === 401) {
                    sessionStorage.removeItem('token');
                    router.push('/');
                }
                return resp.json();
            })
            .then((data) => {
                setExpenses(data);
            });
    };

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <>
            {open ? (
                <AddExpensesModal setOpen={setOpen} setExpenses={setExpenses} />
            ) : null}
            <OuterWrapper color="bg-blue-900">
                <ContentWrapper>
                    <div className="flex justify-between items-center text-white">
                        <div>
                            <p>Total</p>
                            <p>$1000</p>
                        </div>
                        <button
                            className="border-[1px] border-white p-1"
                            onClick={() => setOpen(true)}>
                            + Add expenses
                        </button>
                    </div>
                </ContentWrapper>
            </OuterWrapper>
            <OuterWrapper>
                <ContentWrapper>
                    <div className="w-full flex justify-between">
                        <div>Expense List</div>
                        <div>
                            Filter by category:{' '}
                            <select
                                name="filter"
                                value={filter}
                                onChange={handleChangeFilter}
                                className="border-[1px] border-black text-sm">
                                {options.map((opt) => (
                                    <option value={opt.value} key={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </ContentWrapper>
            </OuterWrapper>
            <OuterWrapper>
                <ContentWrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {expenses.length > 0
                            ? expenses.map((exp, index) => (
                                <ExpenseComponent
                                    key={exp.createdAt}
                                    id={index + 1}
                                    expense={exp}
                                    setExpenses={setExpenses}
                                />
                            ))
                            : null}
                    </div>
                </ContentWrapper>
            </OuterWrapper>
        </>
    );
};

export default ExpensesContent;
