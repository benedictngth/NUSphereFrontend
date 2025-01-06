import DefaultAppBar from './DefaultAppBarMUI'
import { LoginAppBarMUI } from './LoginAppBarMUI'

import {useCheckAuthQuery} from '@/features/auth/authSlice'

export const Navbar = () => {
  const {
    // data : TokenRequest,
    isSuccess,
    isError,
    isFetching,
    // error
  } = useCheckAuthQuery()
  if (isFetching) {
    return (
      <DefaultAppBar />
    );
  }

  if (isSuccess) {
    return (
      <LoginAppBarMUI />
    );
  } else if (isError) {
    return (
      <DefaultAppBar />
    )
  }

}
