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

    return (
        <div className="border-2 border-blue-900 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between">
                <div>
                    #{id} | {convertDate(expense?.date)}
                </div>
                <div>{expense.category}</div>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>{expense?.title}</p>
                    <p>{expense?.description}</p>
                </div>
                <div>S$ {expense?.amount}</div>
            </div>
            <div className="flex gap-x-2 justify-end">
                {/* <button className="border-2 border-black px-2">Edit</button> */}
                <button
                    className="border-2 border-black px-2"
                    onClick={deleteExpense}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ExpenseComponent;
