import type { CharacterFilters } from '../../types/character'
import { useEffect, useState } from 'react'
import { useScreenSize } from '../../hooks/useScreenSize'
import { useDebounce } from '../../hooks/useDebounce'
import CustomButton from '../CustomButton/CustomButton'
import CustomInput from '../CustomInput/CustomInput'
import CustomSelect from '../CustomSelect/CustomSelect'
import { Badge, Button } from '@mui/material'
import { icons } from '../Icons/Icons'
import style from './filterBar.module.scss'
import {
  genderFilterOptions,
  speciesFilterOptions,
  statusFilterOptions,
} from './utils'

type Props = {
  loading: boolean
  refresh: (filters: CharacterFilters) => void
}

const FilterBar = ({ loading, refresh }: Props) => {
  const { isMobile, isTablet, isDesktop } = useScreenSize()
  const [searchValue, setSearchValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [species, setSpecies] = useState<string>('')
  const debouncedSearch = useDebounce(searchValue, 500)

  const validateParam = (param: string): string =>
    param === 'all' ? '' : param

  useEffect(() => {
    refresh({
      name: debouncedSearch,
      species: validateParam(species),
      status: validateParam(status),
      gender: validateParam(gender),
    })
  }, [debouncedSearch, species, status, gender, refresh])

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

  const renderMobileButtons = () => {
    return (
      <>
        <Button
          disabled={loading}
          variant="outlined"
          aria-label="Delete"
          sx={{ minWidth: 40, width: 40, height: 40, p: 1 }}
          onClick={clearFilters}
        >
          {icons.delete}
        </Button>
        <div className={style.appliedFilters} data-testid="appliedFilters">
          <Badge badgeContent={getFiltersCount()} color="default">
            {icons.filter}
          </Badge>
        </div>
      </>
    )
  }

  return isMobile ? (
    <div className={style.mobileFilterBar}>
      <div>
        <CustomInput
          disabled={loading}
          size="small"
          label="Search character"
          value={searchValue}
          onChange={setSearchValue}
          icon={icons.search}
          fullWidth
        />
        {renderMobileButtons()}
      </div>
      <div data-testid="mobileInputs">
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
    </div>
  ) : (
    <div className={style.desktopFilterBar}>
      <div>
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
      {isTablet && <div>{renderMobileButtons()}</div>}
      {/* --------------- desktop buttons */}
      {isDesktop && (
        <div>
          <CustomButton
            onClick={clearFilters}
            disabled={loading}
            type="outlined"
            title="Clear filters"
            icon={icons.delete}
          />
          <div
            className={style.appliedFilters}
            data-testid="appliedFilters-desktop"
          >
            {icons.filter}
            {getFiltersCount()} FILTERS
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
