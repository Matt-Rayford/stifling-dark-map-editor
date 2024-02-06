import { SpaceTypesQuery } from '../graphql/__generated__/graphql';
import { addImageToUrlMap } from './image';

export const initializeSpaceTypes = (
	spaceTypes: SpaceTypesQuery['spaceTypes'],
	spaceRadius: number
) => {
	if (spaceTypes) {
		for (let spaceType of spaceTypes) {
			if (spaceType?.iconUrl) {
				addImageToUrlMap(spaceType.iconUrl, spaceRadius, spaceRadius);
			}
		}
	}
};
