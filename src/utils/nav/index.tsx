import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { IMenuData, ISubMenuData } from '../../interfaces/IMenu';

interface INavC {
    item: IMenuData;
}
export const NavComponent:FC<INavC> = ( props ) => {

    const { item } = props

    return(
        <NavLink className="menu-item-container"
            to={ item.url }
            activeClassName="main-active"
            isActive={
                (match : any, location : any): boolean => {  
                    let isUrl: boolean = false;
                    let url = location && location.pathname
                    if(url === item.url){
                        isUrl = true;
                    }
                    return isUrl;
                }                      
            }
        exact >
            { props.children }               
        </NavLink>
    )
}

interface INavParent {
    item: IMenuData;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
    isClicked: boolean;
}
export const NavIsParentComponent:FC<INavParent> = ( props ) => {

    const { item, setIsClicked, isClicked } = props

    return(
        <NavLink className="menu-item-container"
                to={ item.url }
                activeClassName="main-active"
                onClick={(e)=>{e.preventDefault(); setIsClicked( !isClicked ); }}
                isActive={
                    (match : any, location : any): boolean => {  
                        let isUrl: boolean = false;
                        let url = location && location.pathname
                        if( Array.isArray( item.suburls ) ){
                            for(let i = 0; i < item.suburls.length; i++){
                                if( url === item.suburls[i] || url.includes( item.suburls[i] ) ){
                                    isUrl = true;
                                }
                            }
                        }
                        return isUrl;
                    }                      
                }
        exact >
            { props.children }               
        </NavLink>
    )
}

interface ISubMenu {
    subItem: ISubMenuData;
    isLast: boolean;
}
export const NavSubComponent:FC<ISubMenu> = ( props ) => {

    const { subItem, isLast } = props

    return(
        <NavLink className={`menu-subitem ${ isLast && "last"}`}
            to={ subItem.url }
            activeClassName="sub-active"
            isActive={
                (match : any, location : any): boolean => {  
                    let isUrl: boolean = false;
                    let url = location && location.pathname
                    if(url === subItem.url){
                        isUrl = true;
                    }
                    return isUrl;
                }                      
            }
        exact >
            { props.children }
        </NavLink>
    )
}