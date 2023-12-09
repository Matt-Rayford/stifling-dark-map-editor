import React, { Component, useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import MapSettings from './MapSettings';
import SpaceGroup from './SpaceGroup';
import SpaceSettings from './SpaceSettings';
import { renumberSpaces, updateSpaceColor } from './utils/canvas';

let isDragging = false;
const mousePos = { x: 0, y: 0 };

const ToolMenu = ({
	map,
	spaceMap,
	settings,
	onUpdateBackgroundImage,
	onUpdateSpacingSettings,
	selectedObject,
	onGenerateDistances,
	onDisableDistances,
}) => {
	const [spaceGroups, setSpaceGroups] = useState([]);

	useEffect(() => {
		const optionsBanner = document.getElementById('options-banner');
		const options = document.getElementById('options');

		const handleMouseDown = (event) => {
			const { clientX, clientY } = event;
			mousePos.x = clientX;
			mousePos.y = clientY;
			isDragging = true;
		};
		const handleMouseUp = () => {
			isDragging = false;
		};
		const handleMouseMove = (event) => {
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

	const updateMapSettings = (settingName, value) => {
		map.drawOptions[settingName] = value;
		if (settingName === 'spaceColor') {
			updateSpaceColor(spaceMap, value);
		}

		//this.drawMap(newMap.drawOptions.backgroundImageUrl);
		//this.setState({ map: newMap, spaceMap, timer: newTimer });
	};

	const updateGroup = () => {
		renumberSpaces(spaceMap, settings);
	};

	const getSpaceLabel = (space) => {
		const spaceGroupMap = settings.get('spaceGroups');
		if (space.group !== null) {
			return `Space ${spaceGroupMap.get(space.group).prefix}-${
				space.number
			}`;
		}
		return `Space ${space.number}`;
	};

	const updateSpaceGroups = () => {
		setSpaceGroups(Array.from(settings.get('spaceGroups').values()));
	};

	return (
		<div
			id='options'
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
				id='options-banner'
				style={{
					cursor: 'move',
					backgroundColor: '#5bc0de',
					padding: '10px',
				}}
			>
				Options
			</h3>
			<Tabs defaultActiveKey='Home' id='settings-tabs'>
				{selectedObject && (
					<Tab eventKey='space' title={getSpaceLabel(selectedObject)}>
						<SpaceSettings
							space={selectedObject}
							spaceMap={spaceMap}
							spaceGroups={spaceGroups}
							onGenerateDistances={onGenerateDistances}
							onUpdateGroup={() => updateGroup()}
							onDisableDistances={onDisableDistances}
						/>
					</Tab>
				)}
				<Tab eventKey='tools' title='Tools'>
					<div style={{ padding: '12px' }}>
						<SpaceGroup
							mapId={map.id}
							existingGroups={spaceGroups}
							settings={settings}
							onUpdateSpaceGroups={updateSpaceGroups}
						/>
					</div>
				</Tab>
				<Tab eventKey='map' title='Map'>
					<MapSettings
						mapId={map.id}
						mapSettings={map.drawOptions}
						onUpdate={updateMapSettings}
						spaceMap={spaceMap}
						onUpdateBackgroundImage={onUpdateBackgroundImage}
					/>
				</Tab>
			</Tabs>
		</div>
	);
};

export default ToolMenu;
