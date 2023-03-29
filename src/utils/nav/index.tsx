import React, { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IMenuData, ISubMenuData } from '../../interfaces/IMenu';

interface INavC {
    children: ReactNode;
	item: IMenuData;
}

export const NavComponent = (props: INavC) => {
	const { item } = props;
	const location = useLocation();

	const checkActive = (itemUrl: string) => {
		let isUrl = false;
		const url = location && location.pathname;
		if (url === itemUrl) {
			isUrl = true;
		}
		return isUrl;
	};

	return (
		<NavLink
			to={item.url}
			className={({ isActive }) =>
				isActive && checkActive(item.url) ? 'menu-item-container main-active' : 'menu-item-container'
			}
		>
			{props.children}
		</NavLink>
	);
};
interface INavParent {
    children: ReactNode | ((props: { isActive: boolean; }) => ReactNode);
	item: IMenuData;
	setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
	isClicked: boolean;
}
export const NavIsParentComponent = (props: INavParent) => {
	const { item, setIsClicked, isClicked } = props;
	const location = useLocation();

	const checkActive = (itemUrl: string) => {
		let isUrl = false;
		const url = location && location.pathname;
		if (url === itemUrl) {
			isUrl = true;
		}
		return isUrl;
	};

	const checkPActive = (itemSubUrls: Array<string>) => {
		let isUrl = false;
		const url = location && location.pathname;
		if (Array.isArray(itemSubUrls)) {
			for (let i = 0; i < itemSubUrls.length; i++) {
				if (url === itemSubUrls[i] || url.includes(itemSubUrls[i])) {
					isUrl = true;
				}
			}
		}
		return isUrl;
	};

	return (
		<NavLink
			to={item.url}
			className={({ isActive }) =>
				(isActive && checkActive(item.url)) || (isActive && checkPActive(item.suburls || []))
					? 'menu-item-container main-active'
					: 'menu-item-container'
			}
			onClick={e => {
				e.preventDefault();
				setIsClicked(!isClicked);
			}}
		>
			{props.children}
		</NavLink>
	);
};

interface ISubMenu {
    children: ReactNode;
	subItem: ISubMenuData;
	isLast: boolean;
}
export const NavSubComponent = (props: ISubMenu) => {
	const { subItem, isLast } = props;
	const location = useLocation();

	const checkActive = (itemUrl: string) => {
		let isUrl = false;
		const url = location && location.pathname;
		if (url === itemUrl) {
			isUrl = true;
		}
		return isUrl;
	};

	return (
		<NavLink
			to={subItem.url}
			className={({ isActive }) =>
				isActive && checkActive(subItem.url)
					? `menu-subitem ${isLast && 'last'} sub-active`
					: `menu-subitem ${isLast && 'last'}`
			}
		>
			{props.children}
		</NavLink>
	);
};
