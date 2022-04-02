import React, { useState } from "react";
import { MenuItems } from './menuItems';
import { pageurl } from '../../utils/constants';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from 'extras/images/car_logo.jpg';
import "./navbar.scss";
import { url } from "enums/Route";

interface IProps { }

const Navbar: React.FC<IProps> = (props) => {
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked(!clicked);
	};
	const history = useHistory();

    return (
        <nav className='navbarItems'>
			{clicked && <div className="backdrop" onClick={() => setClicked(false)}></div>}

			<Link to={pageurl.LANDING_PAGE} style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
				<img src={logo} alt='...logo' height='50px' />
				{/* <h2>ITSD</h2> */}
			</Link>

			<div className="menu-icon" onClick={handleClick}>
				<i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
			</div>

			<ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
				{MenuItems.map((item, index) => (
                    <div className='menu-item' key={index} >
                        <i className={item!?.icon}></i>
                        <NavLink key={index} exact to={item.url} activeClassName='nav-current' className={item.cName} 
							onClick={() => window.innerWidth < 758 ? setClicked(!clicked): void(0)}>
                        	{item.title}
                        </NavLink>
                    </div>
				))}
				<button onClick={() => history.push(url.REGISTER) }>Register</button>
			</ul>

        </nav>
    );
};

export default Navbar;