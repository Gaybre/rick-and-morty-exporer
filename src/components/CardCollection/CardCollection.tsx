import type { Character } from '../../types/character'
import CardItem from '../CardItem/CardItem'
import style from './CardCollection.module.scss'

type Props = {
  characters: Character[]
}

const CardCollection = ({ characters }: Props) => {
  const renderCharacters = () => {
    return characters.map((character) => (
      <CardItem character={character} key={character.id} />
    ))
  }

  return <div className={style.container}>{renderCharacters()}</div>
}

export default CardCollection
