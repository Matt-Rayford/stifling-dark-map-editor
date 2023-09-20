import React, { useEffect, useState } from 'react';
import { LightLevels, SpaceTypes } from './models/map-models';
import { calculateAllPaths } from './utils/canvas';

const SpaceSettings = ({
	space,
	spaceGroups,
	onGenerateDistances,
	onUpdateGroup,
	onDisableDistances,
}) => {
	const [lightLevel, setLightLevel] = useState('');
	const [spaceGroup, setSpaceGroup] = useState('');

	useEffect(() => {
		if (space) {
			setSpaceGroup(space.group !== null ? space.group : '');
			setLightLevel(space.lightLevel.enumVal);
		}
	}, [space]);

	const updateLightLevel = (value) => {
		space.updateLightLevel(value);
		setLightLevel(value);
	};

	const updateSpaceType = (value) => {
		space.updateType(value);
		setSpaceType(value);
	};

	const updateGroup = (value) => {
		if (!value || value === '') {
			space.removeGroup();
			setSpaceGroup('');
		} else {
			space.updateGroup(value);
			setSpaceGroup(value);
		}
		onUpdateGroup();
	};

	const removeConnection = (space, connection) => {
		space.connections = space.connections.filter(
			(space2) => space2.id !== connection.id
		);
		connection.connections = connection.connections.filter(
			(space2) => space2.id !== space.id
		);
	};

	const generateDistances = () => {
		const distanceMap = calculateAllPaths(space);
		onGenerateDistances(distanceMap);
	};

	const renderGroups = () => {
		if (!spaceGroups || spaceGroups.length === 0)
			return <span>No groups created, create them in the Tools tab</span>;
		else
			return (
				<select
					className='form-select'
					value={spaceGroup}
					onChange={(e) => updateGroup(e.target.value)}
				>
					<option value=''>None...</option>
					{spaceGroups.map((g) => (
						<option key={g.id} value={g.id}>
							{g.name} ({g.prefix})
						</option>
					))}
				</select>
			);
	};

	return (
		<div className='vstack gap-2' style={{ padding: '12px' }}>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<label className='input-group-text'>Space Type</label>
				</div>
				<select
					value={space.spaceType ? space.spaceType.enumVal : ''}
					className='form-select'
					onChange={(e) => updateSpaceType(e.target.value)}
				>
					<option value='' disabled>
						Select Type...
					</option>
					{Object.keys(SpaceTypes).map((key) => {
						return (
							<option key={key} value={SpaceTypes[key].enumVal}>
								{SpaceTypes[key].name}
							</option>
						);
					})}
				</select>
			</div>

			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<label className='input-group-text'>Brightness</label>
				</div>
				<select
					value={lightLevel}
					className='form-select'
					onChange={(e) => updateLightLevel(e.target.value)}
				>
					<option value='' disabled>
						Select Level...
					</option>
					{Object.keys(LightLevels).map((key) => {
						return (
							<option key={key} value={LightLevels[key].enumVal}>
								{LightLevels[key].name}
							</option>
						);
					})}
				</select>
			</div>

			<div className='row'>
				<div className='col-6'>
					<button
						type='button'
						className='btn btn-primary w-100'
						onClick={() => generateDistances()}
					>
						Generate Distances
					</button>
				</div>
				<div className='col-6'>
					<button
						type='button'
						className='btn btn-danger w-100'
						onClick={() => onDisableDistances()}
					>
						Disable Distances
					</button>
				</div>
			</div>

			<h5>Group</h5>
			{renderGroups()}

			<h5>Connections</h5>
			{space.connections.map((connection) => (
				<div key={connection.id} className='input-group'>
					<input
						type='text'
						className='form-control'
						disabled
						value={connection.number}
					/>

					<div className='input-group-append'>
						<button
							className='btn btn-outline-danger'
							type='button'
							onClick={() => removeConnection(space, connection)}
						>
							{'Delete'}
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default SpaceSettings;
