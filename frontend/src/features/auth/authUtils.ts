import { AppStartListening } from '@/app/listernerMiddleware'
import { apiSliceWithAuth } from './authSlice'

interface PayloadData {
    error : string
}

export const addLoginErrorListerner = (startAppListening : AppStartListening) => {
    startAppListening({
        matcher: apiSliceWithAuth.endpoints.login.matchRejected,
        effect : async (action, listenerApi) => {
            let payloadData: PayloadData
            if (action.payload && 'data' in action.payload) {
                payloadData = action.payload.data as PayloadData
            }
            else {
                console.error('Invalid login response')
                return
            }


            const { toast } = await import('react-tiny-toast') 
            
            const toastId = toast.show(payloadData.error, {
                variant : 'danger',
                position : 'top-center',
                pause : true
            })
            await listenerApi.delay(5000)
            toast.remove(toastId)
        },
    }

)
} 

export const addRegisterErrorListerner = (startAppListening : AppStartListening) => {
    startAppListening({
        matcher: apiSliceWithAuth.endpoints.register.matchRejected,
        effect : async (action) => {
            let payloadData: PayloadData
            if (action.payload && 'data' in action.payload) {
                payloadData = action.payload.data as PayloadData 
                console.log(payloadData)
            }
            else {
                console.error('Invalid register response')
                return
            }
        }})
}

export const addLoginSuccessListerner = (startAppListening : AppStartListening) => {
    startAppListening({
        matcher: apiSliceWithAuth.endpoints.login.matchFulfilled,
        effect : async (action, listenerApi) => {
            console.log("login toast!")
            const { toast } = await import('react-tiny-toast')
            const toastId = toast.show('Login successful', {
                variant : 'success',
                position : 'top-center',
                pause : true
            })
            await listenerApi.delay(5000)
            toast.remove(toastId)
        }
    })
}