import { useEffect, useState } from 'react'
import type { Character } from '../../types/character'
import { ERRORS, getCharacters } from '../../api/characters'
import CardCollection from '../../components/CardCollection/CardCollection'
import FilterBar from '../../components/FilterBar/FilterBar'
import SortBar from '../../components/SortBar/SortBar'
import Header from '../../components/Header/Header'
import style from './Home.module.scss'

const Home = () => {
  const [data, setData] = useState<Character[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true)
      try {
        const characters = await getCharacters()
        setData(characters.results)
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : ERRORS.SOMETHING_WENT_WRONG
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [])

  const renderContent = () => {
    if (loading) {
      return <p className={style.marginLayout}>Loading...</p>
    } else if (error) {
      return (
        <p className={style.marginLayout}>
          {error === ERRORS.NOT_FOUND
            ? 'No characters found.'
            : 'Something went wrong.'}
        </p>
      )
    } else {
      return <CardCollection characters={data} />
    }
  }

  return (
    <main>
      <Header />
      <section className={style.mainSection}>
        <FilterBar loading={loading} />
        <SortBar results={data.length} loading={loading} />
        {renderContent()}
      </section>
    </main>
  )
}

export default Home
