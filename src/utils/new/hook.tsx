import { UseFormReturn, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export const useFormHook = <T extends {}>(objSchema: {}): [
  UseFormReturn<T, any>
] => {
  const schema = yup.object().shape(objSchema)
  const formMethods = useForm<T>({
    resolver: yupResolver(schema),
  })

  return [formMethods]
}
