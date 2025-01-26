import { AppStartListening } from '@/app/listernerMiddleware'
import { apiSlice } from '@/api/apiSlice'

export interface Category {
    ID : string
    Name : string
    Description : string
    ParentID : string
    CreatedBy : string
}

export interface ParentChildCategory {
    parent: Category;
    children?: Category[]; // Children are optional
  }

export type CategoryUpdate = Pick<Category, 'ID' | 'Name' | 'Description'>
export type NewCategory = Pick<Category, 'Name' | 'Description' | 'ParentID' | 'CreatedBy'>

//side effect listener (react toast)for adding new category
export const addCategoryListener = (startAppListening: AppStartListening) => {
    startAppListening({
      matcher :apiSlice.endpoints.addCategory.matchFulfilled,
      effect: async (action, listenerApi) => {
        const { toast } = await import('react-tiny-toast')
  
        const toastId = toast.show('New category added!', {
          variant: 'success',
          position: 'top-center',
          pause: true
        })
  
        await listenerApi.delay(5000)
        toast.remove(toastId)
      }
    })
  }