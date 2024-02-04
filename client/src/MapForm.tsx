import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CreateMapDocument } from './graphql/__generated__/graphql';
import { useTour } from '@reactour/tour';
import { useSdUser } from './contexts/user-context';

const MapForm = () => {
	const { user } = useSdUser();
	const { setIsOpen } = useTour();
	const [title, setMapTitle] = useState('');
	const navigate = useNavigate();

	const [createMap] = useMutation(CreateMapDocument);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const handleSubmit = useCallback(() => {
		if (user?.email && title) {
			createMap({
				variables: { title, email: user.email },
				onCompleted: (data) => {
					console.log('Create new map');
					if (data?.map) {
						navigate(`/map/${data.map.id}`);
					}
				},
			});
		}
	}, []);

	return (
		<form style={{ padding: '32px 0' }}>
			<h1>Create a New Map</h1>
			<div className='form-row'>
				<div className='col-md-4'>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>Map Title</span>
						</div>
						<input
							type='text'
							className='form-control'
							placeholder='Title...'
							required
							onChange={(e) => setMapTitle(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className='form-row' style={{ paddingTop: '16px' }}>
				<div className='col-md-4'>
					<button
						className='btn btn-primary w-100'
						type='button'
						disabled={!title || title.length === 0}
						onClick={handleSubmit}
					>
						Create
					</button>
				</div>
			</div>
		</form>
	);
};

export default MapForm;
