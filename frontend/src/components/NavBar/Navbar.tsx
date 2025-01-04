import React from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch,useAppSelector } from '@/app/hooks'
import { UserIcon } from '../UserIcon'
import { Typography } from '@mui/material'
import DefaultAppBar from './DefaultAppBarMUI'
import { useNavigate } from 'react-router-dom'
import { LoginAppBarMUI } from './LoginAppBarMUI'

import { useLogoutMutation, useCheckAuthQuery} from '@/features/auth/authSlice'

export const Navbar = () => {
  const {
    data : TokenRequest,
    isSuccess,
    isError,
    isFetching,
    error
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
  } else {
    return (
      <DefaultAppBar />
    )
  }

}
