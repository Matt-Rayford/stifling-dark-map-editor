export const FAQs = () => {
	return (
		<div className='content-container'>
			<h2>FAQs</h2>
			<p>
				The following FAQs have been added after the fact and are not present in
				the rulebook FAQ section. We will continue to update this section as/if
				we see the same questions being asked on a regular basis:
			</p>

			<ul>
				<li>
					<p className='bold'>
						Can The Insatiable Horror use Ambush to move Investigators that are
						already adjacent to him?
					</p>
					<p>
						Yes, The Horror can move Investigators that are already adjacent to
						him as part of an Ambush as long as there is another empty space
						adjacent to him. This would typically be done to force the
						Investigator to drop their Flashlight. Don't forget that distances
						for Ambush are checked before any Flashlights are removed though!
					</p>
				</li>
				<li>
					<p className='bold'>[Nightfall] How does Spotlight work?</p>
					<p>
						Spotlight counts as if you were using your Flashlight normally. As
						such, you can Sweep with it if you are playing as Mitchell, and it
						is affected by other abilities that affect Flashlights (such as
						Darkness).
					</p>
				</li>
			</ul>

			<p>
				The remaining FAQs are present in the rulebook FAQ section but are
				included here for posterity's sake:
			</p>
			<ul>
				<li>
					<p className='bold'>How does Brielle's Minor Ability work?</p>
					<p>
						If a Can token is placed on the space the Adversary is on, it
						doesn't flip over. Multiple Can tokens can be placed during a single
						turn, and you cannot get the Cans back once you have placed them.
					</p>
				</li>
				<li>
					<p className='bold'>How does Mitchell's Minor Ability work?</p>
					<p>
						First, he places his Flashlight in one position, Revealing anything
						on the mini-map as usual. Then, he may move his Flashlight to a new
						position where it will remain for the rest of the round. A Sweep
						still costs only 1 Charge. You are not required to perform a
						Flashlight Sweep when using your Flashlight, and you may leave your
						Flashlight in its initial position. A Flashlight Sweep may only be
						used with your Flashlight, not other sources of light like the
						Emergency Flare.
					</p>
				</li>
				<li>
					<p className='bold'>How does Dylan's Major Ability work?</p>
					<p>
						After placing the Escape Artist token, it is removed at the{' '}
						<span className='bold'>end</span> of your next turn (during the next
						round) whether or not you use it. It is useful for retrieving a
						token and returning to where you started.
					</p>
				</li>
				<p className='bold'>How does Lucy's Major Ability work?</p>
				<p>
					If Lucy uses her Ability more than once, any Barricades that are
					already on the board move to where the new ones are being placed. In
					other words, she doesn't gain new Barricades every time.
				</p>
				<li>
					<p className='bold'>
						Can an Investigator Open a Door with a Security Bar on it?
					</p>
					<p>
						Yes, it can be Opened as usual but the Security Bar token is
						discarded.
					</p>
				</li>
				<li>
					<p className='bold'>What happens if a card is impossible to use?</p>
					<p>
						If a card is impossible to use when you{' '}
						<span className='bold'>gain</span> it, draw a new one. If the card
						is possible when you gain it and{' '}
						<span className='bold'>becomes</span> impossible afterwards, you do
						not get to draw a new card since you had a chance to use it.
					</p>
				</li>
			</ul>
		</div>
	);
};
