import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { TSDOverview } from './overview/main-overview';
import { TSDTabOption, TSDTabs } from './tsd-tabs';
import { TSDRules } from './rules/rules';
import { FaqAndErrata } from './faq-and-errata/faq-and-errta';
import { Playtesters } from './playtesters/playtesters';
import { YourMaps } from '../../map-editor/your-maps';

export const TheStiflingDarkPage = () => {
  const [tab, setTab] = useState(TSDTabOption.Information);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      if (tab === TSDTabOption.FAQ) {
        setTab(TSDTabOption.FAQ);
      }
      if (tab === TSDTabOption.Information) {
        setTab(TSDTabOption.Information);
      }
      if (tab === TSDTabOption.Playtesters) {
        setTab(TSDTabOption.Playtesters);
      }
      if (tab === TSDTabOption.Rules) {
        setTab(TSDTabOption.Rules);
      }
      if (tab === TSDTabOption.MapEditor) {
        setTab(TSDTabOption.MapEditor);
      }
    }
  }, [searchParams]);

  return (
    <div>
      <TSDTabs activeTab={tab} selectTab={setTab} />

      {tab === TSDTabOption.Information && <TSDOverview />}
      {tab === TSDTabOption.Rules && <TSDRules />}
      {tab === TSDTabOption.FAQ && <FaqAndErrata />}
      {tab === TSDTabOption.Playtesters && <Playtesters />}
      {tab === TSDTabOption.MapEditor && <YourMaps />}
    </div>
  );
};
