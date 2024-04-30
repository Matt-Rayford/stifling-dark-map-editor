import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const InsatiableHorrorVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'insatiable-horror') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='content-container' ref={ref}>
			<h2>The Insatiable Horror</h2>
			<div className='flex flex-wrap gap-1'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/ydMpB5ry6dw?si=1dyYStbU6JwZV0FO'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
				/>
			</div>
		</div>
	);
};
