import { useCheckAuthQuery } from "@/features/auth/authSlice"
import { Navigate } from "react-router-dom"
import { Spinner } from "./Spinner"

export const ProtectedRoute = ({children} : {children : React.ReactNode}) => {

  //uses public endpoint api/users/auth to check if user is authenticated
  const {
    data : token, 
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange : true
  })
  //prevent premature rendering and Navigation to login page based on old cache
  if (isLoading) return <Spinner text="Loading..." />
  if (isFetching) return <Spinner text="Fetching..." />

  // console.log("token is: ", token)

  if(isError || !token) {
      return <Navigate to = "/login" />
  }
  else if (isSuccess){
    return <>{children}</>
  }
  
}