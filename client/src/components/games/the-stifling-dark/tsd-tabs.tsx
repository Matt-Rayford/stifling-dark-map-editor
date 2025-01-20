import { useSearchParams } from 'react-router-dom';

export enum TSDTabOption {
  Information = 'information',
  FAQ = 'faq',
  Playtesters = 'playtesters',
  Rules = 'rules',
  MapEditor = 'map-editor',
}

interface Props {
  activeTab: TSDTabOption;
  selectTab: (tabOption: TSDTabOption) => void;
}

export const TSDTabs = ({ activeTab, selectTab }: Props) => {
  const [, setSearchParams] = useSearchParams();

  const updateTab = (tabOption: TSDTabOption) => {
    setSearchParams(new URLSearchParams({ tab: tabOption }));
    selectTab(tabOption);
  };

  return (
    <div className="page-tabs">
      <button
        className={`chip ${
          activeTab === TSDTabOption.Information ? 'active' : ''
        }`}
        onClick={() => updateTab(TSDTabOption.Information)}
      >
        Overview
      </button>
      <button
        className={`chip ${activeTab === TSDTabOption.Rules ? 'active' : ''}`}
        onClick={() => updateTab(TSDTabOption.Rules)}
      >
        Rules
      </button>
      <button
        className={`chip ${activeTab === TSDTabOption.FAQ ? 'active' : ''}`}
        onClick={() => updateTab(TSDTabOption.FAQ)}
      >
        Errata &amp; FAQ
      </button>
      <button
        className={`chip ${
          activeTab === TSDTabOption.Playtesters ? 'active' : ''
        }`}
        onClick={() => updateTab(TSDTabOption.Playtesters)}
      >
        Playtesters
      </button>
      <button
        className={`chip ${
          activeTab === TSDTabOption.MapEditor ? 'active' : ''
        }`}
        onClick={() => updateTab(TSDTabOption.MapEditor)}
      >
        Map Editor
      </button>
    </div>
  );
};
