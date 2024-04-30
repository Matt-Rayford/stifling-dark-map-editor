import { AmusementParkVideos } from './amusement-park-videos';
import { ButcherVideos } from './butcher-videos';
import { CultVideos } from './cult-videos';
import { ExampleRoundVideos } from './example-round-videos';
import { GeneralAdversaryVideos } from './general-adversary-videos';
import { InsatiableHorrorVideos } from './insatiable-horror-videos';
import { InvestigatorVideos } from './investigator-videos';
import { MapFeaturesVideos } from './map-features-videos';
import { RulesOverview } from './rules-overview';
import { SawmillVideos } from './sawmill-videos';
import { SetupVideos } from './setup-videos';

export const TSDRules = () => {
	return (
		<div className='tsd-container'>
			<RulesOverview />
			<SetupVideos />
			<InvestigatorVideos />
			<ExampleRoundVideos />
			<SawmillVideos />
			<AmusementParkVideos />
			<MapFeaturesVideos />
			<GeneralAdversaryVideos />
			<InsatiableHorrorVideos />
			<ButcherVideos />
			<CultVideos />
		</div>
	);
};
