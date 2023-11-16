import { useCallback, useMemo } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useDispatch } from 'react-redux';
import {
  loadCharactersThunk,
  updateCharactersThunk,
} from '../slices/characters.thunks';
import { AppDispatch } from '../store/store';
import { AnyCharacter } from '../models/character';

export function useCharacters() {
  const dispatch = useDispatch<AppDispatch>();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      dispatch(loadCharactersThunk(repo));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);

  const updateCharacter = async (
    id: AnyCharacter['id'],
    character: Partial<AnyCharacter>
  ) => {
    try {
      dispatch(
        updateCharactersThunk({
          id,
          repo,
          updatedTask: character,
        })
      );
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    loadCharacters,
    updateCharacter,
  };
}
