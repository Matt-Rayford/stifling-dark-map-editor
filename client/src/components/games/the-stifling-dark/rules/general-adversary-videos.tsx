import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const GeneralAdversaryVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'general-adversary') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='tsd-green-wrapper' ref={ref}>
			<div className='content-container'>
				<h2>General Adversary Rules</h2>
				<div className='flex flex-wrap gap-1'>
					<iframe
						width='560'
						height='315'
						src='https://www.youtube.com/embed/DJj_iNXNrPc?si=5tAI9w75xHZXZwQC'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
					/>

					<iframe
						width='560'
						height='315'
						src='https://www.youtube.com/embed/N6LYyeTL0_Y?si=6XcBSpxrCwd-Jz4U'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						referrerPolicy='strict-origin-when-cross-origin'
						allowFullScreen
					/>
				</div>
			</div>
		</div>
	);
};
