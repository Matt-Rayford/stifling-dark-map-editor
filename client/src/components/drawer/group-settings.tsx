import { useEffect, useState } from 'react';
import { SpaceGroupRow } from './space-group-row';
import {
	AddMapSpaceGroupDocument,
	SpaceGroup,
	SpaceGroupsQuery,
} from '../../graphql/__generated__/graphql';
import { useMutation } from '@apollo/client';

interface Props {
	mapId: string;
	existingGroups?: SpaceGroup[] | null;
	onUpdateSpaceGroups: () => void;
}

export const SpaceGroupSettings = ({
	mapId,
	existingGroups,
	onUpdateSpaceGroups,
}: Props) => {
	const [name, setName] = useState('');
	const [prefix, setPrefix] = useState('');
	const [groups, setGroups] = useState<SpaceGroupsQuery['spaceGroups']>([]);
	const [renderComponent, setRenderComponent] = useState(false);

	const [addMapSpaceGroup] = useMutation(AddMapSpaceGroupDocument);

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
		addMapSpaceGroup({
			variables: {
				mapId,
				group,
			},
		}).then((result) => {
			if (groups && result.data?.newGroup) {
				setGroups([...groups, result.data.newGroup]);
			}
		});

		setName('');
		setPrefix('');
	};

	const onDelete = (groupId: string) => {
		if (groups) {
			setGroups(groups.filter((g) => g.id !== groupId));
			onUpdateSpaceGroups();
		}
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
					{groups?.map((group) => (
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
