import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const SawmillVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'sawmill') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='content-container' ref={ref}>
			<h2>The Sawmill</h2>
			<div className='flex flex-wrap gap-1'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/OqdsK0JLXv0?si=Vz44Am5xrdr2i851'
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
