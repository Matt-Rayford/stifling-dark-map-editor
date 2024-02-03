import { useEffect, useRef, useState } from 'react';
import AWS from 'aws-sdk';
import mergeImages from 'merge-images';
import { updateSpaceColor } from './utils/canvas';
import { updateMapSettings, uploadMapImage } from './utils/requests';

import { Space } from './models/space';
import { MapSettings } from './graphql/__generated__/graphql';
import { useTour } from '@reactour/tour';

interface Props {
	name: string;
	mapId: string;
	spaceMap: Map<number, Space>;
	mapSettings: MapSettings;
	onUpdateBackgroundImage: (imageUrl: string) => void;
}

const Settings = ({
	name,
	mapId,
	spaceMap,
	mapSettings,
	onUpdateBackgroundImage,
}: Props) => {
	const [origSettings, setOrigSettings] = useState<MapSettings>(mapSettings);
	const [curMapSettings, setCurMapSettings] =
		useState<MapSettings>(mapSettings);

	const onSave = () => {
		updateMapSettings(mapId, curMapSettings);
		setOrigSettings({ ...curMapSettings });
	};

	const onReset = () => {
		setCurMapSettings({ ...origSettings });
		handleColorUpdate(origSettings.spaceColor);
	};

	const onDownload = () => {
		const backgroundCanvas = document.getElementById('mapLayer');
		// @ts-expect-error toDataURL exists on the canvas
		const backgroundImage = backgroundCanvas.toDataURL();

		const canvas = document.getElementById('canvasEditor');
		// @ts-expect-error toDataURL exists on the canvas
		const canvasImage = canvas.toDataURL();

		mergeImages([backgroundImage, canvasImage]).then((b64) => {
			const downloadLink = document.createElement('a');
			downloadLink.download = `${name ?? 'map'}.png`;
			downloadLink.href = b64;
			downloadLink.click();
		});
	};

	const handleImageUpdate = async (file?: File) => {
		if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
			const s3Bucket = process.env.REACT_APP_AWS_S3_BUCKET;
			const s3Region = process.env.REACT_APP_AWS_S3_REGION;

			if (s3Bucket && s3Region) {
				AWS.config.update({
					accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
					secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
				});
				const s3 = new AWS.S3({
					params: { Bucket: s3Bucket },
					region: s3Region,
				});

				const extension = file.type === 'image/png' ? 'png' : 'jpg';
				const imageName = `${mapId}-background.${extension}`;
				const upload = s3
					.putObject({
						Bucket: s3Bucket,
						Key: imageName,
						Body: file,
					})
					.on('httpUploadProgress', (evt) => {
						console.log(`Uploading ${(evt.loaded * 100) / evt.total}%`);
					})
					.promise()
					.then(async (value) => {
						const { error, data } = value.$response;
						if (error) {
							throw error;
						} else {
							const imageUrl = `${process.env.REACT_APP_AWS_S3_URL}${imageName}`;
							const settings = { ...curMapSettings };
							await uploadMapImage(mapId, imageUrl);
							settings.backgroundImageUrl = imageUrl;
							onUpdateBackgroundImage(imageUrl);
							setCurMapSettings(settings);
						}
					});

				await upload;
			}
		}
	};

	const handleColorUpdate = (color: string) => {
		updateSpaceColor(spaceMap, color);
		const settings = { ...curMapSettings };
		settings.spaceColor = color;
		setCurMapSettings(settings);
	};

	const handleOptionsUpdate = (property: string, value: string) => {
		const settings = { ...curMapSettings };
		//@ts-ignore
		settings[property] = value ? parseFloat(value) : '';
		setCurMapSettings(settings);
		for (let space of spaceMap.values()) {
			space.updateDrawOptions(settings);
		}
	};

	return curMapSettings ? (
		<div id='map-settings' style={{ padding: '5px' }}>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>Space color</span>
				</div>
				<input
					type='color'
					className='form-control form-control-color'
					value={mapSettings.spaceColor}
					onChange={(e) => handleColorUpdate(e.target.value)}
				/>
			</div>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>Background Image</span>
				</div>
				<input
					type='file'
					className='form-control'
					accept='image/png, image/jpeg'
					onChange={(e) => handleImageUpdate(e.target.files?.[0])}
				/>
			</div>
			{Object.keys(curMapSettings).map((settingKey) => {
				if (
					settingKey === 'spaceColor' ||
					settingKey === 'backgroundImageUrl' ||
					settingKey === '__typename'
				)
					return null;
				return (
					<div className='input-group mb-3' key={settingKey}>
						<div className='input-group-prepend'>
							<span className='input-group-text'>{settingKey}</span>
						</div>
						<input
							type='number'
							step='0.1'
							className='form-control'
							//@ts-ignore
							value={curMapSettings[settingKey]}
							onChange={(e) => handleOptionsUpdate(settingKey, e.target.value)}
						/>
					</div>
				);
			})}
			<div className='row'>
				<div className='col-6'>
					<button
						type='button'
						className='btn btn-primary w-100'
						onClick={onSave}
					>
						Save
					</button>
				</div>
				<div className='col-6'>
					<button
						type='button'
						className='btn btn-danger w-100'
						onClick={onReset}
					>
						Reset
					</button>
				</div>
			</div>
			<div className='row' style={{ marginTop: '8px' }}>
				<div className='col-12'>
					<button
						id='download-button'
						type='button'
						className='btn btn-secondary w-100'
						onClick={onDownload}
					>
						Download
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default Settings;
