export const loadImage = (imageUrl: string, width: number, height: number) =>
	new Promise((resolve, reject) => {
		let image: HTMLImageElement;
		if (imageUrl) {
			image = new Image(width, height);
			image.src = `${process.env.PUBLIC_URL}${imageUrl}`;
			image.crossOrigin = 'Anonymous';
			image.onload = () => {
				resolve(image);
			};
			image.onerror = () => {
				reject(`ERROR: Could not find image at ${imageUrl}`);
			};
		}
	});

export const toDataURL = (
	url: string,
	callback: (result: string | ArrayBuffer | null) => void
) => {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		};
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
};
