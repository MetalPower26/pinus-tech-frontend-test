import React, { ReactNode } from 'react';

const OuterWrapper: React.FC<{
    children: ReactNode;
    color?: string;
}> = ({ children, color = 'bg-white' }) => {
    return <div className={`p-2 ${color} w-full`}>{children}</div>;
};

export default OuterWrapper;
