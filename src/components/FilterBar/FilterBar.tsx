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

const FilterBar = () => {
  const { isMobile, isTablet, isDesktop } = useScreenSize()
  const [searchValue, setSearchValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [species, setSpecies] = useState<string>('')

  return isMobile ? (
    <div className={style.mobileFilterBar}>
      <CustomInput
        size="small"
        label="Search character"
        value={searchValue}
        onChange={setSearchValue}
        icon={icons.search}
        fullWidth
      />
      <IconButton aria-label="Filter button">
        <Badge badgeContent={5} color="primary">
          {icons.filter}
        </Badge>
      </IconButton>
    </div>
  ) : (
    <div className={style.desktopFilterBar}>
      <div className={style.filterInputs}>
        <CustomInput
          label="Search character"
          size="small"
          value={searchValue}
          onChange={setSearchValue}
          icon={icons.search}
        />
        <CustomSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={statusFilterOptions}
        />
        <CustomSelect
          label="Gender"
          value={gender}
          onChange={setGender}
          options={genderFilterOptions}
        />
        <CustomSelect
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
            variant="outlined"
            aria-label="Delete"
            sx={{ minWidth: 40, width: 40, height: 40, p: 1 }}
          >
            {icons.delete}
          </Button>
          <div className={style.appliedFilters}>
            <Badge badgeContent={5} color="default">
              {icons.filter}
            </Badge>
          </div>
        </div>
      )}
      {/* --------------- desktop buttons */}
      {isDesktop && (
        <div className={style.desktopButtons}>
          <CustomButton
            type="outlined"
            title="Clear filters"
            icon={icons.delete}
          />
          <div className={style.appliedFilters}>{icons.filter}5 FILTERS</div>
        </div>
      )}
    </div>
  )
}

export default FilterBar
