import { Link } from 'react-router-dom';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react';

import { useSdUser } from '../../contexts/user-context';

export const NavBar = () => {
	const { user } = useSdUser();

	return (
		<nav
			className='navbar navbar-expand-lg navbar-dark bg-dark px-2'
			style={{ zIndex: 100 }}
		>
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
					{user && (
						<>
							<Link className='nav-item nav-link' to='/'>
								Load Map
							</Link>
							<Link
								id='create-map'
								className='nav-item nav-link'
								to='/maps/new'
							>
								Create Map
							</Link>
						</>
					)}
					<Link className='nav-item nav-link' to='/games'>
						Games
					</Link>
				</div>
			</div>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</nav>
	);
};
