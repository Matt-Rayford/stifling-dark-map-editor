export enum TSDTabOption {
	Information = 'information',
	FAQ = 'faq',
	Playtesters = 'playtesters',
	Rules = 'rules',
}

interface Props {
	activeTab: TSDTabOption;
	selectTab: (tabOption: TSDTabOption) => void;
}

export const TSDTabs = ({ activeTab, selectTab }: Props) => {
	return (
		<div className='page-tabs'>
			<button
				className={`chip ${
					activeTab === TSDTabOption.Information ? 'active' : ''
				}`}
				onClick={() => selectTab(TSDTabOption.Information)}
			>
				Overview
			</button>
			<button
				className={`chip ${activeTab === TSDTabOption.Rules ? 'active' : ''}`}
				onClick={() => selectTab(TSDTabOption.Rules)}
			>
				Rules
			</button>
			<button
				className={`chip ${activeTab === TSDTabOption.FAQ ? 'active' : ''}`}
				onClick={() => selectTab(TSDTabOption.FAQ)}
			>
				Errata &amp; FAQ
			</button>
			<button
				className={`chip ${
					activeTab === TSDTabOption.Playtesters ? 'active' : ''
				}`}
				onClick={() => selectTab(TSDTabOption.Playtesters)}
			>
				Playtesters
			</button>
		</div>
	);
};
