import { investigators } from './investigators';

export const InvestigatorViewer = () => {
	const width = 200;
	const height = 300;

	return (
		<>
			<h2>Meet the Investigators</h2>
			<div className='scroll-viewer'>
				<div>
					{investigators.map((investigator) => (
						<img
							key={`${investigator.name}-1`}
							width={width}
							height={height}
							src={investigator.imageSrc}
							alt={`Portrait of ${investigator.name}`}
						/>
					))}
				</div>
				<div>
					{investigators.map((investigator) => (
						<img
							key={`${investigator.name}-2`}
							width={width}
							height={height}
							src={investigator.imageSrc}
							alt={`Portrait of ${investigator.name}`}
						/>
					))}
				</div>
			</div>
		</>
	);
};
