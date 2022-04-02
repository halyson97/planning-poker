export interface CardOption {
  id: number;
  card: string;
}

export const cardsBack: CardOption[] = [
  {
    id: 1,
    card: '/images/back.jpg',
  },
  {
    id: 2,
    card: '/images/back1.png',
  },
  {
    id: 3,
    card: '/images/back2.png',
  },
  {
    id: 4,
    card: '/images/back3.png',
  },
  {
    id: 5,
    card: '/images/back4.jpg',
  },
  {
    id: 6,
    card: '/images/back5.jpg',
  },
];

export const getCard = (id?: number): CardOption => {
  if (id) {
    const card = cardsBack.find((card) => card.id === id);
    if (card) {
      return card;
    }
  }
  const card = cardsBack[Math.floor(Math.random() * cardsBack.length)];
  return card;
};
