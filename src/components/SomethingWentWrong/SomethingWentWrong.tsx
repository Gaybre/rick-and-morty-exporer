import Error from '../../assets/something-went-wrong.webp'
import styles from './../NotFound/NotFound.module.scss'

const SomethingWentWrong = () => {
  return (
    <div className={styles.errorContainer}>
      <img src={Error} alt="Something went wrong image" />
      <h2>Something went wrong.</h2>
    </div>
  )
}

export default SomethingWentWrong
