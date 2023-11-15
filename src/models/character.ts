export type Category = 'king' | 'fighter' | 'adviser' | 'squire' | 'dickson';
export interface Character {
  id: number;
  name: string;
  family: string;
  age: number;
  isAlive: boolean;
  personalQuote: string;
  category: Category;
}

export interface King extends Character {
  reignYears: number;
}
export interface Fighter extends Character {
  weapon: string;
  skillLevel: number;
}

export interface Adviser extends Character {
  adviseTo: Fighter;
}

export interface Squire extends Character {
  serveLevel: number;
  servesTo: Fighter;
}
export type AnyCharacter = King | Fighter | Adviser | Squire;
