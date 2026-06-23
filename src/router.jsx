import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

const getPath = () => {
  const hash = window.location.hash.replace(/^#/, '') || '/'
  return hash
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(getPath())

  useEffect(() => {
    const onHash = () => setPath(getPath())
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = '/'
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((to) => {
    window.location.hash = to
  }, [])

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export const useRouter = () => useContext(RouterContext)

export function Link({ to, className = '', children, onClick, ...rest }) {
  const { navigate } = useRouter()
  const handle = (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    navigate(to)
  }
  return (
    <a href={`#${to}`} className={className} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

export function matchRoute(path) {
  // /club/:id
  const clubMatch = path.match(/^\/club\/(.+)$/)
  if (clubMatch) return { name: 'club', params: { id: clubMatch[1] } }

  // /specialized/:id
  const specMatch = path.match(/^\/specialized\/(.+)$/)
  if (specMatch) return { name: 'specializedDetail', params: { id: decodeURIComponent(specMatch[1]) } }

  switch (path) {
    case '/': return { name: 'dashboard' }
    case '/clubs': return { name: 'clubs' }
    case '/specialized': return { name: 'specialized' }
    case '/events': return { name: 'events' }
    case '/analytics': return { name: 'analytics' }
    case '/leaderboard': return { name: 'leaderboard' }
    case '/supervisors': return { name: 'supervisors' }
    case '/reports': return { name: 'reports' }
    case '/settings': return { name: 'settings' }
    case '/help': return { name: 'help' }
    default: return { name: 'dashboard' }
  }
}
