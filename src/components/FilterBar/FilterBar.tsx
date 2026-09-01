import { useState } from 'react'
import { useScreenSize } from '../../hooks/useScreenSize'
import CustomButton from '../CustomButton/CustomButton'
import CustomInput from '../CustomInput/CustomInput'
import CustomSelect from '../CustomSelect/CustomSelect'
import { Badge, IconButton, Button } from '@mui/material'
import { icons } from '../Icons/Icons'
import style from './filterBar.module.scss'
import {
  genderFilterOptions,
  speciesFilterOptions,
  statusFilterOptions,
} from './utils'

type Props = {
  loading: boolean
}

const FilterBar = ({ loading }: Props) => {
  const { isMobile, isTablet, isDesktop } = useScreenSize()
  const [searchValue, setSearchValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [species, setSpecies] = useState<string>('')

  const getFiltersCount = () => {
    return [searchValue, status, gender, species].filter(
      (filter) => filter !== '',
    ).length
  }

  const clearFilters = () => {
    setSearchValue('')
    setStatus('')
    setGender('')
    setSpecies('')
  }

  return isMobile ? (
    <div className={style.mobileFilterBar}>
      <CustomInput
        disabled={loading}
        size="small"
        label="Search character"
        value={searchValue}
        onChange={setSearchValue}
        icon={icons.search}
        fullWidth
      />
      <IconButton aria-label="Filter button" disabled={loading}>
        <Badge badgeContent={getFiltersCount()} color="primary">
          {icons.filter}
        </Badge>
      </IconButton>
    </div>
  ) : (
    <div className={style.desktopFilterBar}>
      <div className={style.filterInputs}>
        <CustomInput
          disabled={loading}
          label="Search character"
          size="small"
          value={searchValue}
          onChange={setSearchValue}
          icon={icons.search}
        />
        <CustomSelect
          disabled={loading}
          label="Status"
          value={status}
          onChange={setStatus}
          options={statusFilterOptions}
        />
        <CustomSelect
          disabled={loading}
          label="Gender"
          value={gender}
          onChange={setGender}
          options={genderFilterOptions}
        />
        <CustomSelect
          disabled={loading}
          label="Species"
          value={species}
          onChange={setSpecies}
          options={speciesFilterOptions}
        />
      </div>
      {/* --------------- tablet buttons */}
      {isTablet && (
        <div className={style.tabletButtons}>
          <Button
            disabled={loading}
            variant="outlined"
            aria-label="Delete"
            sx={{ minWidth: 40, width: 40, height: 40, p: 1 }}
            onClick={clearFilters}
          >
            {icons.delete}
          </Button>
          <div className={style.appliedFilters}>
            <Badge badgeContent={getFiltersCount()} color="default">
              {icons.filter}
            </Badge>
          </div>
        </div>
      )}
      {/* --------------- desktop buttons */}
      {isDesktop && (
        <div className={style.desktopButtons}>
          <CustomButton
            onClick={clearFilters}
            disabled={loading}
            type="outlined"
            title="Clear filters"
            icon={icons.delete}
          />
          <div className={style.appliedFilters}>
            {icons.filter}
            {getFiltersCount()} FILTERS
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
