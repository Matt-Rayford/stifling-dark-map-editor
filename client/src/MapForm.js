import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMap } from './utils/requests';

const MapForm = () => {
	const [title, setMapTitle] = useState('');
	const navigate = useNavigate();
	const handleSubmit = useCallback(
		(title) => {
			const { data } = createMap(title).then(({ id }) => {
				navigate(`/map/${id}`);
			});
		},
		[navigate]
	);

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
						onClick={() => handleSubmit(title)}
					>
						Create
					</button>
				</div>
			</div>
		</form>
	);
};

export default MapForm;
