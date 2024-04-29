import { Download } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export const RulebookDownload = () => {
	return (
		<div className='content-container'>
			<h1> The Stifling Dark Rules</h1>
			You will find all of our PDF rulebook, component list, and rules videos
			here! rulebook below:
			<Link
				to='https://www.sophisticatedcerberus.com/uploads/1/3/2/8/132846279/the_stifling_dark_rulebook_-_online_version.pdf'
				target='_blank'
				style={{ color: 'white', textDecoration: 'none' }}
			>
				<h2>
					Rulebook <Download />
				</h2>
			</Link>
		</div>
	);
};
