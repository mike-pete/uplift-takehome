import ConfettiExplosion from 'react-confetti-explosion';
import banner from '../../assets/winner.svg';
import Card from '../Card';
import useGameState from './hooks/useGameState';

const StatBlock: React.FC<{ label: string; stat: number }> = ({ label, stat }) => {
  return (
    <div className="border-custom-yellow-border  v inline-block border bg-black p-4 text-white">
      <h2 className="text-center text-3xl font-bold">{stat}</h2>
      <p className="text-center">{label}</p>
    </div>
  );
};

const Game = () => {
  const { deal, reset, visibleCards, cardsLeft, acesLeft, status } = useGameState();

  return (
    <main className="from-custom-green-board-top to-custom-green-board-bottom flex min-h-screen flex-col gap-8 bg-gradient-to-b py-8 sm:gap-12">
      {status === 'won' && (
        <div className="absolute w-full flex flex-col items-center justify-center top-32">
          <img src={banner} alt="Winner!" className="w-full max-w-3xl" />
          <ConfettiExplosion />
        </div>
      )}
      <div className="flex flex-grow items-center justify-center gap-4">
        <StatBlock label="Cards Left" stat={cardsLeft} />
        <StatBlock label="Aces Left" stat={acesLeft} />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {visibleCards.map((card, i) => (
          <div
            className="animate-slide-in opacity-0"
            style={{ animationDelay: `${i * 50}ms` }}
            key={`${card.value}${card.suit}${cardsLeft}`}
          >
            <Card value={card.value} suit={card.suit} />
          </div>
        ))}
      </div>

      {status === 'playing' && (
        <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:relative sm:flex-row sm:items-start">
          <button
            type="button"
            className="font-AlfaSlab bg-custom-yellow-deal select-none rounded-2xl px-14 py-4 text-6xl text-black"
            onClick={deal}
          >
            Deal
          </button>
          <button
            type="button"
            className="font-AlfaSlab text-custom-yellow-reset border-custom-yellow-reset select-none rounded-lg border-2 px-4 py-0.5 text-2xl sm:absolute sm:bottom-4 sm:right-4"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      )}

      {status !== 'playing' && (
        <div className="flex flex-grow flex-col items-center gap-8">
          {status === 'lost' && (
            <div className="font-CourierPrime select-none text-2xl text-white">
              <p className="text-center">You lose.</p>
              <p className="text-center">Better luck next time!</p>
            </div>
          )}
          <button
            type="button"
            className="font-AlfaSlab text-custom-yellow-reset border-custom-yellow-reset select-none rounded-lg border-2 px-4 py-0.5 text-2xl"
            onClick={reset}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
};

export default Game;
