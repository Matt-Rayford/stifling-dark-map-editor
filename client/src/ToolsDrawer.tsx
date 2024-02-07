import { useState } from 'react';
import {
	GlobeAmericas,
	WrenchAdjustableCircle,
	Circle,
} from 'react-bootstrap-icons';
import './style.css';
import { Space } from './models/space';
import { Map as SDMap } from './graphql/__generated__/graphql';
import Settings from './MapSettings';

const ICON_SIZE = 28;

interface Props {
	activeSpace?: Space;
	map: SDMap;
	spaceMap: Map<number, Space>;
	onUpdateBackgroundImage: (imageUrl: string) => void;
	onGenerateDistances: (distanceMap: Map<number, number>) => void;
	onDisableDistances: () => void;
}

export const ToolsDrawer = ({
	activeSpace,
	map,
	spaceMap,
	onUpdateBackgroundImage,
}: Props) => {
	const [showMapSettings, setShowMapSettings] = useState(false);

	const slideNav = showMapSettings;

	return (
		<>
			<div className={`tools-sidebar ${slideNav ? 'tools-sidebar-show' : ''}`}>
				<div className='tools-content bg-dark text-light' data-bs-theme='dark'>
					{showMapSettings && (
						<Settings
							name={map.title}
							mapId={map.id}
							mapSettings={map.settings}
							spaceMap={spaceMap}
							onUpdateBackgroundImage={onUpdateBackgroundImage}
						/>
					)}
				</div>
				<div className='tools-nav bg-dark text-light'>
					<div onClick={() => setShowMapSettings(!showMapSettings)}>
						<GlobeAmericas size={ICON_SIZE} />
					</div>
					<div>
						<WrenchAdjustableCircle size={ICON_SIZE} />
					</div>
					<div
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
