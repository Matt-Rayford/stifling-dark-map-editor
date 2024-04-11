import { InvestigatorPlaystyle } from './investigator-playstyles';

export interface InvestigatorDetails {
	description?: string;
	imageSrc: string;
	name: string;
	minorAbility: string;
	majorAbility: string;
	playstyle: string;
}

export const investigators: InvestigatorDetails[] = [
	{
		description:
			'When people meet Aira, the first thing they realize is how perceptive she is...',
		imageSrc: '/images/games/the-stifling-dark/investigators/aira.png',
		name: 'Aira Wilson',
		minorAbility: 'Inolved Action Mitigation',
		majorAbility: 'Finding the Adversary',
		playstyle: InvestigatorPlaystyle.Objectives,
	},
	{
		description: 'Pain is just a sign to keep going...',
		imageSrc: '/images/games/the-stifling-dark/investigators/asher.png',
		name: 'Asher Palacios',
		minorAbility: 'Wound Management',
		majorAbility: 'Increased Movement',
		playstyle: InvestigatorPlaystyle.Survival,
	},
	{
		description: 'Living on the streets makes a person grow up fast...',
		imageSrc: '/images/games/the-stifling-dark/investigators/brielle.png',
		name: 'Brielle Easton',
		minorAbility: 'Area Control - Alarms',
		majorAbility: 'Event Mitigation',
		playstyle: InvestigatorPlaystyle.Support,
	},
	{
		description: 'Dylan has an exceptional knack for navigating in the dark...',
		imageSrc: '/images/games/the-stifling-dark/investigators/dylan.png',
		name: 'Dylan J. Lee',
		minorAbility: 'Increased Movement',
		majorAbility: 'Reposition',
		playstyle: InvestigatorPlaystyle.Objectives,
	},
	{
		description:
			"Ibraheem's whole life has revolved around working hard to climb to the top...",
		imageSrc: '/images/games/the-stifling-dark/investigators/ibraheem.png',
		name: 'Ibraheem Hess',
		minorAbility: 'Sustained Movement',
		majorAbility: 'Enhanced Trade',
		playstyle: InvestigatorPlaystyle.Objectives,
	},
	{
		description:
			'Most people only understand the basics of focus and mental concentration...',
		imageSrc: '/images/games/the-stifling-dark/investigators/kya.png',
		name: 'Kya Prosser',
		minorAbility: 'Swap Stamina and Charge',
		majorAbility: 'Invert Light Levels',
		playstyle: InvestigatorPlaystyle.Survival,
	},
	{
		description:
			'An indomitable will and relentless resolve make quick work of whatever life brings...',
		imageSrc: '/images/games/the-stifling-dark/investigators/lucy.png',
		name: 'Lucy Belle',
		minorAbility: 'Increased Movement',
		majorAbility: 'Area Control - Barriers',
		playstyle: InvestigatorPlaystyle.Survival,
	},
	{
		description: "Time and time again luck continues to work in Mada's favor.",
		imageSrc: '/images/games/the-stifling-dark/investigators/mada.png',
		name: 'Mada K. Rorrim',
		minorAbility: 'Ability Mitigation',
		majorAbility: 'Increased Movement',
		playstyle: InvestigatorPlaystyle.Support,
	},
	{
		description:
			'Marci knows  it takes to everyone to succeed, gladly lifting others up...',
		imageSrc: '/images/games/the-stifling-dark/investigators/marci.png',
		name: 'Marci Jo',
		minorAbility: 'Sustained Sprint',
		majorAbility: 'Move Investigators',
		playstyle: InvestigatorPlaystyle.Support,
	},
	{
		description:
			'Being an experienced woodsman, Mitchell always keeps his head on a swivel...',
		imageSrc: '/images/games/the-stifling-dark/investigators/mitchell.png',
		name: 'Mitchell Carter',
		minorAbility: 'Finding the Adversary',
		majorAbility: 'Finding the Adversary',
		playstyle: InvestigatorPlaystyle.Scout,
	},
	{
		description:
			'Some kids are blessed with physical ability; others use their aptitude for knowledge...',
		imageSrc: '/images/games/the-stifling-dark/investigators/vincent.png',
		name: 'Vincent Campbell',
		minorAbility: 'Finding Items',
		majorAbility: 'Finding Cursed Items',
		playstyle: InvestigatorPlaystyle.Support,
	},
	{
		description:
			'Winston always felt at home in the woods, and how to make the most out of every situation...',
		imageSrc: '/images/games/the-stifling-dark/investigators/winston.png',
		name: 'Winston Pitts',
		minorAbility: 'Sustained Flashlight',
		majorAbility: 'Stamina Recharge',
		playstyle: InvestigatorPlaystyle.Support,
	},
];
