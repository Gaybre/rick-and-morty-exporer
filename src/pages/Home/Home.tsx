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
import NotFound from '../../components/NotFound/NotFound'
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong'

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
      setData([])
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
      return <p className={style.loading}>Loading...</p>
    } else if (error) {
      return error === ERRORS.NOT_FOUND ? <NotFound /> : <SomethingWentWrong />
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
          totals={data.length}
          loading={loading}
          sortValue={sortValue}
          setSortValue={setSortValue}
        />
        {/* screen reader support (class declared in styles/globals.scss) */}
        <div role="status" className="visually-hidden">
          {loading
            ? 'Loading characters...'
            : !error
              ? `${data.length} characters found.`
              : ''}
        </div>
        <div role="alert" className="visually-hidden">
          {error === ERRORS.NOT_FOUND
            ? 'No characters found.'
            : error
              ? 'Something went wrong.'
              : ''}
        </div>
        {/* UI render  */}
        {renderContent()}
      </section>
    </main>
  )
}

export default Home
