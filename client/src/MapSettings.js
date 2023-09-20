import React, { Component, useEffect, useState } from 'react';
import { updateSpaceColor } from './utils/canvas';
import { updateMap, updateMapSettings } from './utils/requests';

const MapSettings = ({
	mapId,
	spaceMap,
	mapSettings,
	onUpdateBackgroundImage,
}) => {
	const [origSettings, setOrigSettings] = useState(null);
	const [curMapSettings, setCurMapSettings] = useState(null);

	useEffect(() => {
		if (!origSettings) setOrigSettings(mapSettings);
		if (!curMapSettings) setCurMapSettings(mapSettings);
	}, [mapSettings]);

	const onSave = () => {
		let spaceData = Array.from(spaceMap.values()).map((space) => {
			const s = {
				id: space.id,
				number: space.number,
				type: space.spaceType.enumVal,
				lightLevel: space.lightLevel.enumVal,
				row: space.row,
				col: space.col,
				connections: space.connections.map((c) => c.id),
				isDeleted: space.isDeleted,
			};
			if (space.group !== null) s.group = space.group;

			return s;
		});

		updateMap(mapId, spaceData, curMapSettings);
		setOrigSettings({ ...curMapSettings });
	};

	const onReset = () => {
		setCurMapSettings({ ...origSettings });
		handleColorUpdate(origSettings.spaceColor);
		handleImageUpdate(origSettings.backgroundImageUrl);
	};

	const handleImageUpdate = (path) => {
		const pathSplits = path.split('\\');
		const imageUrl = `/images/boards/${pathSplits[pathSplits.length - 1]}`;

		const settings = { ...curMapSettings };
		settings.backgroundImageUrl = imageUrl;
		onUpdateBackgroundImage(imageUrl);
		setCurMapSettings(settings);
	};

	const handleColorUpdate = (color) => {
		updateSpaceColor(spaceMap, color);
		const settings = { ...curMapSettings };
		settings.spaceColor = color;
		setCurMapSettings(settings);
	};

	const handleOptionsUpdate = (property, value) => {
		const settings = { ...curMapSettings };
		settings[property] = parseFloat(value);
		setCurMapSettings(settings);
		for (let space of spaceMap.values()) {
			space.updateDrawOptions(settings);
		}
	};

	return curMapSettings ? (
		<div style={{ padding: '5px' }}>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>Space color</span>
				</div>
				<input
					type='color'
					className='form-control form-control-color'
					value={mapSettings.spaceColor}
					onChange={(e) => handleColorUpdate(e.target.value)}
				/>
			</div>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>Map Path</span>
				</div>
				<input
					type='file'
					className='form-control'
					accept='image/png, image/jpeg'
					onChange={(e) => handleImageUpdate(e.target.value)}
				/>
			</div>
			{Object.keys(curMapSettings).map((settingKey) => {
				if (
					settingKey === 'spaceColor' ||
					settingKey === 'backgroundImageUrl'
				)
					return null;
				return (
					<div className='input-group mb-3' key={settingKey}>
						<div className='input-group-prepend'>
							<span className='input-group-text'>
								{settingKey}
							</span>
						</div>
						<input
							type='number'
							step='0.01'
							className='form-control'
							value={curMapSettings[settingKey] || 0}
							onChange={(e) =>
								handleOptionsUpdate(settingKey, e.target.value)
							}
						/>
					</div>
				);
			})}
			<div className='row'>
				<div className='col-6'>
					<button
						type='button'
						className='btn btn-primary w-100'
						onClick={() => onSave()}
					>
						Save
					</button>
				</div>
				<div className='col-6'>
					<button
						type='button'
						className='btn btn-danger w-100'
						onClick={() => onReset()}
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default MapSettings;
