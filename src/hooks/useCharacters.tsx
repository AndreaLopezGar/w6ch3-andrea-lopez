import { useCallback, useMemo } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useDispatch, useSelector } from 'react-redux';
import * as ac from '../slices/charactersSlice';
import { RootState } from '../store/store';
import { AnyCharacter } from '../models/character';

export function useCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersState
  );
  const dispatch = useDispatch();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      // Asíncrona
      const loadedCharacters = await repo.getCharacters();
      // Síncrono
      dispatch(ac.load(loadedCharacters));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);

  const updateCharacter = async (
    id: AnyCharacter['id'],
    character: Partial<AnyCharacter>
  ) => {
    try {
      // Asíncrona -> API
      const updatedCharacter = await repo.updateCharacter(id, character);
      // Síncrono -> Vista
      dispatch(ac.update(updatedCharacter));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    loadCharacters,
    updateCharacter,
    characters,
  };
}
