import { getInvestigatorPlaystyleIcon } from './investigator-playstyles';
import { InvestigatorDetails } from './investigators';
import { X, ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

interface Props {
	investigator: InvestigatorDetails;
	onClose: () => void;
	onNext?: () => void;
	onPrev?: () => void;
}

export const InvestigatorDetailsDrawer = ({
	investigator,
	onClose,
	onNext,
	onPrev,
}: Props) => {
	const Icon = getInvestigatorPlaystyleIcon(investigator.playstyle);
	const iconSize = 36;

	return (
		<div className='investigator-details-dialog flex flex-col flex-spread'>
			<header className='dialog-header'>
				<h3>{investigator.name}</h3>
				<button className='icon-button' type='button' onClick={onClose}>
					<X size={iconSize} style={{ color: '#fff' }} />
				</button>
			</header>
			<p className='flex flex-v-center gap-1'>
				<span>{investigator.playstyle}</span>
				<Icon />
			</p>
			<p className='italic'>{investigator.description}</p>
			<div className='flex-fluid gap-1'>
				<div className='flex-1'>
					<p className='bold m-0'>Minor Ability</p>{' '}
					<p className='m-0'>{investigator.minorAbility}</p>
				</div>
				<div className='flex-1'>
					<p className='bold m-0'>Major Ability</p>
					<p className='m-0'>{investigator.majorAbility}</p>
				</div>
			</div>
			<footer className='flex flex-spread'>
				<button className='icon-button' type='button' onClick={onPrev}>
					<ArrowLeft size={iconSize} />
				</button>
				<button className='icon-button' type='button' onClick={onNext}>
					<ArrowRight size={iconSize} />
				</button>
			</footer>
		</div>
	);
};
