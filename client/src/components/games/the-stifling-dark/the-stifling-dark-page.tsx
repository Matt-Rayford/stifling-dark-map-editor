import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TSDOverview } from './overview/main-overview';
import { TSDTabOption, TSDTabs } from './tsd-tabs';
import { TSDRules } from './rules/rules';
import { FaqAndErrata } from './faq-and-errata/faq-and-errta';
import { Playtesters } from './playtesters/playtesters';

export const TheStiflingDarkPage = () => {
	const [tab, setTab] = useState(TSDTabOption.Information);

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		console.log('Search params: ', searchParams);
	}, [searchParams]);

	console.log('Search params: ', searchParams);

	setSearchParams();

	return (
		<div>
			<TSDTabs activeTab={tab} selectTab={setTab} />

			{tab === TSDTabOption.Information && <TSDOverview />}
			{tab === TSDTabOption.Rules && <TSDRules />}
			{tab === TSDTabOption.FAQ && <FaqAndErrata />}
			{tab === TSDTabOption.Playtesters && <Playtesters />}
		</div>
	);
};
