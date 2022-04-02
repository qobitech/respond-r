import React, { FC } from 'react';
import Tooltip from 'utils/tooltip';

interface ICProps {
    title : string,
    icon: string,
    isShow : boolean,
    hasChildren?: boolean;
}

export const IconComponent: FC<ICProps> = ( props ) => {

    const { title, icon, isShow, hasChildren } = props

    return(
        <div>
        {isShow ?
            <Tooltip content={<p>{title}</p>} direction="right">
                <div className="icon">
                    <i className={icon}></i>
                    {hasChildren && <i className="indicator fa fa-angle-right"/>}
                </div>
            </Tooltip>
            :
            <div className="icon">
                <i className={icon}></i>
            </div>
        }
        </div>
    )
};