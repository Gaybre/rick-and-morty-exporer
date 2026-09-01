import type { Character } from '../../types/character'
import { icons } from '../Icons/Icons'
import style from './CardItem.module.scss'

type Props = {
  character: Character
}

const CardItem = ({ character }: Props) => {
  const statusMap = {
    Dead: icons.dead,
    Alive: icons.alive,
    unknown: icons.unknown,
  }

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img src={character.image} alt={`this is ${character.name}`} />
        <p className={style.status}>
          <span className={style[character.status.toLocaleLowerCase()]}>
            {statusMap[character.status]}
          </span>
          {character.status}
        </p>
      </div>
      <div className={style.details}>
        <p className={style.name}>{character.name}</p>
        <p className={style.text}>{character.species}</p>
        <p className={style.text}>{character.gender}</p>
        <p className={style.text}>{character.origin.name}</p>
      </div>
    </div>
  )
}

export default CardItem
