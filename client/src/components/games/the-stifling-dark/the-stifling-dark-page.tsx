import { useState } from 'react';

import { TSDInformation } from './main-information';
import { TSDTabOption, TSDTabs } from './tsd-tabs';
import { TSDRules } from './rules';

export const TheStiflingDarkPage = () => {
	const [tab, setTab] = useState(TSDTabOption.Information);

	return (
		<div>
			<TSDTabs activeTab={tab} selectTab={setTab} />
			{tab === TSDTabOption.Information && <TSDInformation />}
			{tab === TSDTabOption.Rules && <TSDRules />}
		</div>
	);
};
