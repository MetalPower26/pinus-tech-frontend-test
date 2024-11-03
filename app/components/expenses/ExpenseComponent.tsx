import { API_BASE_URL } from '@/utils/constants';
import { Expense } from './ExpensesContent';

const ExpenseComponent = ({
    id,
    expense,
    setExpenses,
}: {
    id: number;
    expense: Expense;
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}) => {
    const convertDate = (isoDateString: string) => {
        const date = new Date(isoDateString);

        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    };

    const deleteExpense = () => {
        const url = `${API_BASE_URL}/api/expenses/${expense._id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setExpenses((prevExpenses) =>
                    prevExpenses.filter((exp) => exp._id !== expense._id)
                );
            });
    };

    // const updateExpense = () => {
    //     const url = `${API_BASE_URL}/api/expenses/${expense._id}`;
    //     fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    //         },
    //         body: JSON.stringify({
    //             title: expense.title,
    //             description: expense.description,
    //             amount: expense.amount,
    //             category: expense.category,
    //         }),
    //     }).then((resp) => {
    //         return resp.json();
    //     });
    // };

    return (
        <div className="border border-gray-300 rounded-xl p-6 m-3 hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between items-center mb-2 text-gray-600">
                <div className="text-sm font-medium">
                    #{id} | {convertDate(expense?.date)}
                </div>
                <div className="text-sm font-semibold text-blue-800">{expense.category}</div>
            </div>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-lg font-semibold text-gray-900">{expense?.title}</p>
                    <p className="text-sm text-gray-600">{expense?.description}</p>
                </div>
                <div className="text-lg font-bold text-green-600">S$ {expense?.amount}</div>
            </div>
            <div className="flex gap-x-2 justify-end">
                {/* Uncomment if needed */}
                {/* <button className="border border-gray-400 rounded-lg px-3 py-1 text-sm hover:bg-gray-100 transition">Edit</button> */}
                <button
                    className="border border-red-500 text-red-500 rounded-lg px-3 py-1 text-sm hover:bg-red-50 transition"
                    onClick={deleteExpense}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ExpenseComponent;
