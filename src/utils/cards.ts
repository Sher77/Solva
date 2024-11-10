export interface Card {
  card: string;
  background: string;
  link: string;
}

export const cards: Card[] = [
  {
    card: 'Character',
    background: 'linear-gradient(135deg, #4a90e2, #007acc)',
    link: 'people',
  },
  {
    card: 'Planets',
    background: 'linear-gradient(135deg, #50e3c2, #00b894)',
    link: 'planets',
  },
  {
    card: 'Starships',
    background: 'linear-gradient(135deg, #f5a623, #ff8c00)',
    link: 'starships',
  },
];
