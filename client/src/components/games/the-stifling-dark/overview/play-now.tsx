export const PlayNow = () => {
	return (
		<div className='content-container'>
			<h2>Play Now Online</h2>
			<p>
				You can play The Stifling Dark online for free! It is available on both
				Tabletop Simulator and Tabletop Playground
			</p>
			<div className='play-now-images'>
				<a
					href='https://steamcommunity.com/sharedfiles/filedetails/?id=2269899954'
					target='_blank'
				>
					<img
						className='tsd-glow'
						src='/images/third-party/tabletop-simulator.png'
						alt='Tabletop Simulator Logo'
						width='90%'
						loading="lazy"
					/>
				</a>
				<a
					href='https://mod.io/g/tabletopplayground/m/the-stifling-dark'
					target='_blank'
				>
					<img
						className='tsd-glow'
						src='/images/third-party/tabletop-playground.png'
						alt='Tabletop Playground Logo'
						width='90%'
						loading="lazy"
					/>
				</a>
			</div>
		</div>
	);
};
