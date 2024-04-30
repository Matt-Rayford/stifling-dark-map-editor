export const CultVideos = () => {
	return (
		<div className='content-container'>
			<h2 id='the-cult'>The Cult</h2>
			<div className='flex flex-wrap gap-1'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/kvgGW6hJWqs?si=dhNbmmXJHBCkLqGz'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
				/>
			</div>
		</div>
	);
};
