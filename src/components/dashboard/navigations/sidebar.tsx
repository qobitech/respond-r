import React, { FC, useState, useEffect } from 'react';
import { MenuData, SubMenuData, IMenuData } from './menudata';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { IAppState } from "interfaces/IAppState";
import { IAuth } from 'interfaces/IAuth';
import { logOut } from 'store/actions';
import { IconComponent } from './icon-component';
import './sidebar.scss';

interface IStateProps {
    auth: IAuth;
};

interface IDispatchProps {
    logOut : () => void;
};

interface IProps extends IStateProps, IDispatchProps {
    hamburgerClicked: boolean;
    setHamburgerClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar:FC<IProps> = (props) => {
    const { hamburgerClicked = false, setHamburgerClicked, logOut } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const onSideMenuClick = (url: string, title: string) => {
        setHamburgerClicked(false);
        navigate(url, {state: {pageName: title!}})
    };
    const [showSubMenu, setShowSubMenu] = useState<{id: number, show:boolean}>({id: 0, show: false});

    const handleSideMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent> , id: number, hasChildren: boolean, url: string, title: string ) => {
        if(!hasChildren){
            onSideMenuClick(url, title)
            setShowSubMenu({id: 0, show: false})
        }else{
            setHamburgerClicked(true)
            if(showSubMenu.id === id){
                if(showSubMenu!?.show)
                    setShowSubMenu({id, show: false})
                else
                    setShowSubMenu({id, show: true})
            }else{
                setShowSubMenu({id, show: true})
            }
        }
    };   

    const isChildActive = (item: IMenuData) => {
        if( Array.isArray( item!?.subUrls ) ){
            for(let i = 0; i < item!?.subUrls.length; i++){
                if( location.pathname === item.subUrls[i] || location.pathname.includes( item.subUrls[i] ) ){
                    return true
                }
            }
        }
        return false
    };

    useEffect(() => {
        if(hamburgerClicked){
            setShowSubMenu({id: showSubMenu!?.id, show: true})
        }
        // return(() => {
        //     setShowSubMenu({id: showSubMenu!?.id, show: false})
        // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hamburgerClicked])

    return(
        <div className={hamburgerClicked ? 'side-bar expanded' : 'side-bar'}>
            <div className='side-menu-container'>
                {
                    MenuData!?.map(m => {
                        const { id = 0, title = '', icon = '', url = '', hasChildren = false, view = true } = m || {};
                        return(
                            view &&
                            <div key={id}>
                                <div className={(location.pathname === url || isChildActive(m)) ? 'side-menu active' : 'side-menu'} onClick={(e) => {handleSideMenu(e, id, hasChildren, url, title)}}>

                                    <IconComponent title={title} icon={icon} isShow={!hamburgerClicked} hasChildren={hasChildren} />
                                    <div className="title" style={{display: hamburgerClicked ? "block" : "none"}}>
                                        <p>
                                            {title}
                                            {hasChildren && 
                                                <i className={(showSubMenu!?.show && id === showSubMenu!?.id ) ? "fa fa-angle-down" : "fa fa-angle-right"} >
                                                </i>
                                            }
                                        </p>
                                    </div>
                                </div>
                                {showSubMenu!?.id === id && showSubMenu!?.show && hamburgerClicked &&
                                    <>
                                        {hasChildren &&
                                                SubMenuData!?.filter(sub => sub!?.parentId === id)
                                                .map(sub => {
                                                    const { url = '', title = '', view = true, id = 0 } = sub || {};
                                                    return(
                                                        view &&
                                                        <div onClick={() => {onSideMenuClick(url, title); }}
                                                            className={location.pathname === url ? 'sub-menu-area active' : 'sub-menu-area'} key={id} 
                                                        >
                                                            <p className='sub-menu'>
                                                                    {title}
                                                            </p>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </>
                                }
                            </div>
                        )
                    })
                }
                <div className="side-menu logout" onClick={() => logOut()}>
                    <div className="icon">
                        <i className='fa fa-sign-out-alt'></i>
                    </div>
                    <div className="title" style={{display: hamburgerClicked ? "block" : "none"}}>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: IAppState): IStateProps => ({
    auth: state.auth,
});

const mapDispatchToProps: IDispatchProps = {
    logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

// (hamburgerClicked ? (!showSubMenu!?.show && isChildActive(m)) : isChildActive(m) )