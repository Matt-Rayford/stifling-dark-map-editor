export class MapSettings {
	backgroundImageUrl: string;
	spaceColor: string;
	horizontalSpacing: number;
	verticalSpacing: number;
	indent: number;
	paddingX: number;
	paddingY: number;
	spaceRadius: number;

	constructor(
		backgroundImageUrl: string,
		spaceColor: string,
		horizontalSpacing: number,
		verticalSpacing: number,
		indent: number,
		paddingX: number,
		paddingY: number,
		spaceRadius: number
	) {
		this.backgroundImageUrl = backgroundImageUrl;
		this.spaceColor = spaceColor;
		this.horizontalSpacing = horizontalSpacing;
		this.verticalSpacing = verticalSpacing;
		this.indent = indent;
		this.paddingX = paddingX;
		this.paddingY = paddingY;
		this.spaceRadius = spaceRadius;
	}
}
