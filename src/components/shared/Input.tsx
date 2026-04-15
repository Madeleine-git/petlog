interface InputProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
}

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400 transition
          ${error ? 'border-red-400' : 'border-gray-300'}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}