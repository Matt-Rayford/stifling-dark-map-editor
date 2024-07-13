import { OurGames } from './games/our-games';

export const Home = () => {
  return (
    <div className="content-container v-stack gap-2">
      <div className="v-stack gap-1">
        <h2>Our Games</h2>
        <OurGames />
      </div>
    </div>
  );
};
