import Card from './components/Card';
import useGameState from './hooks/useGameState';

const StatBlock: React.FC<{ label: string; stat: number }> = ({ label, stat }) => {
  return (
    <div className="border-custom-yellow-border inline-block border bg-black p-4 text-white">
      <h2 className="text-center">{stat}</h2>
      <p className="text-center">{label}</p>
    </div>
  );
};

const App = () => {
  const { deal, reset, visibleCards, cardsLeft, acesLeft, status } = useGameState();

  return (
    <main className="from-custom-green-board-top to-custom-green-board-bottom min-h-screen bg-gradient-to-b">
      4 hr mark
      <StatBlock label="Cards Left" stat={cardsLeft} />
      <StatBlock label="Aces Left" stat={acesLeft} />
      <div className="flex flex-wrap gap-4">
        {visibleCards.map((card, i) => (
          <Card key={i} value={card.value} suit={card.suit} />
        ))}
      </div>
      <button onClick={deal}>Dealad</button>
      <button onClick={reset}>reset</button>
      <p>status: {status} </p>
    </main>
  );
};

export default App;
