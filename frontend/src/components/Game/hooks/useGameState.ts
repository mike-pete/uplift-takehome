import { useState } from 'react';
import { suits, SuitType } from '../../Card';

export type CardType = {
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  suit: SuitType;
};

export const createDeck = (): CardType[] => {
  const deck: CardType[] = [];
  suits.forEach((suit) => {
    for (let value = 1; value <= 13; value++) {
      deck.push({ value: value as CardType['value'], suit });
    }
  });
  return deck;
};

export const shuffleDeck = (deck: CardType[]): CardType[] => {
  const shuffledDeck = [...deck];
  for (let index = shuffledDeck.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledDeck[index], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[index],
    ];
  }
  return shuffledDeck;
};

const useGameState = (
  initializeDeck: CardType[] | (() => CardType[]) = () => shuffleDeck(createDeck())
) => {
  const cardsToDeal = 5;
  const [deck, setDeck] = useState<CardType[]>(initializeDeck);
  const [newHandsDealt, setNewHandsDealt] = useState(0);

  const reset = () => {
    setDeck(initializeDeck);
    setNewHandsDealt(0);
  };

  const deal = () =>
    setNewHandsDealt((prev) => {
      const allCardsDealt = (prev + 1) * cardsToDeal >= deck.length;
      return allCardsDealt ? prev : prev + 1;
    });

  const visibleCards = deck.slice(newHandsDealt * cardsToDeal, (newHandsDealt + 1) * cardsToDeal);

  const cardsDealt = (newHandsDealt + 1) * cardsToDeal;
  const cardsRemaining = deck.length - cardsDealt;
  const cardsLeft = cardsRemaining > 0 ? cardsRemaining : 0;

  const acesLeft = deck
    .slice((newHandsDealt + 1) * cardsToDeal)
    .filter((card) => card.value === 1).length;

  let status: 'playing' | 'won' | 'lost' = 'playing';

  const allCardsDealt = cardsDealt >= deck.length;
  if (allCardsDealt) {
    const lastHandHasAce = visibleCards.some((card) => card.value === 1);
    status = lastHandHasAce ? 'won' : 'lost';
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
