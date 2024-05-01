import { useState } from 'react';
import { suits, SuitType } from '../components/Card';

export type CardType = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  suit: SuitType;
};

type GameStateType = {
  deck: CardType[];
  newHandsDealt: number;
};

type ActionType = { type: 'deal' } | { type: 'reset' };

const cardsToDeal = 5;

const createDeck = (): CardType[] => {
  const deck: CardType[] = [];
  suits.forEach((suit) => {
    for (let value = 1; value <= 13; value++) {
      deck.push({ value: value as CardType['value'], suit });
    }
  });
  return deck;
};

const shuffleDeck = (deck: CardType[]): CardType[] => {
  // Fisher–Yates shuffle
  for (let index = deck.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
  }
  return deck;
};

const useGameState = () => {
  const [deck, setDeck] = useState<CardType[]>(shuffleDeck(createDeck()));
  const [newHandsDealt, setNewHandsDealt] = useState(0);

  const reset = () => {
    const deck = createDeck();
    shuffleDeck(deck);
    setDeck(deck);
    setNewHandsDealt(0);
  };

  const deal = () =>
    setNewHandsDealt((prev) => {
      if ((prev + 1) * cardsToDeal >= deck.length) {
        return prev;
      }
      return prev + 1;
    });

  const visibleCards = deck.slice(newHandsDealt * cardsToDeal, (newHandsDealt + 1) * cardsToDeal);

  const cardsDealt = (newHandsDealt + 1) * cardsToDeal;
  const cardsRemaining = deck.length - cardsDealt;
  const cardsLeft = cardsRemaining > 0 ? cardsRemaining : 0;

  const acesLeft = deck
    .slice((newHandsDealt + 1) * cardsToDeal)
    .filter((card) => card.value === 1).length;

  let status: 'playing' | 'won' | 'lost' = 'playing';
  if (cardsLeft === 0) {
    if (visibleCards.some((card) => card.value === 1)) {
      status = 'won';
    } else {
      status = 'lost';
    }
  }

  return {
    deal,
    reset,
    visibleCards,
    cardsLeft,
    acesLeft,
    status,
  };
};

export default useGameState;
