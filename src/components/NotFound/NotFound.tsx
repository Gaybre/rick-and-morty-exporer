import NotFoundImg from '../../assets/paz-between-worlds.webp'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.errorContainer}>
      <img src={NotFoundImg} alt="not characters found image" />
      <h2>No characters found.</h2>
    </div>
  )
}

export default NotFound
