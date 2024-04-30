import { RulesDownloads } from './rules-downloads';

export const RulesOverview = () => {
	return (
		<div className='content-container'>
			<h1> The Stifling Dark Rules</h1>
			<p>
				You will find all of our PDF rulebook, component list, and rules videos
				here!
			</p>

			<RulesDownloads />
		</div>
	);
};
