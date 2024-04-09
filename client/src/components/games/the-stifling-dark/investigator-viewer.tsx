import { investigators } from './investigators';

export const InvestigatorViewer = () => {
	return (
		<>
			<h2>Meet the Investigators</h2>
			<div className='scroll-viewer'>
				<div>
					{investigators.map((investigator) => (
						<img
							key={`${investigator.name}-1`}
							width={300}
							height={450}
							src={investigator.imageSrc}
							alt={`Portrait of ${investigator.name}`}
						/>
					))}
				</div>
				<div>
					{investigators.map((investigator) => (
						<img
							key={`${investigator.name}-2`}
							width={300}
							height={450}
							src={investigator.imageSrc}
							alt={`Portrait of ${investigator.name}`}
						/>
					))}
				</div>
			</div>
		</>
	);
};
