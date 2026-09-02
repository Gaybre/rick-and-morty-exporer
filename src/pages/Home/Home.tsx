import { useEffect, useMemo, useState } from 'react'
import type {
  Character,
  CharacterFilters,
  CharacterSort,
} from '../../types/character'
import { ERRORS, getCharacters } from '../../api/characters'
import { sortCharacters } from '../../utils/sortCharacters'
import CardCollection from '../../components/CardCollection/CardCollection'
import FilterBar from '../../components/FilterBar/FilterBar'
import SortBar from '../../components/SortBar/SortBar'
import Header from '../../components/Header/Header'
import style from './Home.module.scss'

const Home = () => {
  const [data, setData] = useState<Character[]>([])
  const [sortValue, setSortValue] = useState<CharacterSort>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [filters, setFilters] = useState<CharacterFilters>({})
  const sortedData = useMemo(
    () => sortCharacters(data, sortValue),
    [sortValue, data],
  )

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true)
      setError('')
      try {
        const characters = await getCharacters(filters)
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
  }, [filters])

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
      return <CardCollection characters={sortedData} />
    }
  }

  return (
    <main>
      <Header />
      <section className={style.mainSection}>
        <FilterBar loading={loading} refresh={setFilters} />
        <SortBar
          results={data.length}
          loading={loading}
          sortValue={sortValue}
          setSortValue={setSortValue}
        />
        {renderContent()}
      </section>
    </main>
  )
}

export default Home
