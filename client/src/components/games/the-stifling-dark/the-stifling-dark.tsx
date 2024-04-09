import { FlashlightViewer } from './flashlight-viewer';
import { InvestigatorViewer } from './investigator-viewer';

export const TheStiflingDarkPage = () => {
	return (
		<div className='tsd-page'>
			<h1>The Stifling Dark</h1>

			<p>
				The Stifling Dark is a one-vs-many hidden-movement horror board game
				with an innovative line-of-sight mechanic for 2-5 players. One player
				takes the role of the adversary, whose goal is to prevent the other
				players (the investigators) from escaping through a variety of unique
				actions. As an investigator, your only goals are to survive and escape
			</p>

			<p>
				Investigators move around the board in a point-to-point fashion using
				their base movement speed. They may sprint to move more quickly, but
				they need to keep an eye on their stamina so they don't become
				exhausted. Additionally, investigators can pick up and use items, lock
				and unlock doors, or use their flashlights to try and find the
				adversary. Meanwhile, the adversary is secretly moving around the board,
				trying to stop the investigators from escaping. There are a variety of
				investigators to choose from, each with their own special abilities. The
				adversary also has multiple attacks and abilities that change how you
				play the game.
			</p>

			<p>
				Will you fix the car and drive out, or will you override the gate and
				try to sneak out? The investigators will need to decide if they want to
				stick together to watch each other's backs, or split up to race towards
				the exit. Either way, they must move quickly - the longer the game
				takes, the more chances the adversary has to stop them!
			</p>

			<p>
				The game ends when either all of the investigators escape (meaning the
				investigators won) or the adversary achieves their win condition (which
				is different for each adversary).
			</p>

			<InvestigatorViewer />

			<FlashlightViewer />
		</div>
	);
};
