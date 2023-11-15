import { useCallback, useMemo } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useDispatch } from 'react-redux';
import { AnyCharacter } from '../models/character';

import {
  loadCharacterThunk,
  updateCharacterThunk,
} from '../slices/characters.thunks';
import { AppDispatch } from '../store/store';
export function useCharacters() {
  const dispatch = useDispatch<AppDispatch>();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      dispatch(loadCharacterThunk(repo));
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
        updateCharacterThunk({
          id,
          repo,
          updatedCharacter: character,
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
