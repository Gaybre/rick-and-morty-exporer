import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import type React from 'react'

type Props = {
  label: string
  value: string
  size?: 'small' | 'medium'
  onChange: (val: string) => void
  icon?: React.ReactNode
  fullWidth?: boolean
  disabled?: boolean
}

const CustomInput = ({
  label,
  size,
  value,
  onChange,
  icon,
  fullWidth,
  disabled,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value)

  return (
    <TextField
      disabled={disabled}
      fullWidth={fullWidth}
      id={`${label}-input`}
      label={label}
      value={value}
      variant="outlined"
      size={size}
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: icon && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        },
      }}
    />
  )
}

export default CustomInput
