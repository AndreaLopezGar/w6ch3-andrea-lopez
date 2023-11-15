import { createAsyncThunk } from '@reduxjs/toolkit';
import { Character } from '../models/character';
import { ApiRepo } from '../services/api.repo';


export const loadCharacterThunk = createAsyncThunk<Character[], ApiRepo>(
  'load',
  async(repo) => {
    const characters.state = await repo.getCharacters();
    return characters.state;
  }
);

type Params = {
  repo: ApiRepo;
  newTask: Partial<Character>;
};

export const updateCharacterThunk = createAsyncThunk<
  Character,
  {
    repo: ApiRepo;
    id: Character['id'];
    updatedCharacter: Partial<Character>;
  }
>('tasks/update', async ({ repo, id, updatedCharacter }) => {
  const finalCharacter = await repo.updatedCharacter(id, updatedCharacter);
  return finalCharacter;
});
