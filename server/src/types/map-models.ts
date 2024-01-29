export class Connection {
	startX: number;
	startY: number;
	endX: number;
	endY: number;

	constructor(startX: number, startY: number, endX: number, endY: number) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
}

export class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
