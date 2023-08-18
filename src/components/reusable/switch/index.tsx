import React, { FC } from "react"

export interface ISwitch {
  children?: any
}

const Switch: FC<ISwitch> = ({ children }) => {
  let matchChild: null = null
  let defaultCase: null = null

  React.Children.forEach(children, (child) => {
    if (!matchChild && child.type === Case) {
      const { condition } = child.props

      const conditionalResult = Boolean(condition)

      if (conditionalResult) {
        matchChild = child
      }
    } else if (!defaultCase && child.type === Default) {
      defaultCase = child
    }
  })
  return matchChild ?? defaultCase ?? null
}

export const Case = ({ children }: { children?: any; condition: boolean }) => {
  return children
}

export const Default = ({ children }: { children?: any }) => {
  return children
}

export default Switch
