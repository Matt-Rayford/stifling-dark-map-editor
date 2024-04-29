import { OurGames } from './games/our-games';

export const Home = () => {
	return (
		<div className='content-container v-stack gap-2'>
			<h1>Sophisticated Cerberus Games</h1>

			<div className='v-stack gap-1'>
				<h2>Our Games</h2>
				<OurGames />
			</div>

			<h2>Tools</h2>
		</div>
	);
};
