import CloseIcon from '@mui/icons-material/Close';
import ExpensesInput from '../general/ExpensesInput';
import { useState } from 'react';
import { API_ENDPOINT } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { Expense } from './ExpensesContent';

const AddExpensesModal = ({
    setOpen,
    setExpenses,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<string>('Grocery');

    const router = useRouter();

    const categories = [
        { value: 'Grocery', label: 'Grocery' },
        { value: 'Rent', label: 'Rent' },
        { value: 'Utilities', label: 'Utilities' },
        { value: 'Transportation', label: 'Transportation' },
        { value: 'Health', label: 'Health' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Education', label: 'Education' },
        { value: 'Miscellaneous', label: 'Miscellaneous' },
    ];

    const handleChangeCategory = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setCategory(event.target.value);
    };

    const postExpenseData = () => {
        const url = `${API_ENDPOINT}/api/expenses`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                title: title,
                description: description,
                amount: amount,
                date: Date.now(),
                category: category,
            }),
        })
            .then((resp) => {
                if (resp.status === 401) {
                    sessionStorage.removeItem('token');
                    router.push('/');
                }
                return resp.json();
            })
            .then((newData) => {
                console.log(newData);
                setExpenses((prevData) => [newData, ...prevData]);
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postExpenseData().then(() => {
            setOpen(false);
        });
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg w-1/2 text-center text-white">
                <div className="flex justify-between bg-gray-800 rounded-t-lg items-center p-4">
                    <h2 className="text-2xl font-semibold">+ Add Expense</h2>
                    <button onClick={() => setOpen(false)}>
                        <CloseIcon></CloseIcon>
                    </button>
                </div>
                <div>
                    <form
                        className="p-4 text-left flex flex-col gap-y-4"
                        onSubmit={handleSubmit}>
                        <ExpensesInput
                            label="Title:"
                            value={title}
                            setState={setTitle}
                        />
                        <ExpensesInput
                            label="Description:"
                            value={description}
                            setState={setDescription}
                        />
                        <ExpensesInput
                            label="Amount:"
                            type="number"
                            value={amount}
                            setState={setAmount}
                        />
                        <label className="text-black font-bold">
                            Category:
                        </label>
                        <select
                            name="category"
                            value={category}
                            onChange={handleChangeCategory}
                            className="border-[1px] border-[#00000050] p-2 rounded-lg text-black">
                            {categories.map((cat) => {
                                return (
                                    <option value={cat.value} key={cat.value}>
                                        {cat.label}
                                    </option>
                                );
                            })}
                        </select>
                        <input
                            type="submit"
                            className="font-bold bg-gray-700 rounded-lg p-2 cursor-pointer"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExpensesModal;
