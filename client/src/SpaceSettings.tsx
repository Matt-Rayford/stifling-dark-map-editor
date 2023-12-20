import { useEffect, useState } from 'react';
import { Space, SpaceType, getSpaceTypeDetails } from './models/space';
import { calculateAllPaths } from './utils/canvas';
import { LightLevel, getLightLevelDetails } from './models/light-level';

interface Props {
	space: Space;
	spaceGroups: SpaceGroup[];
	onGenerateDistances: (distanceMap: Map<number, number>) => void;
	onUpdateGroup: () => void;
	onDisableDistances: () => void;
}

const SpaceSettings = ({
	space,
	spaceGroups,
	onGenerateDistances,
	onUpdateGroup,
	onDisableDistances,
}: Props) => {
	const [lightLevel, setLightLevel] = useState<LightLevel>();
	const [spaceType, setSpaceType] = useState<SpaceType>(space.type);
	const [spaceGroup, setSpaceGroup] = useState<number>(-1);

	useEffect(() => {
		if (space) {
			setSpaceGroup(space.group ?? -1);
			setLightLevel(space.lightLevel);
		}
	}, [space]);

	const updateLightLevel = (lightLevel: LightLevel) => {
		space.updateLightLevel(lightLevel);
		setLightLevel(lightLevel);
	};

	const updateSpaceType = (spaceType: SpaceType) => {
		space.updateType(spaceType);
		setSpaceType(spaceType);
	};

	const updateGroup = (spaceGroup?: number) => {
		if (typeof spaceGroup !== 'number') {
			space.removeGroup();
			setSpaceGroup(-1);
		} else {
			space.updateGroup(spaceGroup);
			setSpaceGroup(spaceGroup);
		}
		onUpdateGroup();
	};

	const removeConnection = (space: Space, connection: Space) => {
		space.connections = space.connections.filter(
			(space2) => space2.id !== connection.id
		);
		connection.connections = connection.connections.filter(
			(space2) => space2.id !== space.id
		);
	};

	const generateDistances = () => {
		const distanceMap = calculateAllPaths(space)!;
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
					onChange={(e) =>
						updateGroup(
							e.target.value && e.target.value !== '-1'
								? parseInt(e.target.value)
								: undefined
						)
					}
				>
					<option value={-1}>None...</option>
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
					value={spaceType ?? SpaceType.BASIC}
					className='form-select'
					onChange={(e) => updateSpaceType(e.target.value as SpaceType)}
				>
					<option value='' disabled>
						Select Type...
					</option>
					{Object.keys(SpaceType).map((key) => {
						const details = getSpaceTypeDetails(key as SpaceType);
						return (
							<option key={key} value={details.name}>
								{details.name}
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
					onChange={(e) => updateLightLevel(e.target.value as LightLevel)}
				>
					<option value='' disabled>
						Select Level...
					</option>
					{Object.keys(LightLevel).map((key) => {
						return (
							<option key={key} value={key}>
								{getLightLevelDetails(key as LightLevel).name}
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
			{space.connections.map((connection) => {
				const connectionLabel = connection.group
					? `${spaceGroups[connection.group]?.prefix}-${connection.number}`
					: connection.number;
				return (
					<div key={connection.id} className='input-group'>
						<input
							type='text'
							className='form-control'
							disabled
							value={connectionLabel}
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
				);
			})}
		</div>
	);
};

export default SpaceSettings;
