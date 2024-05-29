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
						<div
							className='flip-card'
							key={`${adversary.name}`}
							style={{ width, height }}
						>
							<div className='flip-card-inner'>
								<div className='flip-card-front overflow-hide'>
									<img
										width={width}
										height={height}
										src={adversary.imageSrc}
										alt={`Portrait of ${adversary.name}`}
										loading="lazy"
									/>
								</div>
								<div className='flip-card-back bg-dark p-2'>
									<h3>{adversary.name}</h3>
									<p className='italic'>{adversary.description}</p>
								</div>
								<div className='blur-block' />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
