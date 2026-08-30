import style from './Header.module.scss'
import Logo from '../../assets/logo.png'

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.headerContent}>
        <div className={style.text}>
          <h1>
            Rick & Morty <span>Explorer</span>
          </h1>
          <p>Explore characters from the multiverse</p>
        </div>
        <img src={Logo} className={style.logo} alt="Rick & Morty logo" />
      </div>
    </div>
  )
}

export default Header
