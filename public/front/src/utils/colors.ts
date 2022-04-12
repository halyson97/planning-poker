export const colors = [
  '#e42565',
  '#01bcd1',
  '#699d16',
  '#673ab7',
  '#f44336',
  '#3f51b5',
  '#5d4037',
  '#455a64',
];

export const getRandomColor = (): string => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};
