import {useNavigate } from 'react-router-dom'
export const navigateRouter = (pathRoute:string)=>{
  const navigate = useNavigate();

  return navigate(pathRoute)
}