import { AdversaryViewer } from './adversary-viewer';
import { FlashlightViewer } from './flashlight-viewer';
import { Header } from './header';
import { InvestigatorViewer } from './investigator-viewer';
import { OrderNow } from './order-now';
import { Overview } from './overview';
import { PlayNow } from './play-now';

export const TSDInformation = () => {
	return (
		<div className='tsd-container'>
			<Header />
			<Overview />
			<InvestigatorViewer />
			<FlashlightViewer />
			<AdversaryViewer />
			<PlayNow />
			<OrderNow />
		</div>
	);
};
