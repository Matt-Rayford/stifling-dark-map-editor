import React, { useEffect, useState } from 'react';
import SpaceGroupRow from './SpaceGroupRow';
import { addMapSpaceGroup } from './utils/requests';

const SpaceGroup = ({
	mapId,
	existingGroups,
	settings,
	onUpdateSpaceGroups,
}) => {
	const [name, setName] = useState('');
	const [prefix, setPrefix] = useState('');
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		if (existingGroups) {
			setGroups([...existingGroups]);
		}
	}, [existingGroups]);

	const addNewGroup = () => {
		const group = {
			name,
			prefix,
		};
		addMapSpaceGroup(mapId, group).then((result) => {
			const newGroups = [...groups, result];
			setGroups(newGroups);
			if (settings.has('spaceGroups')) {
				const spaceGroupMap = settings.get('spaceGroups');
				spaceGroupMap.set(result.id, result);
				onUpdateSpaceGroups();
			}
		});

		setName('');
		setPrefix('');
	};

	const onDelete = (groupId) => {
		setGroups([...groups.filter((g) => g.id !== groupId)]);
		onUpdateSpaceGroups();
	};

	return (
		<div className='vstack gap-3'>
			<h3>Space Groups</h3>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Prefix</th>
						<th scope='col'>Modify</th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group) => (
						<SpaceGroupRow
							key={group.id}
							mapId={mapId}
							group={group}
							settings={settings}
							onDelete={onDelete}
						/>
					))}
					<tr>
						<td>
							<input
								type='text'
								className='form-control'
								value={name}
								placeholder='Group Name...'
								onChange={(e) => setName(e.target.value)}
							/>
						</td>
						<td>
							<input
								type='text'
								className='form-control'
								value={prefix}
								placeholder='Prefix...'
								onChange={(e) => setPrefix(e.target.value)}
							/>
						</td>
						<td>
							<button
								className='btn btn-primary w-100'
								type='button'
								disabled={!name || !prefix}
								onClick={() => addNewGroup()}
							>
								{'Create'}
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SpaceGroup;
