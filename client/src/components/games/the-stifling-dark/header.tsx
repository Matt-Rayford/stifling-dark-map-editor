export const Header = () => {
	const width = 400;
	const height = 400;

	return (
		<div className='tsd-header'>
			<div className='content-container'>
				<a
					className='tsd-box'
					href='https://sophcerb.backerkit.com/hosted_preorders?ref=www.sophisticatedcerberus.com'
					target='_blank'
				>
					<img
						className='tsd-glow'
						width={width}
						height={height}
						src='/images/games/the-stifling-dark/box.png'
						alt='3D image of The Stifling Dark box'
					/>
					<p className='tsd-box-order'>Order Now</p>
				</a>
			</div>
		</div>
	);
};
