import React from 'react';

interface ExpensesInputProps {
    setState: any;
    label: string;
    value: string | number;
    type?: string;
}

const ExpensesInput: React.FC<ExpensesInputProps> = ({
    setState,
    label,
    value,
    type = '',
}): React.ReactElement => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newValue =
            type === 'number' ? Number(event.target.value) : event.target.value;
        setState(event.target.value);
    };

    return (
        <div className="flex flex-col">
            <label className="text-black font-bold">{label}</label>
            <input
                className="border-[1px] border-[#00000050] p-1 rounded-lg text-black"
                name={label}
                type={type}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default ExpensesInput;
