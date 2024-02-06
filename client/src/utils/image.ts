export const loadImage = (
	imageUrl: string,
	width: number,
	height: number,
	isLocalImage: boolean = false
): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		let image: HTMLImageElement;
		if (imageUrl) {
			image = new Image(width, height);
			image.src = `${!isLocalImage ? process.env.PUBLIC_URL : ''}${imageUrl}`;
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

export const getImageFromUrl = async (
	imageUrl: string,
	width: number,
	height: number
) => {
	return null;
	if (!imageUrlMap.has(imageUrl)) {
		await addImageToUrlMap(imageUrl, width, height);
	}
	return imageUrlMap.get(imageUrl);
};

export const addImageToUrlMap = async (
	imageUrl: string,
	width: number,
	height: number
) => {
	await toDataURL(imageUrl, async (b64Image) => {
		loadImage(String(b64Image), width, height, true).then((image) => {
			imageUrlMap.set(imageUrl, image);
			return image;
		});
	});
};

export const imageUrlMap = new Map<string, HTMLImageElement>();
