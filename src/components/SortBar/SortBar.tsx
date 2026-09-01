import { useState } from 'react'
import CustomSelect from '../CustomSelect/CustomSelect'
import styles from './SortBar.module.scss'

type Props = {
  results: number
  loading: boolean
}

const SortBar = ({ results, loading }: Props) => {
  const [sortValue, setSortValue] = useState<string>('')

  return (
    <div className={styles.sortBar}>
      <p>Total results: {results}</p>
      <CustomSelect
        disabled={loading}
        label="Sort by"
        options={['Name A-Z', 'Name Z-A']}
        value={sortValue}
        onChange={setSortValue}
        variantText
      />
    </div>
  )
}

export default SortBar
