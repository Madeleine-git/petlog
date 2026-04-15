interface ButtonProps {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  disabled?: boolean
}

export default function Button({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
}: ButtonProps) {
  const base = 'px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]}`}
    >
      {loading ? 'Cargando...' : label}
    </button>
  )
}