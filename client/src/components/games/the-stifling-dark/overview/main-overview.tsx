import { AdversaryViewer } from './adversary-viewer';
import { FlashlightViewer } from './flashlight-viewer';
import { Header } from './header';
import { InvestigatorViewer } from './investigator-viewer';
import { OrderNow } from './order-now';
import { Description } from './description';

import { PlayNow } from './play-now';

export const TSDOverview = () => {
	return (
		<div className='tsd-container'>
			<Header />
			<Description />
			<InvestigatorViewer />
			<FlashlightViewer />
			<AdversaryViewer />
			<PlayNow />
			<OrderNow />
		</div>
	);
};
