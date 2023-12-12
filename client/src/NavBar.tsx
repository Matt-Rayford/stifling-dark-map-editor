import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const logoutWithRedirect = () =>
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-2'>
			<Link className='navbar-brand' to='/'>
				Map Editor
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNavAltMarkup'
				aria-controls='navbarNavAltMarkup'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
				<div className='navbar-nav'>
					<Link className='nav-item nav-link' to='/'>
						Load Map
					</Link>
					<Link className='nav-item nav-link' to='/maps/new'>
						Create Map
					</Link>
				</div>
			</div>
			{!isAuthenticated && (
				<div className='navbar-nav float-right'>
					<button
						className='btn btn-primary'
						onClick={() => loginWithRedirect()}
					>
						Log in
					</button>
				</div>
			)}
			{isAuthenticated && (
				<div className='navbar-nav float-right'>
					<button
						className='btn btn-primary'
						onClick={() => logoutWithRedirect()}
					>
						Log Out
					</button>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
