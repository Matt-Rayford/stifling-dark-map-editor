import { PlaytesterList } from './playtester-list';
import { PlaytesterOverview } from './playtester-overview';

export const Playtesters = () => {
	return (
		<div className='tsd-container'>
			<PlaytesterOverview />
			<PlaytesterList />
		</div>
	);
};
