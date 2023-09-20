import React, { useState } from 'react';
import { deleteMapSpaceGroup, updateMapSpaceGroup } from './utils/requests';

const SpaceGroupRow = ({ mapId, group, onDelete, settings }) => {
	const [name, setName] = useState(group.name);
	const [prefix, setPrefix] = useState(group.prefix);
	const [origState, setOrigState] = useState(group);

	const updateGroup = () => {
		if (mapId) {
			updateMapSpaceGroup(mapId, {
				id: group.id,
				name,
				prefix,
			}).then((updatedGroup) => {
				if (settings.has('spaceGroups')) {
					const spaceGroupMap = settings.get('spaceGroups');
					const group = spaceGroupMap.get(updatedGroup.id);
					if (group) {
						group.name = updatedGroup.name;
						group.prefix = updatedGroup.prefix;
						spaceGroupMap.set(group.id, group);
					}
				}
				setOrigState(updatedGroup);
			});
		}
	};

	const deleteGroup = () => {
		if (mapId) {
			deleteMapSpaceGroup(mapId, group.id).then((success) => {
				if (success) {
					if (settings.has('spaceGroups')) {
						const spaceGroupMap = settings.get('spaceGroups');
						spaceGroupMap.delete(group.id);
					}
					onDelete(group.id);
				} else {
					//TODO: Error logic
				}
			});
		}
	};

	return (
		<tr key={group.id}>
			<td>
				<input
					type='text'
					className='form-control'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</td>
			<td>
				<input
					type='text'
					className='form-control'
					value={prefix}
					onChange={(e) => setPrefix(e.target.value)}
				/>
			</td>
			<td>
				<div className='btn-group' role='group'>
					<button
						type='button'
						className='btn btn-outline-primary'
						disabled={
							name === origState.name &&
							prefix === origState.prefix
						}
						onClick={() => updateGroup()}
					>
						Update
					</button>
					<button
						type='button'
						className='btn btn-outline-danger'
						onClick={() => deleteGroup()}
					>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
};

export default SpaceGroupRow;
