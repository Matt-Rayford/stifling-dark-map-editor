import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const MapFeaturesVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'map-features') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='content-container' ref={ref}>
			<h2>Map Features</h2>
			<div className='flex flex-wrap gap-1'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/Fmznho5oUCg?si=0twDYH__IpXNf3Sv'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
					loading="lazy"
				/>
			</div>
		</div>
	);
};
