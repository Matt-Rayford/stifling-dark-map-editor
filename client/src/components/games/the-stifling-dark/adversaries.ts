export interface AdversaryDetails {
	name: string;
	description?: string;
	imageSrc: string;
}

export const adversaries: AdversaryDetails[] = [
	{
		name: 'The Butcher',
		imageSrc: '/images/games/the-stifling-dark/adversaries/butcher.jpg',
	},
	{
		name: 'The Cultists',
		imageSrc: '/images/games/the-stifling-dark/adversaries/cultists.jpg',
	},
	{
		name: 'The Insatiable Horror',
		imageSrc:
			'/images/games/the-stifling-dark/adversaries/insatiable-horror.jpg',
	},
];
