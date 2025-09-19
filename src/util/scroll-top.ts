import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

export default function useScrollTop() {
  const [top, setTop] = useState(window.scrollY)
  useEventListener('scroll', () => {
    setTop(window.scrollY)
  })
  return top
}
