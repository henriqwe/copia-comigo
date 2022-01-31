import { toast } from 'react-toastify'

function   utils.notification(
  message: string,
  type: 'success' | 'error' | 'warning' | 'info'
) {
  toast[type](message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export { notification }
