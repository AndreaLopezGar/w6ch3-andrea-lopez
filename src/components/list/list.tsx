import { useEffect } from 'react';
import { Card } from '../card/card';
import { useCharacters } from '../../hooks/useCharacters';
import '../../main.scss';

export function List() {
  const { characters, loadCharacters } = useCharacters();

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);
  return (
    <ul className="characters-list row list-unstyled">
      {characters.map((item) => (
        <Card key={item.name} character={item}></Card>
      ))}
    </ul>
  );
}
