import { useEffect, useState } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, onClose, children }: ModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'rgba(0,0,0,0.4)' }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-6 transition-all duration-200 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}