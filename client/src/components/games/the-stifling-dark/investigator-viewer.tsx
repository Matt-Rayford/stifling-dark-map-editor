import { investigators } from './investigators';

export const InvestigatorViewer = () => {
	return (
		<div className='investigator-viewer'>
			{investigators.map((investigator) => (
				<img
					width={300}
					height={450}
					src={investigator.imageSrc}
					alt={`Portrait of ${investigator.name}`}
				/>
			))}
		</div>
	);
};
