import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

type Props = {
  label: string
  value: string
  onChange: (val: string) => void
  options: string[]
}

const CustomSelect = ({ label, value, onChange, options = [] }: Props) => {
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
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        id={`${label}-select`}
        labelId={`${label}-select-label`}
        label={label}
        value={value}
        onChange={handleChange}
        autoWidth
      >
        {renderOptions()}
      </Select>
    </FormControl>
  )
}

export default CustomSelect
