import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

type Props = {
  label: string
  value: string
  onChange: (val: string) => void
  options: string[]
  variantText?: boolean
  disabled?: boolean
}

const CustomSelect = ({
  label,
  value,
  onChange,
  options = [],
  variantText,
  disabled,
}: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string)
  }

  const renderOptions = () =>
    options.map((option) => (
      <MenuItem value={option.toLowerCase()} key={option}>
        {option}
      </MenuItem>
    ))

  return (
    <FormControl sx={{ minWidth: 100 }} size="small">
      {variantText ? (
        <Select
          disabled={disabled}
          id={`${label}-select`}
          aria-label={label}
          value={value}
          displayEmpty
          renderValue={(selected) => (selected ? selected : label)}
          onChange={handleChange}
          autoWidth
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
        >
          {renderOptions()}
        </Select>
      ) : (
        <>
          <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
          <Select
            disabled={disabled}
            id={`${label}-select`}
            labelId={`${label}-select-label`}
            label={label}
            value={value}
            onChange={handleChange}
            autoWidth
          >
            {renderOptions()}
          </Select>
        </>
      )}
    </FormControl>
  )
}

export default CustomSelect
