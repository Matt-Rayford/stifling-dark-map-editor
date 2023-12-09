export interface LightLevelDetails {
	name: string;
	movementCost: number;
}

export enum LightLevel {
	BRIGHT = 'BRIGHT',
	DIM = 'DIM',
	PITCH_BLACK = 'PITCH_BLACK',
}

export const LightLevels = {
	DIM: { enumVal: 'DIM' },
	PITCH_BLACK: {
		enumVal: 'PITCH_BLACK',
	},
};

export const getLightLevelDetails = (
	lightLevel: LightLevel
): LightLevelDetails => {
	switch (lightLevel) {
		case LightLevel.BRIGHT:
			return {
				name: 'Bright Space',
				movementCost: 1,
			};
		case LightLevel.DIM:
			return {
				name: 'Dim Space',
				movementCost: 1,
			};
		case LightLevel.PITCH_BLACK:
			return {
				name: 'Pitch Black Space',
				movementCost: 2,
			};

		default:
			return {
				name: 'Dim Space',
				movementCost: 1,
			};
	}
};
