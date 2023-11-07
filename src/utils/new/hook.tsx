import { UseFormReturn, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useRef, useState } from "react"
import React from "react"

export const useFormHook = <T extends {}>(objSchema: {}): [
  UseFormReturn<T, any>
] => {
  const schema = yup.object().shape(objSchema)
  const formMethods = useForm<T>({
    resolver: yupResolver(schema),
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
  const [url, setUrl] = useState<string>("")
  const [action, setAction] = useState<string>("")

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(() => false)
        setAction("")
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
    document.execCommand("copy")
    setCopySuccess(true)
    setUrl("")
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
      action,
    },
  ]
}

export const CopyComponent = ({
  url,
  shareURLRef,
}: {
  url: string
  shareURLRef: React.RefObject<HTMLTextAreaElement>
}) => {
  return (
    <div className="m-0 p-0 d-flex flex-column bg-white align-items-center position-relative">
      <textarea
        value={url}
        style={{
          width: 0,
          height: 0,
          opacity: 0,
        }}
        ref={shareURLRef}
        readOnly
      />
    </div>
  )
}
