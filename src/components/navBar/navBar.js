import React from 'react';
import {NavLink} from 'react-router-dom';
import './navBar.css';
import {useState, useEffect} from 'react';

function NavBar() {
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			document.body.classList.toggle('no-scroll', expanded);
			console.log(document.body.classList);
		};

		handleResize();
	}, [expanded]);

	function handleExpand() {
		setExpanded(true);
	}

	function handleCollapse() {
		setExpanded(false);
	}

	return (
		<div className='navContainer'>
			<nav className={`nav ${expanded ? 'expanded' : ''}`}>
				<div className='navItem'>
					<NavLink
						to='/'
						exact
						activeClassName='active-tab'
						onClick={handleCollapse}
					>
						Home Page
					</NavLink>
				</div>
				<div className='navItem'>
					<NavLink
						to='/dog-fact'
						activeClassName='active-tab'
						onClick={handleExpand}
					>
						Dog Fact
					</NavLink>
				</div>
				<div className='navItem'>
					<NavLink
						to='/airbnb'
						activeClassName='active-tab'
						onClick={handleExpand}
					>
						Airbnb
					</NavLink>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
