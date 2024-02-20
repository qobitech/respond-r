import React, { useEffect, useRef } from "react"

const ScrollIntoViewController = ({ children }: { children: any }) => {
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func()
      }, wait)
    }
  }

  const rootRef = useRef<HTMLDivElement>(null)
  const isVisible = useRef<boolean>(false)

  // const [isVisible, setIsVisible] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceScroll = debounce(() => {
    if (!isVisible.current) {
      rootRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, 250)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        // setIsVisible(entry.isIntersecting)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isVisible.current === entry.isIntersecting
      },
      { threshold: 0.5 }
    )
    if (rootRef.current) {
      observer.current.observe(rootRef.current)
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    debounceScroll()
    // return () => {
    //   setPrevLocation(() => null)
    // }
    // eslint-disable-next-line
  }, [debounceScroll])

  return <div ref={rootRef}>{children}</div>
}
export default ScrollIntoViewController
