import { useEffect, useState } from 'react';
import {
	GlobeAmericas,
	WrenchAdjustableCircle,
	Circle,
} from 'react-bootstrap-icons';

import '../../style.css';
import { Space } from '../../models/space';
import { Map as SDMap } from '../../graphql/__generated__/graphql';
import Settings from './map-settings';
import SpaceGroupSettings from './group-settings';
import SpaceSettings from './space-settings';
import { renumberSpaces } from '../../utils/canvas';

const ICON_SIZE = 28;

interface Props {
	activeSpace?: Space;
	map: SDMap;
	spaceMap: Map<number, Space>;
	onDisableDistances: () => void;
	onGenerateDistances: (distanceMap: Map<number, number>) => void;
	onUpdateBackgroundImage: (imageUrl: string) => void;
}

enum TabOptions {
	MapSettings = 'map-settings',
	MapGroups = 'map-groups',
	SpaceSettings = 'space-settings',
}

export const ToolsDrawer = ({
	activeSpace,
	map,
	spaceMap,
	onUpdateBackgroundImage,
	onGenerateDistances,
	onDisableDistances,
}: Props) => {
	const [spaceGroups, setSpaceGroups] = useState(map.spaceGroups);
	const [currentTab, setCurrentTab] = useState<TabOptions>();

	const slideNav = !!currentTab;

	useEffect(() => {
		if (map) {
			setSpaceGroups(map.spaceGroups);
		}
	}, [map]);

	const changeTab = (tab: TabOptions) => {
		if (currentTab === tab) {
			setCurrentTab(undefined);
		} else {
			setCurrentTab(tab);
		}
	};

	const updateSpaceGroups = () => {
		setSpaceGroups(map.spaceGroups);
	};

	const updateGroup = () => {
		if (map.spaceGroups) {
			renumberSpaces(spaceMap, map.spaceGroups);
		}
	};

	return (
		<>
			<div className={`tools-drawer ${slideNav ? 'tools-drawer-show' : ''}`}>
				<div className='tools-content bg-dark text-light' data-bs-theme='dark'>
					{currentTab === TabOptions.MapSettings && (
						<Settings
							name={map.title}
							mapId={map.id}
							mapSettings={map.settings}
							spaceMap={spaceMap}
							onUpdateBackgroundImage={onUpdateBackgroundImage}
						/>
					)}
					{currentTab === TabOptions.MapGroups && (
						<SpaceGroupSettings
							mapId={map.id}
							existingGroups={spaceGroups}
							onUpdateSpaceGroups={updateSpaceGroups}
						/>
					)}
					{currentTab === TabOptions.SpaceSettings && (
						<SpaceSettings
							space={activeSpace}
							mapId={map.id}
							onDisableDistances={onDisableDistances}
							onGenerateDistances={onGenerateDistances}
							onUpdateGroup={updateGroup}
						/>
					)}
				</div>
				<div className='tools-nav bg-dark text-light'>
					<div onClick={() => changeTab(TabOptions.MapSettings)}>
						<GlobeAmericas size={ICON_SIZE} />
					</div>
					<div onClick={() => changeTab(TabOptions.MapGroups)}>
						<WrenchAdjustableCircle size={ICON_SIZE} />
					</div>
					<div
						onClick={() => changeTab(TabOptions.SpaceSettings)}
						style={{
							position: 'relative',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div className='tools-nav-space'>
							<Circle size={ICON_SIZE} />
							<span>{activeSpace?.displayNumber ?? '?'}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
