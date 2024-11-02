import TextField from '@mui/material/TextField';
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
        <div className="flex justify-between p-1">
            <label className="text-black font-bold mx-3 my-auto">{label}</label>
            <TextField className="border-[1px] border-black text-black mx-3"
             name={label} type={type} value={value} onChange={handleChange} 
             variant="outlined" size="small" />
        </div>
    );
};

export default CustomInput;
