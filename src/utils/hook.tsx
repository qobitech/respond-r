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
  copySuccess: boolean
  copy: (text: string) => void
  setAction: React.Dispatch<React.SetStateAction<string>>
  action: string
}

export const useCopy = (): ICopyProps => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [action, setAction] = useState<string>('')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(() => false)
        setAction('')
      }, 1500)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [copySuccess])

  function copyToClipboard(text: string) {
    // Create a new ClipboardItem object with the text
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' })
    })

    // Use the Clipboard API to write the ClipboardItem to the clipboard
    navigator.clipboard.write([clipboardItem]).then(
      () => {
        setCopySuccess(true)
      },
      () => {
        setCopySuccess(false)
      }
    )
  }

  return {
    copySuccess,
    copy: copyToClipboard,
    setAction,
    action
  }
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
