import { UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export const useFormHook = <T extends {}>(objSchema: {}): [
  UseFormReturn<T, any>
] => {
  const schema = yup.object().shape(objSchema)
  const formMethods = useForm<T>({
    resolver: yupResolver(schema)
  })

  return [formMethods]
}

export interface ICopyProps {
  shareURLRef: React.RefObject<HTMLTextAreaElement>
  setUrl: React.Dispatch<React.SetStateAction<string>>
  url: string
  copySuccess: boolean
  setAction: React.Dispatch<React.SetStateAction<string>>
  action: string
}

export const useCopy = (): [ICopyProps] => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('')
  const [action, setAction] = useState<string>('')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(() => false)
        setAction('')
      }, 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [copySuccess])

  const copyToClipboard = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e?.preventDefault()
    shareURLRef?.current?.select()
    document.execCommand('copy')
    setCopySuccess(true)
    setUrl('')
  }

  useEffect(() => {
    if (url) {
      copyToClipboard()
    }
  }, [url])

  const shareURLRef = useRef<HTMLTextAreaElement>(null)

  return [
    {
      shareURLRef,
      setUrl,
      url,
      copySuccess,
      setAction,
      action
    }
  ]
}

export const CopyComponent = ({
  url,
  shareURLRef
}: {
  url: string
  shareURLRef: React.RefObject<HTMLTextAreaElement>
}) => {
  return (
    <div
      className="m-0 p-0 d-flex flex-column bg-white align-items-center position-relative"
      style={{ height: 0 }}
    >
      <textarea
        value={url}
        style={{
          width: 0,
          height: 0,
          opacity: 0
        }}
        ref={shareURLRef}
        readOnly
      />
    </div>
  )
}

export const handleFullScreen = (url: string) => {
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=1300,height=650,left=50,top=0`
  window.open(url, 'Danfo App', params)
}

export interface IUseImage {
  isLoaded: boolean
  isError: boolean
  handleError: (error: boolean) => void
  handleLoad: (load: boolean) => void
}

export const useImage = (): IUseImage => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleLoad = (load: boolean) => {
    setIsLoaded(load)
  }

  const handleError = (error: boolean) => {
    setIsError(error)
  }

  return {
    isLoaded,
    isError,
    handleError,
    handleLoad
  }
}

// export const useInfiniteScroll = (
//   load: boolean,
//   hasmore: boolean,
//   getData?: () => void
// ): [lastCardElementRef: (node: any) => void] => {
//   const observer = useRef<IntersectionObserver | null>(null)
//   const lastCardElementRef = useCallback(
//     (node: any) => {
//       if (load) return
//       if (observer?.current) observer?.current?.disconnect?.()
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasmore) {
//           getData?.()
//         }
//       })
//       if (node) observer?.current?.observe(node)
//     },
//     [load, getData, hasmore]
//   )

//   return [lastCardElementRef]
// }

export const useInfiniteScroll = (
  targetRef: React.MutableRefObject<HTMLElement | null>,
  options: IntersectionObserverInit,
  getData: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getData()
        }
      })
    },
    [getData]
  )

  useEffect(() => {
    if (targetRef.current) {
      observer.current = new IntersectionObserver(handleIntersection, options)
      observer.current.observe(targetRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [targetRef, handleIntersection, options])

  return observer
}
