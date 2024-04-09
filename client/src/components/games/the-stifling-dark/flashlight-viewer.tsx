import { RefObject, createRef, useEffect, useRef, useState } from 'react';
import { MousePos } from '../../../models/mouse-pos';

export const FlashlightViewer = () => {
	const mousePos = useState<MousePos>({ x: 0, y: 0 });

	const flashlightViewerRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (flashlightViewerRef.current) {
			flashlightViewerRef.current.addEventListener(
				'mousemove',
				({ offsetX, offsetY, target }) => {
					//@ts-ignore
					const x = offsetX / target.clientWidth;
					//@ts-ignore
					const y = offsetY / target.clientHeight;
					//@ts-ignore
					target.style.setProperty('--x', `${x * 100}%`);
					//@ts-ignore
					target.style.setProperty('--y', `${y * 100}%`);
				}
			);
		}
	}, [flashlightViewerRef.current]);

	return (
		<div>
			<h2>Illuminate the Darkness</h2>
			<p>
				Use your flashlights to find hidden evidence and items on the map. If
				you're lucky, you'll even find the Adversary
			</p>
			<div className='flashlight-viewer' ref={flashlightViewerRef}></div>
		</div>
	);
};
