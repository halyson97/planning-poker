export const cardsBack = [
  '/images/back.jpg',
  '/images/back1.png',
  '/images/back2.png',
  '/images/back3.png',
  '/images/back4.jpg',
  '/images/back5.jpg',
];

export const getCard = (): string => {
  const card = cardsBack[Math.floor(Math.random() * cardsBack.length)];
  return card;
};
