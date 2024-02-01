import { useEffect, useState } from 'react';
import { Space, SpaceType } from './models/space';
import { calculateAllPaths } from './utils/canvas';
import {
	disconnectSpaces,
	getLightLevels,
	getSpaceTypes,
	updateSpace,
} from './utils/requests';
import { LightLevel } from './models/light-level';

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
	const [connections, setSpaceConnections] = useState<Space[]>(
		space.connections
	);
	const [lightLevels, setLightLevels] = useState<LightLevel[]>([]);
	const [lightLevel, setLightLevel] = useState<LightLevel>();
	const [spaceTypes, setSpaceTypes] = useState<SpaceType[]>([]);
	const [spaceType, setSpaceType] = useState<SpaceType>(space.type);
	const [spaceGroupId, setSpaceGroupId] = useState<string>('-');

	useEffect(() => {
		getLightLevels().then((lightLevels: LightLevel[]) => {
			setLightLevels(lightLevels);
		});
		getSpaceTypes().then((spaceTypes: SpaceType[]) => {
			setSpaceTypes(spaceTypes);
		});
	}, []);

	useEffect(() => {
		if (space) {
			setSpaceGroupId(space.group?.id ?? '-');
			setLightLevel(space.lightLevel);
			setSpaceConnections(space.connections);
		}
	}, [space]);

	const updateLightLevel = (lightLevel: LightLevel) => {
		updateSpace({ id: space.id, lightLevelId: lightLevel.id });
		space.updateLightLevel(lightLevel);
		setLightLevel(lightLevel);
	};

	const updateSpaceType = (spaceType: SpaceType) => {
		updateSpace({ id: space.id, typeId: spaceType.id });
		space.updateType(spaceType);
		setSpaceType(spaceType);
	};

	const updateGroup = (spaceGroupId?: string) => {
		if (!spaceGroupId) {
			updateSpace({ id: space.id, groupId: null });
			space.removeGroup();
			setSpaceGroupId('-');
		} else {
			updateSpace({ id: space.id, groupId: spaceGroupId });
			space.updateGroup(spaceGroups.find((g) => g.id === spaceGroupId)!);
			setSpaceGroupId(spaceGroupId);
		}
		onUpdateGroup();
	};

	const removeConnection = (space: Space, connection: Space) => {
		disconnectSpaces(space.id, connection.id);
		space.connections = space.connections.filter(
			(space2) => space2.id !== connection.id
		);
		connection.connections = connection.connections.filter(
			(space2) => space2.id !== space.id
		);
		setSpaceConnections(space.connections);
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
					value={spaceGroupId}
					onChange={(e) =>
						updateGroup(
							e.target.value && e.target.value !== '-1'
								? e.target.value
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
					value={space.type.id}
					className='form-select'
					onChange={(e) =>
						updateSpaceType(
							spaceTypes.find((spaceType) => spaceType.id === e.target.value)!
						)
					}
				>
					<option value='' disabled>
						Select Type...
					</option>
					{spaceTypes.map((spaceType) => {
						return (
							<option key={spaceType.id} value={spaceType.id}>
								{spaceType.name}
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
					value={lightLevel?.id}
					className='form-select'
					onChange={(e) =>
						updateLightLevel(
							lightLevels.find(
								(lightLevel) => lightLevel.id === e.target.value
							)!
						)
					}
				>
					<option value='' disabled>
						Select Level...
					</option>
					{lightLevels.map((lightLevel: LightLevel) => {
						return (
							<option key={lightLevel.id} value={lightLevel.id}>
								{lightLevel.name}
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
			{connections
				.sort((a, b) => (a.displayNumber < b.displayNumber ? -1 : 1))
				.map((connection) => {
					const connectionLabel = connection.group
						? `${connection.group?.prefix}-${connection.displayNumber}`
						: connection.displayNumber;
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
