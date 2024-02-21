import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
	useRef,
	MutableRefObject,
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
	mapCanvas?: HTMLCanvasElement;
	mapCtx?: CanvasRenderingContext2D;
	spaceMap?: Map<number, Space>;
	mousePos: MutableRefObject<MousePos>;
	newConnection: MutableRefObject<NewConnection | undefined>;
	distanceMap: MutableRefObject<Map<number, number> | undefined>;
	clearBackground: () => void;
	setBackgroundImage: (image: HTMLImageElement) => void;
	setBackgroundCanvas: (canvas: HTMLCanvasElement) => void;
	setMapCanvas: (canvas: HTMLCanvasElement) => void;
	setSpaceMap: (spaceMap: Map<number, Space>) => void;
	setSpaceColor: (color: string) => void;
}

const MapContext = createContext<MapContextProps>({
	canvasWidth: 0,
	canvasHeight: 0,
	mousePos: { current: { x: 0, y: 0 } },
	newConnection: { current: undefined },
	distanceMap: { current: undefined },
	clearBackground: () => {},
	setBackgroundImage: () => {},
	setBackgroundCanvas: () => {},
	setMapCanvas: () => {},
	setSpaceColor: () => {},
	setSpaceMap: () => {},
});

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
	const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement>();
	const [spaceMap, setSpaceMap] = useState<Map<number, Space>>();
	const [spaceColor, setSpaceColor] = useState('#FFFFFF');
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	const mousePos = useRef<MousePos>({ x: 0, y: 0 });
	const newConnection = useRef<NewConnection>();
	const distanceMap = useRef<Map<number, number>>();

	const [backgroundCanvas, setBackgroundCanvas] = useState<HTMLCanvasElement>();
	const [backgroundCtx, setBackgroundCtx] =
		useState<CanvasRenderingContext2D>();

	const [mapCanvas, setMapCanvas] = useState<HTMLCanvasElement>();
	const [mapCtx, setMapCtx] = useState<CanvasRenderingContext2D>();

	useEffect(() => {
		if (mapCanvas && mapCtx && spaceMap && spaceColor) {
			console.log('initialize animation');
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
		if (backgroundImage && backgroundCanvas && backgroundCtx) {
			redrawMap(backgroundCanvas, backgroundCtx, backgroundImage);
		}
	}, [backgroundImage]);

	const clearBackground = () => {
		if (backgroundCanvas && backgroundCtx) {
			clearCanvas(backgroundCanvas, backgroundCtx);
		}
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
		spaceMap,
		clearBackground,
		setBackgroundImage,
		setBackgroundCanvas,
		setMapCanvas,
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
