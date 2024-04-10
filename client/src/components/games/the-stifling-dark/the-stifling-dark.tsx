import { AdversaryViewer } from './adversary-viewer';
import { FlashlightViewer } from './flashlight-viewer';
import { InvestigatorViewer } from './investigator-viewer';
import { Overview } from './overview';
import { PlayNow } from './play-now';

export const TheStiflingDarkPage = () => {
	return (
		<div className='tsd-page'>
			<h1>The Stifling Dark</h1>
			<Overview />
			<InvestigatorViewer />
			<FlashlightViewer />
			<AdversaryViewer />
			<PlayNow />
		</div>
	);
};
