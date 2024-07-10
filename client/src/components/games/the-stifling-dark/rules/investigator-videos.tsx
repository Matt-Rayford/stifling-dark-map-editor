import { useEffect, useRef } from 'react';
import { VideoProps } from './video-props';

export const InvestigatorVideos = ({ section }: VideoProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (section === 'investigator') {
			ref.current?.scrollIntoView();
		}
	}, [section]);

	return (
		<div className='content-container' ref={ref}>
			<h2>Investigator Turn</h2>
			<div className='flex flex-wrap gap-1'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/Ddc-bJJrJxk?si=ATu6u9wbXDM-ABEG'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
					loading="lazy"
				/>

				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/OYQQuG5bA9w?si=0Mp2v03edBILfsCe'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
					loading="lazy"
				/>

				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/RUV0szjO7_k?si=3GxfIvQapU5SynZO'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
					loading="lazy"
				/>

				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/ixyzB6BkRyI?si=WzsjWRZGJvdFv9tI'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
					loading="lazy"
				/>

				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/mR0EGOAa0Pk?si=Ufz5nFmFeng-63Op'
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
