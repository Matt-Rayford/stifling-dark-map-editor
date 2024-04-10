import { adversaries } from './adversaries';

export const AdversaryViewer = () => {
	const width = 400;
	const height = 400;

	return (
		<div className='tsd-green-wrapper'>
			<div className='content-container'>
				<h2>The Adversaries</h2>
				<div className='adversary-viewer'>
					{adversaries.map((adversary) => (
						<div key={`${adversary.name}`} style={{ width, height }}>
							<img
								width={width}
								height={height}
								src={adversary.imageSrc}
								alt={`Portrait of ${adversary.name}`}
							/>
							<div className='blur-block' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
