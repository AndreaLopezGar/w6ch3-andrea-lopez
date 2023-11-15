import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../models/character';
import {
  loadCharacterThunk,
  updateCharacterThunk,
} from './characters.thunks';

type CharacterState = {
  characters: Character[];
  charactersState: 'idle' | 'loading' | 'error';
  page: number;
};

const initialState: CharacterState = {
  characters: [],
  charactersState: 'idle',
  page: 1,
};

const tasksSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCharacterThunk.pending, (state: CharacterState) => {
      state.charactersState = 'loading';
      return state;
    }),
      builder.addCase(
        loadCharacterThunk.fulfilled,
        (state: CharacterState, { payload }: PayloadAction<Character[]>) => {
          state.characters = payload;
          state.charactersState = 'idle';
          return state;
        }
      ),
      builder.addCase(loadCharacterThunk.rejected, (state: CharacterState) => {
        state.charactersState = 'error';
        return state;
      }),
      builder.addCase(
        updateCharacterThunk.fulfilled,
        (state: CharacterState, { payload }: PayloadAction<Character>) => {
          state.characters[state.characters.findIndex((item) => item.id === payload.id)] =
            payload;
          return state;
        }
      ),
})
export default Slice.reducer;
