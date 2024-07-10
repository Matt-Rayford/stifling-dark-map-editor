import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const ButcherVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'the-butcher') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='tsd-green-wrapper' ref={ref}>
			<div className='content-container'>
				<h2>The Butcher</h2>
				<div className='flex flex-wrap gap-1'>
					<iframe
						width='560'
						height='315'
						src='https://www.youtube.com/embed/CgiW8O7W_b0?si=LBf8ANQ5ttsqHyFw'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	);
};
