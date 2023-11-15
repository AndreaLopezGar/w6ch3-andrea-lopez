import { Fighter, King, Squire, Adviser } from '../models/character';

export type AnyCharacter = King | Fighter | Adviser | Squire;

export class ApiRepo {
  apiUrl = 'http://localhost:3000/characters';

  async getCharacters(): Promise<AnyCharacter[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateCharacter(
    id: AnyCharacter['id'],
    updatedNote: Partial<AnyCharacter>
  ): Promise<AnyCharacter> {
    const finalUrl = `${this.apiUrl}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify(updatedNote),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
}
