import  React from 'react';
import './general.scss';
import LoaderBar from './loader-bar';

interface IDashboardWrapper {
    children: JSX.Element;
    loading: boolean;
}

const DashboardWrapper = (props: IDashboardWrapper) => {

    const { children, loading = true } = props;

    return(
        <div className='dashboard-content'>
            {
                <>
                    {loading && <LoaderBar />}
                    <div className="children">
                        { children }
                    </div>
                </>
            }
        </div>
    )
} 

export default DashboardWrapper;