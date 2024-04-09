import { useEffect, useState } from 'react';
import SpaceGroupRow from '../../SpaceGroupRow';
import { SpaceGroup } from '../../graphql/__generated__/graphql';
import { addMapSpaceGroup } from '../../utils/requests';

interface Props {
	mapId: string;
	existingGroups?: SpaceGroup[] | null;
	onUpdateSpaceGroups: () => void;
}

const SpaceGroupSettings = ({
	mapId,
	existingGroups,
	onUpdateSpaceGroups,
}: Props) => {
	const [name, setName] = useState('');
	const [prefix, setPrefix] = useState('');
	const [groups, setGroups] = useState<SpaceGroup[]>([]);
	const [renderComponent, setRenderComponent] = useState(false);

	useEffect(() => {
		setTimeout(() => setRenderComponent(true), 400);
	}, []);

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
		});

		setName('');
		setPrefix('');
	};

	const onDelete = (groupId: string) => {
		setGroups([...groups.filter((g) => g.id !== groupId)]);
		onUpdateSpaceGroups();
	};

	if (!renderComponent) {
		return null;
	}

	return (
		<div id='space-group-settings' style={{ padding: '12px' }}>
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

export default SpaceGroupSettings;
