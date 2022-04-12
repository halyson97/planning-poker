import { CardOption } from '../pages/Room/ListUsers/cards';

export interface User {
  username: string;
  id: string;
  card?: string;
  isPlayer: boolean;
  message?: string;
  cardSelected?: CardOption;
  color?: string;
}
