import { AdversaryViewer } from './adversary-viewer';
import { FlashlightViewer } from './flashlight-viewer';
import { Header } from './header';
import { InvestigatorViewer } from './investigator-viewer';
import { Overview } from './overview';
import { PlayNow } from './play-now';

export const TheStiflingDarkPage = () => {
	return (
		<div className='tsd-page'>
			<Header />
			<Overview />
			<InvestigatorViewer />
			<FlashlightViewer />
			<AdversaryViewer />
			<PlayNow />
		</div>
	);
};
