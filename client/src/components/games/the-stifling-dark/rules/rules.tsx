import { useSearchParams } from 'react-router-dom';

import { AmusementParkVideos } from './amusement-park-videos';
import { ButcherVideos } from './butcher-videos';
import { CultVideos } from './cult-videos';
import { ExampleRoundVideos } from './example-round-videos';
import { GeneralAdversaryVideos } from './general-adversary-videos';
import { InsatiableHorrorVideos } from './insatiable-horror-videos';
import { InvestigatorVideos } from './investigator-videos';
import { MapFeaturesVideos } from './map-features-videos';
import { NightfallVideos } from './nightfall-videos';
import { RulesOverview } from './rules-overview';
import { SawmillVideos } from './sawmill-videos';
import { SetupVideos } from './setup-videos';

export const TSDRules = () => {
	const [searchParams] = useSearchParams();

	const section = searchParams.get('section');

	return (
		<div className='tsd-container'>
			<RulesOverview />
			<SetupVideos section={section} />
			<InvestigatorVideos section={section} />
			<ExampleRoundVideos section={section} />
			<SawmillVideos section={section} />
			<AmusementParkVideos section={section} />
			<MapFeaturesVideos section={section} />
			<GeneralAdversaryVideos section={section} />
			<InsatiableHorrorVideos section={section} />
			<ButcherVideos section={section} />
			<CultVideos section={section} />
			<NightfallVideos section={section} />
		</div>
	);
};
