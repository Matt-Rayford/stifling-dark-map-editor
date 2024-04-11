import { useState } from 'react';

import { InvestigatorDetails, investigators } from './investigators';
import { InvestigatorDetailsDrawer } from './investigator-details-drawer';

export const InvestigatorViewer = () => {
	const [activeInvestigator, setActiveInvestigator] =
		useState<InvestigatorDetails>();

	const width = 200;
	const height = 300;

	return (
		<div className='tsd-green-wrapper relative'>
			<div className='content-container'>
				<h2>Meet the Investigators</h2>

				<p>
					As an Investigator, your job is to search for evidence on the map
					using your flashlight. When you are threatened, you may sprint to move
					faster, but will tire out and eventually start taking damage.
					Additionally, you may find items, lock doors, and try to reveal the
					adversary. There are a variety of investigators to choose from, each
					with their own special abilities.
				</p>

				<div className='scroll-viewer'>
					<div>
						{investigators.map((investigator) => (
							<img
								key={`${investigator.name}-1`}
								width={width}
								height={height}
								src={investigator.imageSrc}
								alt={`Portrait of ${investigator.name}`}
								onClick={() => setActiveInvestigator(investigator)}
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
								onClick={() => setActiveInvestigator(investigator)}
							/>
						))}
					</div>
				</div>
			</div>
			{!!activeInvestigator && (
				<InvestigatorDetailsDrawer
					investigator={activeInvestigator}
					onClose={() => setActiveInvestigator(undefined)}
				/>
			)}
		</div>
	);
};
