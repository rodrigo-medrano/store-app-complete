import { useDispatch, useSelector } from 'react-redux'
import { onCloseProductModal, onOpenProductModal } from '../store'

export const useUiStore = () => {
  const dispatch = useDispatch()

  const { isProductModalOpen } = useSelector(state => state.ui)

  const openProductModal = () => {
    dispatch(onOpenProductModal())
  }

  const closeProductModal = () => {
    dispatch(onCloseProductModal())
  }

  const toggleProductModal = () => {
    isProductModalOpen ? closeProductModal() : openProductModal()
  }

  return {
    //* Propiedades
    isProductModalOpen,

    //* Métodos
    openProductModal,
    closeProductModal,
    toggleProductModal,
  }
}
