import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnyCharacter } from '../models/character';

type CharactersState = {
  characters: AnyCharacter[];
};

const initialState: CharactersState = {
  characters: [],
};
const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    load: (
      state: CharactersState,
      { payload }: PayloadAction<AnyCharacter[]>
    ) => {
      state.characters = payload;
      return state;
    },
    update: (
      state: CharactersState,
      { payload }: PayloadAction<AnyCharacter>
    ) => {
      state.characters[
        state.characters.findIndex((item) => item.id === payload.id)
      ] = payload;
      return state;
    },
  },
});

export default charactersSlice.reducer;
export const { load, update } = charactersSlice.actions;
