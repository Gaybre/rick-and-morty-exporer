import type { CharacterSort } from '../../types/character'
import CustomSelect from '../CustomSelect/CustomSelect'
import styles from './SortBar.module.scss'

type Props = {
  results: number
  loading: boolean
  sortValue: CharacterSort
  setSortValue: (val: CharacterSort) => void
}

const SortBar = ({ results, loading, sortValue, setSortValue }: Props) => {
  return (
    <div className={styles.sortBar}>
      <p>Total results: {results}</p>
      <div className={styles.selectWrapper}>
        {sortValue && <span>Sort by:</span>}
        <CustomSelect
          disabled={loading}
          label="Sort by"
          options={['None', 'Name A-Z', 'Name Z-A']}
          value={sortValue}
          onChange={setSortValue}
          variantText
        />
      </div>
    </div>
  )
}

export default SortBar
