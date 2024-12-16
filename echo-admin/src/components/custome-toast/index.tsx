
import toast from 'react-hot-toast'
import ToastNotification from './toast-notification'

export const showToast = (type: 'success' | 'error' | 'info', message: string, className?: string,title?:string) => {
  toast.custom((t) => (
    <ToastNotification type={type} message={message} id={t.id} className={className} title={title||false}/>
  ))
}
