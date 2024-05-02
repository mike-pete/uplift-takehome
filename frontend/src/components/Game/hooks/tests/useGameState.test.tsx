import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SuitType } from '../../../Card';
import useGameState, { CardType, createDeck, shuffleDeck } from '../useGameState';

test('createDeck returns 52 cards', () => {
  const deck = createDeck();
  expect(deck.length).toBe(52);
});

test("createDeck doesn't include duplicate cards", () => {
  const deck = createDeck();
  const deckAsString = deck.map(({ suit, value }) => `${value} of ${suit}`);
  const deckAsStringSet = new Set(deckAsString);
  expect(deck.length).toBe(deckAsStringSet.size);
});

test('createDeck only contains cards with value between 1 and 13', () => {
  const deck = createDeck();
  let max = -Infinity;
  let min = Infinity;

  deck.forEach((card) => {
    max = card.value > max ? card.value : max;
    min = card.value < min ? card.value : min;
  });

  expect(max).toBe(13);
  expect(min).toBe(1);
});

test('shuffled deck has the same number of cards', () => {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);
  expect(deck.length).toBe(shuffledDeck.length);
});

test('useGameState should return 5 visible cards initially', () => {
  const deck = createDeck();
  const { result } = renderHook(() => useGameState(deck));
  expect(result.current.visibleCards).toEqual(deck.slice(0, 5));
});

test('useGameState should have a "playing" status when there are still cards left to deal', () => {
  const { result } = renderHook(() => useGameState());
  expect(result.current.status).toBe('playing');
});

test('useGameState should have a "won" status when no more cards to deal and the last hand contains an ace', () => {
  const { result } = renderHook(() =>
    useGameState([
      { value: 1, suit: 'hearts' },
      { value: 2, suit: 'hearts' },
    ])
  );
  expect(result.current.status).toBe('won');
});

test('useGameState should have a "lost" status when no more cards to deal and the last hand doesn\'t contain an ace', () => {
  const { result } = renderHook(() =>
    useGameState([
      { value: 2, suit: 'hearts' },
      { value: 3, suit: 'hearts' },
    ])
  );
  expect(result.current.status).toBe('lost');
});

test('useGameState should deal 5 cards when deal is invoked', () => {
  const exampleHand = (suit: SuitType): CardType[] => [
    { value: 1, suit },
    { value: 2, suit },
    { value: 3, suit },
    { value: 4, suit },
    { value: 5, suit },
  ];

  const expectedHand = exampleHand('spades');

  const { result } = renderHook(() => useGameState([...exampleHand('hearts'), ...expectedHand]));
  act(() => {
    result.current.deal();
  });
  expect(result.current.visibleCards).toEqual(expectedHand);
});

test('useGameState should deal remaining cards in last hand', () => {
  const firstHand: CardType[] = [
    { value: 1, suit: 'hearts' },
    { value: 2, suit: 'hearts' },
    { value: 3, suit: 'hearts' },
    { value: 4, suit: 'hearts' },
    { value: 5, suit: 'hearts' },
  ];

  const finalHand: CardType[] = [
    { value: 1, suit: 'spades' },
    { value: 2, suit: 'spades' },
  ];

  const { result } = renderHook(() => useGameState([...firstHand, ...finalHand]));
  act(() => {
    result.current.deal();
  });
  expect(result.current.visibleCards).toEqual(finalHand);
});

// TODO: createDeck only returns with valid suits
// TODO: useGameState reset invokes the initializeDeck function
// TODO: useGameState reset sets the status to playing
// TODO: useGameState reset sets visibleCards to the first 5 cards
// TODO: useGameState resets cardsLeft
// TODO: useGameState resets acesLeft
// TODO: useGameState returns proper cardsLeft
// TODO: useGameState returns proper acesLeft
