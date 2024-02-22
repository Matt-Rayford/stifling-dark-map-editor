import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
	useRef,
	MutableRefObject,
	useMemo,
} from 'react';

import { clearCanvas, redraw, redrawMap } from './canvas';
import { Space } from '../models/space';
import { MousePos } from '../models/mouse-pos';
import { NewConnection } from '../models/connection';

interface MapContextProps {
	backgroundCanvas?: HTMLCanvasElement;
	backgroundImage?: HTMLImageElement;
	backgroundCtx?: CanvasRenderingContext2D;
	canvasWidth: number;
	canvasHeight: number;
	distanceMap: MutableRefObject<Map<number, number> | undefined>;
	mapCanvas?: HTMLCanvasElement;
	mapCtx?: CanvasRenderingContext2D;
	spaceMap?: Map<number, Space>;
	mousePos: MutableRefObject<MousePos>;
	newConnection: MutableRefObject<NewConnection | undefined>;
	outputCanvas?: HTMLCanvasElement;
	clearBackground: () => void;
	generateMapImage: () => Promise<string | undefined>;
	setBackgroundImage: (image: HTMLImageElement) => void;
	setBackgroundCanvas: (canvas: HTMLCanvasElement) => void;
	setMapCanvas: (canvas: HTMLCanvasElement) => void;
	setOutputCanvas: (canvas: HTMLCanvasElement) => void;
	setSpaceMap: (spaceMap: Map<number, Space>) => void;
	setSpaceColor: (color: string) => void;
}

const MapContext = createContext<MapContextProps>({
	canvasWidth: 0,
	canvasHeight: 0,
	distanceMap: { current: undefined },
	mousePos: { current: { x: 0, y: 0 } },
	newConnection: { current: undefined },
	clearBackground: () => {},
	generateMapImage: () => new Promise((resolve, reject) => {}),
	setBackgroundImage: () => {},
	setBackgroundCanvas: () => {},
	setMapCanvas: () => {},
	setOutputCanvas: () => {},
	setSpaceColor: () => {},
	setSpaceMap: () => {},
});

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
	const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement>();
	const [spaceMap, setSpaceMap] = useState<Map<number, Space>>();
	const [spaceColor, setSpaceColor] = useState('#FFFFFF');
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const [backgroundCanvas, setBackgroundCanvas] = useState<HTMLCanvasElement>();
	const [backgroundCtx, setBackgroundCtx] =
		useState<CanvasRenderingContext2D>();

	const [mapCanvas, setMapCanvas] = useState<HTMLCanvasElement>();
	const [mapCtx, setMapCtx] = useState<CanvasRenderingContext2D>();

	const [outputCanvas, setOutputCanvas] = useState<HTMLCanvasElement>();
	const [outputCtx, setOutputCtx] = useState<CanvasRenderingContext2D>();

	const mousePos = useRef<MousePos>({ x: 0, y: 0 });
	const newConnection = useRef<NewConnection>();
	const distanceMap = useRef<Map<number, number>>();

	useEffect(() => {
		if (mapCanvas && mapCtx && spaceMap && spaceColor) {
			const animationTimer = setInterval(() => {
				redraw(
					mapCanvas,
					mapCtx,
					spaceMap,
					spaceColor,
					mousePos.current,
					newConnection.current,
					distanceMap.current
				);
			}, 30);

			setTimer(animationTimer);

			return () => {
				clearInterval(timer);
			};
		}
	}, [mapCanvas, mapCtx, spaceColor, spaceMap]);

	useEffect(() => {
		if (backgroundCanvas) {
			setBackgroundCtx(backgroundCanvas.getContext('2d')!);
		}
	}, [backgroundCanvas]);
	useEffect(() => {
		if (mapCanvas) {
			setMapCtx(mapCanvas.getContext('2d')!);
		}
	}, [mapCanvas]);
	useEffect(() => {
		if (outputCanvas) {
			setOutputCtx(outputCanvas?.getContext('2d')!);
		}
	}, [outputCanvas]);

	useEffect(() => {
		if (
			backgroundImage &&
			backgroundCanvas &&
			backgroundCtx &&
			outputCanvas &&
			outputCtx
		) {
			redrawMap(backgroundCanvas, backgroundCtx, backgroundImage);
			redrawMap(outputCanvas, outputCtx, backgroundImage);
		}
	}, [
		backgroundImage,
		backgroundCanvas,
		backgroundCtx,
		outputCanvas,
		outputCtx,
	]);

	const clearBackground = () => {
		if (backgroundCanvas && backgroundCtx) {
			clearCanvas(backgroundCanvas, backgroundCtx);
		}
	};

	const generateMapImage = async () => {
		if (outputCanvas && outputCtx && spaceMap && spaceColor) {
			console.log('Generate Download Image');
			redraw(
				//@ts-ignore
				outputCanvas,
				outputCtx,
				spaceMap,
				spaceColor,
				mousePos.current,
				newConnection.current,
				distanceMap.current,
				5.496,
				true
			);
			const canvasImage = outputCanvas.toDataURL();
			return canvasImage;
		}
		return undefined;
	};

	const providerVal: MapContextProps = {
		backgroundCanvas,
		backgroundCtx,
		backgroundImage,
		canvasWidth: 1310,
		canvasHeight: 1310,
		distanceMap,
		mapCanvas,
		mapCtx,
		mousePos,
		newConnection,
		outputCanvas,
		spaceMap,
		clearBackground,
		generateMapImage,
		setBackgroundImage,
		setBackgroundCanvas,
		setMapCanvas,
		setOutputCanvas,
		setSpaceColor,
		setSpaceMap,
	};

	return (
		<MapContext.Provider value={providerVal}>{children}</MapContext.Provider>
	);
};

export const useMapContext = () => {
	const mapContext = useContext(MapContext);
	if (!mapContext) {
		throw new Error(
			'ERROR: Cannot use map context outside of <MapContextProvider />'
		);
	}

	return mapContext;
};
