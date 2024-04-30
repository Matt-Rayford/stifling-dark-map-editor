import { Download } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export const RulesDownloads = () => {
	return (
		<div className='flex gap-1'>
			<Link
				to='https://www.sophisticatedcerberus.com/uploads/1/3/2/8/132846279/the_stifling_dark_rulebook_-_online_version.pdf'
				target='_blank'
				style={{ color: 'white', textDecoration: 'none' }}
			>
				<div className='horizontal-card'>
					<div>
						<Download style={{ width: '60%', height: '60%' }} />
					</div>
					<div>
						<h5>Rulebook (PDF)</h5>
					</div>
				</div>
			</Link>

			<Link
				to='https://www.sophisticatedcerberus.com/uploads/1/3/2/8/132846279/tsd_detailed_component_list.pdf'
				target='_blank'
				style={{ color: 'white', textDecoration: 'none' }}
			>
				<div className='horizontal-card'>
					<div>
						<Download style={{ width: '60%', height: '60%' }} />
					</div>
					<div>
						<h5>Component List (PDF)</h5>
					</div>
				</div>
			</Link>
		</div>
	);
};
