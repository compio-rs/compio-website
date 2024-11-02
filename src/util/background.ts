import { useLocation, useRouteError } from 'react-router-dom'

export function useBgClass() {
  const location = useLocation()
  const isError = useRouteError()

  return location.pathname === '/' || isError !== null ? 'bg-blue-50/30' : ''
}
