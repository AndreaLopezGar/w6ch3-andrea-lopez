import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../services/api.repo';
import { AnyCharacter } from '../models/character';

export const loadCharactersThunk = createAsyncThunk<AnyCharacter[], ApiRepo>(
  'tasks/load',
  async (repo) => {
    const tasks = await repo.getCharacters();
    return tasks;
  }
);

export const updateCharactersThunk = createAsyncThunk<
  AnyCharacter,
  {
    repo: ApiRepo;
    id: AnyCharacter['id'];
    updatedTask: Partial<AnyCharacter>;
  }
>('tasks/update', async ({ repo, id, updatedTask }) => {
  const finalTask = await repo.updateCharacter(id, updatedTask);
  return finalTask;
});
