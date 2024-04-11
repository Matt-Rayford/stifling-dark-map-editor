import {
	BandaidFill,
	BinocularsFill,
	Bullseye,
	PeopleFill,
	QuestionCircleFill,
} from 'react-bootstrap-icons';

export enum InvestigatorPlaystyle {
	Objectives = 'Objectives',
	Scout = 'Scout',
	Survival = 'Survival',
	Support = 'Support',
}

export const getInvestigatorPlaystyleIcon = (
	playstyle: InvestigatorPlaystyle
) => {
	switch (playstyle) {
		case InvestigatorPlaystyle.Objectives:
			return Bullseye;
		case InvestigatorPlaystyle.Scout:
			return BinocularsFill;
		case InvestigatorPlaystyle.Survival:
			return BandaidFill;
		case InvestigatorPlaystyle.Support:
			return PeopleFill;
		default:
			return QuestionCircleFill;
	}
};
