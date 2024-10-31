import React, { ReactNode } from 'react';

const ContentWrapper = ({ children }: { children: ReactNode }) => {
    return <div className="w-full max-w-screen-lg mx-auto">{children}</div>;
};

export default ContentWrapper;
