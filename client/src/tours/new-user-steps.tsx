import { StepType } from '@reactour/tour';

const TOP_MARGIN = '16px';

export const newUserSteps: StepType[] = [
	{
		selector: '#create-map',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<p>Welcome to The Stifling Dark map editor!</p>
				<p>To get started, let's create a new map here.</p>
			</div>
		),
	},
	{
		selector: '#settings',
		content: (
			<div>
				<p>Great! The basics of a map have been set up for you.</p>
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
			<div style={{ marginTop: TOP_MARGIN }}>
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
			<div style={{ marginTop: TOP_MARGIN }}>
				<img width='100%' src='/images/select-space.gif' />

				<p>Now let's click on any space so we can access its settings.</p>
			</div>
		),
		position: 'center',
	},
	{
		selector: '#settings',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<p>Let's open the "Space #" tab and take a look.</p>
			</div>
		),
		position: 'left',
	},
	{
		selector: '#general-space-section',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<img width='100%' src='/images/generate-distances.gif' />

				<p>
					From this section we can control the type of space we want and it's
					brightness level. The brightness level determines how many movement
					point it costs to move onto. This will impact our distance generator.
				</p>
				<p>
					The two buttons here will generate the distances from the current
					space to every other space. You can turn it off by click the "Disable
					Distances" button.
				</p>
			</div>
		),
		position: 'left',
	},
	{
		selector: '#groups-section',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<p>
					From the Groups section we can assign a group to a space. For example,
					the Lumber Shed. We'll go over how to set up groups shortly.
				</p>
			</div>
		),
		position: 'left',
	},
	{
		selector: '#connections-section',
		content: (
			<div>
				<p>
					This section is where we can manage what other spaces the selected
					space is connected too. Let's delete a few connections now.
				</p>
			</div>
		),
		position: 'left',
	},
	{
		selector: '#mapLayer',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<img width='100%' src='/images/connect-spaces.gif' />

				<p>
					Now that some connections have been deleted, let's reconnect them. You
					can connect spaces by clicking on one space and dragging the
					connection to another. Go ahead and connect two now.
				</p>
			</div>
		),
	},
	{
		selector: '#settings',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<p>Lastly, let's open up the "Tools" menu.</p>
			</div>
		),
		position: 'left',
	},
	{
		selector: '#space-group-settings',
		content: (
			<div style={{ marginTop: TOP_MARGIN }}>
				<p>
					From here, you can add and update your space groups. When add a new
					group, give it a name and a prefix. The prefix will be applied to any
					spaces in this group, such as "T-1."
				</p>
				<p>And that's all there is to it! Enjoy creating your maps!</p>
			</div>
		),
		position: 'left',
	},
];
