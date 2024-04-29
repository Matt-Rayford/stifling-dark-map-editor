import { Link } from 'react-router-dom';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export const NavBar = () => {
	const { isSignedIn } = useUser();

	return (
		<nav
			className='navbar navbar-expand-lg navbar-dark bg-dark px-2'
			style={{ zIndex: 100 }}
		>
			<Link className='navbar-brand nav-logo' to='/'>
				<img
					src='/images/logo/logo-white.png'
					alt='Company Logo'
					width='40'
					height='40'
				/>
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
					{/*
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
				*/}
					<Link className='nav-item nav-link' to='/games'>
						Games
					</Link>
				</div>
			</div>
			{!isSignedIn && (
				<SignInButton>
					<button className='btn btn-primary'>Log in</button>
				</SignInButton>
			)}
			{isSignedIn && <UserButton />}
		</nav>
	);
};
