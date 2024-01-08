import React from 'react'
import { useLocation, useNavigate } from 'react-router'

interface IProps {
	[propName: string]: any;
}
export default function withRouter(Child:React.FC) {
  return (props: IProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Child {...props} navigate={navigate} location={location} />
  }
}
