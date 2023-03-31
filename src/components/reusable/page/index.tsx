import React, { ReactNode } from "react";
import { Navbar, Footer } from "components/navigation";
import './index.scss';

interface PageProps {
    children: ReactNode;
    isPublic?: boolean;
    fitContent?: boolean;
} 

const Page = ({ isPublic, fitContent, children }: PageProps) => {

    return(
        <div className="page_layout">
            <Navbar />
            <div className={`contents ${fitContent ? 'fitContent' : ''}`}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Page;