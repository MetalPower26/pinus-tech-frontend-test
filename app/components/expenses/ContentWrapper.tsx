import React, { ReactNode } from 'react';

const ContentWrapper = ({ children }: { children: ReactNode }) => {
    return <div className="w-full max-w-screen-lg mx-auto p-2">{children}</div>;
};

export default ContentWrapper;
