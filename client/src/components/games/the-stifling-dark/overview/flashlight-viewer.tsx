import { createRef, useEffect } from 'react';

export const FlashlightViewer = () => {
	const flashlightViewerRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (flashlightViewerRef.current) {
			flashlightViewerRef.current.addEventListener(
				'mousemove',
				({ offsetX, offsetY, target: eventTarget }) => {
					const target = eventTarget as HTMLDivElement;
					const x = offsetX / target.clientWidth;
					const y = offsetY / target.clientHeight;
					target.style.setProperty('--x', `${x * 100}%`);
					target.style.setProperty('--y', `${y * 100}%`);
				}
			);
		}
	}, [flashlightViewerRef.current]);

	return (
		<div className='content-container'>
			<h2>Illuminate the Darkness</h2>
			<p>
				Use your flashlights to find hidden evidence and items on the map. If
				you're lucky, you'll even reveal the Adversary and force them to
				retreat!
			</p>

			<div className='flashlight-viewer-container'>
				<div className='flashlight-viewer' ref={flashlightViewerRef}></div>
			</div>
		</div>
	);
};
