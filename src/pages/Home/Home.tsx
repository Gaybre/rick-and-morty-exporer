import { useEffect } from 'react'
import { getCharacters } from '../../api/characters'
import FilterBar from '../../components/FilterBar/FilterBar'
import Header from '../../components/Header/Header'
import style from './Home.module.scss'

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const test = await getCharacters()
      console.log(test)
    }
    fetchData()
  }, [])
  return (
    <main>
      <Header />
      <section className={style.mainSection}>
        <FilterBar />
      </section>
    </main>
  )
}

export default Home
