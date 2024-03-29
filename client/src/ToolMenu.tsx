import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Settings from './Settings';
import SpaceGroupSettings from './SpaceGroupSettings';
import SpaceSettings from './SpaceSettings';
import { renumberSpaces, updateSpaceColor } from './utils/canvas';
import { Space } from './models/space';
import { Map as SDMap } from './graphql/__generated__/graphql';
import { useTour } from '@reactour/tour';

let isDragging = false;
const mousePos = { x: 0, y: 0 };

interface Props {
	map: SDMap;
	spaceMap: Map<number, Space>;
	selectedObject?: Space;
	onUpdateBackgroundImage: (imageUrl: string) => void;
	onGenerateDistances: (distanceMap: Map<number, number>) => void;
	onDisableDistances: () => void;
}

const ToolMenu = ({
	map,
	spaceMap,
	onUpdateBackgroundImage,
	selectedObject,
	onGenerateDistances,
	onDisableDistances,
}: Props) => {
	const [currentTab, setCurrentTab] = useState('map-settings');
	const [spaceGroups, setSpaceGroups] = useState(map.spaceGroups);
	const { setCurrentStep } = useTour();

	useEffect(() => {
		const optionsBanner = document.getElementById('settings-banner')!;
		const options = document.getElementById('settings')!;

		const handleMouseDown = (event: any) => {
			const { clientX, clientY } = event;
			mousePos.x = clientX;
			mousePos.y = clientY;
			isDragging = true;
		};
		const handleMouseUp = () => {
			isDragging = false;
		};
		const handleMouseMove = (event: any) => {
			if (isDragging) {
				const { clientX, clientY } = event;
				const dX = mousePos.x - event.clientX;
				const dY = mousePos.y - event.clientY;

				mousePos.x = clientX;
				mousePos.y = clientY;
				options.style.left = `${options.offsetLeft - dX}px`;
				options.style.top = `${options.offsetTop - dY}px`;
			}
		};

		optionsBanner.addEventListener('mousedown', handleMouseDown);
		optionsBanner.addEventListener('mouseup', handleMouseUp);
		optionsBanner.addEventListener('mousemove', handleMouseMove);
		return () => {
			optionsBanner.removeEventListener('mouseDown', handleMouseDown);
			optionsBanner.removeEventListener('mouseup', handleMouseUp);
			optionsBanner.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	useEffect(() => {
		if (map) {
			setSpaceGroups(map.spaceGroups);
		}
	}, [map]);

	const updateGroup = () => {
		if (map.spaceGroups) {
			renumberSpaces(spaceMap, map.spaceGroups);
		}
	};

	const getSpaceLabel = (space: Space) => {
		if (space.group) {
			return `Space ${space.group.prefix}-${space.displayNumber}`;
		}
		return `Space ${space.displayNumber}`;
	};

	const updateSpaceGroups = () => {
		setSpaceGroups(map.spaceGroups);
	};

	const handleTourUpdate = (tabName: string | null) => {
		if (tabName === 'space') {
			setCurrentStep(5);
		}
		if (tabName === 'tools') {
			setCurrentStep(10);
		}
	};

	return (
		<div
			id='settings'
			style={{
				width: '400px',
				height: 'auto',
				position: 'fixed',
				border: '1px solid black',
				backgroundColor: '#FFFFFF',
				left: 'calc(100% - 400px)',
				zIndex: '100',
			}}
		>
			<h3
				id='settings-banner'
				style={{
					cursor: 'move',
					backgroundColor: '#5bc0de',
					padding: '10px',
				}}
			>
				Settings
			</h3>
			<Tabs
				defaultActiveKey='map-settings'
				id='settings-tabs'
				onSelect={handleTourUpdate}
			>
				{selectedObject && (
					<Tab eventKey='space' title={getSpaceLabel(selectedObject)}>
						<SpaceSettings
							space={selectedObject}
							mapId={map.id}
							onGenerateDistances={onGenerateDistances}
							onUpdateGroup={updateGroup}
							onDisableDistances={onDisableDistances}
						/>
					</Tab>
				)}
				<Tab eventKey='tools' title='Tools'>
					<div style={{ padding: '12px' }}>
						<SpaceGroupSettings
							mapId={map.id}
							existingGroups={spaceGroups}
							onUpdateSpaceGroups={updateSpaceGroups}
						/>
					</div>
				</Tab>
				<Tab eventKey='map-settings' title='Map'>
					<Settings
						name={map.title}
						mapId={map.id}
						mapSettings={map.settings}
						spaceMap={spaceMap}
						onUpdateBackgroundImage={onUpdateBackgroundImage}
					/>
				</Tab>
			</Tabs>
		</div>
	);
};

export default ToolMenu;
