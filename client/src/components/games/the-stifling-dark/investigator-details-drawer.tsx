import { InvestigatorDetails } from './investigators';
import { X } from 'react-bootstrap-icons';

interface Props {
	investigator: InvestigatorDetails;
	onClose: () => void;
}

export const InvestigatorDetailsDrawer = ({ investigator, onClose }: Props) => {
	return (
		<div className='investigator-details-dialog'>
			<header className='dialog-header'>
				<h3>{investigator.name}</h3>
				<button className='icon-button' type='button' onClick={onClose}>
					<X size={36} style={{ color: '#fff' }} />
				</button>
			</header>
			<p>{investigator.playstyle}</p>
			<p className='italic'>{investigator.description}</p>
			<div className='flex-fluid gap-2'>
				<div>
					<p className='bold m-0'>Minor Ability</p>{' '}
					<p className='m-0'>{investigator.minorAbility}</p>
				</div>
				<div>
					<p className='bold m-0'>Major Ability</p>
					<p className='m-0'>{investigator.majorAbility}</p>
				</div>
			</div>
		</div>
	);
};
