export const Errta = () => {
	return (
		<div className='tsd-green-wrapper'>
			<div className='content-container'>
				<h2>Errata</h2>
				<p>
					This section contains rules that were either missing or incorrect and
					will be corrected in a future edition of the game.
				</p>

				<h3>Rulebook</h3>
				<ul>
					<li>
						<p>
							Component List (page 3): The "invest./spirit ability tokens" image
							shows the campfire token, which is from the expansion and is not
							in the base game. The token count is still accurate - there are 12
							small (15mm) tokens and 2 large (30mm) tokens that make up the 14
							tokens.
						</p>
					</li>
					<li>
						<p>
							Component List (page 3): The "general/cursed item tokens" image
							mistakenly shows the two-way radio token, which is not in the game
							anymore (although the item card itself is still in the game). The
							token count is still accurate - there are 8 general item tokens
							and 1 cursed item token.
						</p>
					</li>
					<li>
						<p>
							Map Tokens (page 18): You only gain 1 Secret Passage token when
							selecting that reward. Place the token on an adjacent space, then
							rotate it as you see fit so that it covers another nearby space.
							The two spaces the token covers now count as adjacent, can be
							Moved through by all players (ignoring any tokens, Obstacles, or
							Map Hazards that affect movement), and may still be Interacted
							with. For example, you could place it through the wall between
							spaces 139 and S-29 on the right side of the Sawmill but you
							couldn't connect spaces 139 and S-28 because they are too far
							apart.
						</p>
					</li>
				</ul>

				<h3>Cards</h3>
				<ul>
					<li>
						<p>
							Firestorm Major Event: Losing Stamina in this way incurs face-down
							Wounds per usual, and you may not Move if you have no Stamina.
						</p>
					</li>
				</ul>

				<h3>Player Boards</h3>
				<ul>
					<li>
						<p>
							<span className='bold'>Dylan:</span> Dylan may only return back to
							the Escape Artist token during his current turn or his next turn,
							not at any point during the round.
						</p>
					</li>
					<li>
						<p>
							<span className='bold'>Mada:</span> Mada loses his coin as soon as
							he uses it, whether or not the use was successful. Also, if Mada
							uses his Minor Ability on an Adversary Ability that places tokens
							but does not directly impact an Investigator (such as Evil Eye,
							Tunnel, or Twisted Horn), Mada may move those tokens wherever he
							would like (assuming the coin flip is successful) regardless of
							whether or not they were placed within 4 spaces of him. round.
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
};
