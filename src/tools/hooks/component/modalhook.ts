import { useState } from 'react'

function useConfirmationModal<T>() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const openModal = (data: T) => {
    setData(data)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const confirmAction = async (callback: (data: T) => Promise<void>) => {
    if (data) {
      await callback(data)
    }
    closeModal()
  }

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    confirmAction
  }
}

export default useConfirmationModal
