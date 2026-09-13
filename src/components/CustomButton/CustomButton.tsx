import { Button } from '@mui/material'
import type React from 'react'

type Props = {
  title: string
  type: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  onClick: () => void
  size?: 'small' | 'medium' | 'large'
  icon: React.ReactNode | null
}

const CustomButton = ({
  type,
  disabled,
  title,
  onClick,
  size = 'small',
  icon,
}: Props) => {
  return (
    <Button
      variant={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      size={size}
      startIcon={icon}
    >
      {title}
    </Button>
  )
}

export default CustomButton
