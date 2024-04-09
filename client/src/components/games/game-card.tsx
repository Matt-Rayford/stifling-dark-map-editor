import { Link } from 'react-router-dom';

export interface GameInfo {
	description: string;
	href: string;
	imageAlt: string;
	imageUrl: string;
	title: string;
}

export const GameCard = ({
	description,
	href,
	imageAlt,
	imageUrl,
	title,
}: GameInfo) => {
	return (
		<Link
			className='link-underline link-underline-opacity-0 card game-card'
			to={href}
		>
			<img className='card-img-top' src={imageUrl} alt={imageAlt} />
			<div className='card-body'>
				<h5 className='card-title'>{title}</h5>
				<p className='card-text'>{description}</p>
				<p style={{ margin: 0 }}>Learn More</p>
			</div>
		</Link>
	);
};
