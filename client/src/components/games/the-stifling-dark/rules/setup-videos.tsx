import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const SetupVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'setup') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='tsd-green-wrapper' ref={ref}>
			<div className='content-container'>
				<h2>Setup</h2>
				<div className='flex flex-wrap gap-1'>
					<iframe
						width='560'
						height='315'
						src='https://www.youtube.com/embed/BMmepI29aBE?si=0UOMGgYHShjNismu'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
						loading="lazy"
					/>

					<iframe
						width='560'
						height='315'
						src='https://www.youtube.com/embed/ELOUoSTFrRE?si=zBmpwsS0g4V4pQPa'
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
