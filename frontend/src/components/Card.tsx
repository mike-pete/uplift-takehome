import clubs from '../assets/Clover.svg';
import diamonds from '../assets/Diamond.svg';
import hearts from '../assets/Heart.svg';
import spades from '../assets/Spade.svg';

export const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
type SuitTupleType = typeof suits;
export type SuitType = SuitTupleType[number];

const cardValueLabels: Record<number, string> = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
};

const cardSuitImage: Record<SuitType, string> = {
  diamonds,
  hearts,
  clubs,
  spades,
};

const Card: React.FC<{ value: number; suit: SuitType }> = ({ value, suit }) => {
  if (value < 1 || value > 13) {
    console.error('Invalid card value provided!');
    return null;
  }

  const cardValueLabel = value in cardValueLabels ? cardValueLabels[value] : value;

  const textColor = suit === 'diamonds' || suit === 'hearts' ? 'text-custom-red' : 'text-black';

  return (
    <div className="relative inline-flex select-none flex-col items-start rounded-2xl bg-white p-4 pb-2">
      <div className="flex flex-col items-center ">
        <p className={`font-CourierPrime text-6xl font-bold ${textColor}`}>{cardValueLabel}</p>
        <img className="h-7 w-7" src={cardSuitImage[suit]} alt={suit} />
      </div>
      <div className="relative -top-2 pl-8">
        <img className="h-16 w-16" src={cardSuitImage[suit]} alt={suit} />
      </div>
    </div>
  );
};

export default Card;
