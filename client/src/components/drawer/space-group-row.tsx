import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
	DeleteMapSpaceGroupDocument,
	UpdateMapSpaceGroupDocument,
} from '../../graphql/__generated__/graphql';

interface Props {
	mapId: string;
	group: SpaceGroup;
	onDelete: (id: string) => void;
}

export const SpaceGroupRow = ({ mapId, group, onDelete }: Props) => {
	const [name, setName] = useState(group.name);
	const [prefix, setPrefix] = useState(group.prefix);
	const [origState, setOrigState] = useState(group);

	const [deleteMapSpaceGroup] = useMutation(DeleteMapSpaceGroupDocument);
	const [updateMapSpaceGroup] = useMutation(UpdateMapSpaceGroupDocument);

	const updateGroup = () => {
		if (mapId) {
			updateMapSpaceGroup({
				variables: {
					mapId,
					group: {
						id: group.id,
						name,
						prefix,
					},
				},
			}).then((result) => {
				if (result.data?.updatedGroup) {
					setOrigState(result.data.updatedGroup);
				}
			});
		}
	};

	const deleteGroup = () => {
		if (mapId) {
			deleteMapSpaceGroup({ variables: { mapId, groupId: group.id } }).then(
				(success) => {
					if (success) {
						onDelete(group.id);
					} else {
						//TODO: Error logic
					}
				}
			);
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
						disabled={name === origState.name && prefix === origState.prefix}
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
