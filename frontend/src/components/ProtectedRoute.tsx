import { useCheckAuthQuery } from "@/features/auth/authSlice"
import { Navigate } from "react-router-dom"
import { Spinner } from "./Spinner"

export const ProtectedRoute = ({children} : {children : React.ReactNode}) => {
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

  if(token ==="error" || token === undefined) {
      return <Navigate to = "/login" />
  }
  else {
    return <>{children}</>
  }
  
}