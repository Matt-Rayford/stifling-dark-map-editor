export interface AdversaryDetails {
	name: string;
	description?: string;
	imageSrc: string;
}

export const adversaries: AdversaryDetails[] = [
	{
		description: `Nobody knows what became of that cursed child, but there are a lot of people that claim to see him in the dark corners of the world. \
			You know the feeling. The hair on your neck stands up, chills down your spine. \
			And out in the night, you think you see a figure wathcing you. Passing its own judgment...`,
		name: 'The Butcher',
		imageSrc: '/images/games/the-stifling-dark/adversaries/butcher.jpg',
	},
	{
		description: `To the outsider, Hunlow appears to be a propserous town built on the fortunes of wealthy traders from decades past. \
			But stay out past midnight and you'll hear it. Faint and far away at first. Voices, singing and cahnting, but always unsettling.
			As the night goes on, the voicdes become more frantic until they becomes shrieks, horrible unnerving howls. \
			My advice to you: stay away from Hunlow...`,
		name: 'The Cultists',
		imageSrc: '/images/games/the-stifling-dark/adversaries/cultists.jpg',
	},
	{
		description: `Many people believe there is nothing left unknown in this world, but I can tell you, there is. \
			Nobody wants to think about the fact that we live our entire lives jumping from one tiny bubble to the next, not thinking about what makes us vulnerable. \
			They would rather make up reasons for why people disappear without a trace, that people just "got lost" or simply "never came back." \
			But I've seen that thing one, and I can promise you, people don't just "get lost." They get taken...`,
		name: 'The Insatiable Horror',
		imageSrc:
			'/images/games/the-stifling-dark/adversaries/insatiable-horror.jpg',
	},
];
