import React, { Component } from 'react';
import { updateMap } from './utils/requests';

export class ToolSettings extends Component {
	constructor(props) {
		super(props);
	}

	onSave = () => {
		const { mapId } = this.props;
		const { mapData } = this.state;
	};

	render() {
		const { mapSettings } = this.state;
		if (!mapSettings) return null;
		return (
			<div style={{ padding: '5px' }}>
				<div className='row'>
					<div className='col-12'>
						<button
							type='button'
							className='btn btn-primary w-100'
							onClick={() => this.onSave()}
						>
							Update
						</button>
					</div>
				</div>
			</div>
		);
	}
}
