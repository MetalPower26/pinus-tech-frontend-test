import React from 'react';

interface CustomInputProps {
    setState: React.Dispatch<React.SetStateAction<string>>;
    label: string;
    value: string;
    type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    setState,
    label,
    value,
    type = '',
}): React.ReactElement => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setState(event.target.value);
    };

    return (
        <div className="flex justify-between">
            <label className="text-black">{label}</label>
            <input
                className="border-[1px] border-black text-black"
                name={label}
                type={type}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default CustomInput;
