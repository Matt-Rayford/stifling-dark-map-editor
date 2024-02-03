import { StepType } from '@reactour/tour';

export const newUserSteps: StepType[] = [
	{
		selector: '#create-map',
		content: (
			<div>
				<p>Welcome to The Stifling Dark map editor!</p>
				<p>To get started, let's create a new map here.</p>
			</div>
		),
	},
	{
		selector: '#mapLayer',
		content: (
			<div>
				<img width='100%' src='/images/connect-spaces.gif' />
				<p>Great! The basics of a map have been set up for you.</p>
				<p>You can connect spaces by clicking and dragging, try it out now!</p>
			</div>
		),
	},
	{
		selector: '#settings',
		content: (
			<div>
				<p>
					These are the general map settings that controls the space layout.
					However, we can also upload a background image for our map here!
				</p>
				<p>
					Let's upload a background image for your map by clicking on "Choose
					File." Your map image is automatically saved.
				</p>
			</div>
		),
		position: 'left',
	},
	{
		selector: '#download-button',
		content: (
			<div>
				<p>
					If you want to download an image map, you can do that by clicking the
					"Download" button here.
				</p>
			</div>
		),
	},
	{
		selector: '#mapLayer',
		content: (
			<div>
				<p>Now let's click on any space.</p>
			</div>
		),
		position: 'center',
	},
];
