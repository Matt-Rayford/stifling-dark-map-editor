import { Link } from 'react-router-dom';
import { GameCard, GameInfo } from './game-card';

const gamesList: GameInfo[] = [
	{
		title: 'The Stifling Dark',
		description:
			'Enter the terrifying realm of The Stifling Dark: a one-vs-many hidden movement game with flashlights.',
		href: '/games/the-stifling-dark',
		imageUrl: '/images/games/the-stifling-dark/box-cover.png',
		imageAlt: 'The Stifling Dark Box Art',
	},
	{
		title: 'Sprocketforge',
		description:
			'The artificers of Sprocketforge need a new court artifcer. Build your machine in this mana-producing engine builder.',
		href: '/games/sprocketforge-cover',
		imageUrl: '/images/games/sprocketforge/box-cover.png',
		imageAlt: 'Sprocketforge Box Art',
	},
];

export const OurGames = () => {
	return (
		<div className='content-container'>
			<h1>Our Games</h1>

			<div className='games-list'>
				{gamesList.map((game) => (
					<GameCard
						key={game.title}
						title={game.title}
						description={game.description}
						href={game.href}
						imageUrl={game.imageUrl}
						imageAlt={game.imageAlt}
					/>
				))}
			</div>
		</div>
	);
};
