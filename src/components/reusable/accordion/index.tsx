import React, { ReactNode, useState } from "react"
import stylemodule from "./style.module.scss"
import { MinusSVG, PlusSVG } from "utils/new/svgs"

interface IClass {
  accordion: any
  accordionitem: any
  islast: any
  accordionheader: any
  accordionheadertext: any
  accordionbody: any
  active: any
  nodata: any
}

const styleh = stylemodule as unknown as IClass

export interface IUA {
  accordion: string | null
  setAccordion: React.Dispatch<React.SetStateAction<string | null>>
  isAccordion: (name: string) => boolean
}

export const useAccordion = (): IUA => {
  const [accordion, setAccordion] = useState<string | null>(null)

  const isAccordion = (name: string) => accordion === name

  return {
    accordion,
    setAccordion,
    isAccordion,
  }
}

export const Accordion = ({
  data,
  children,
  accordionProps,
  icon,
}: {
  data: string[]
  children?: ReactNode
  accordionProps: IUA
  icon?: any
}) => {
  const isProject = data.every((i) => i.length > 0)
  return (
    <div>
      {isProject ? (
        <div className={styleh.accordion}>
          {data
            .filter((i) => i)
            .map((i, index) => (
              <div
                className={`${styleh.accordionitem} ${
                  index + 1 === data.length ? styleh.islast : ""
                } `}
                key={index + i}
              >
                <div
                  className={`${styleh.accordionheader} ${
                    accordionProps.accordion === i + "" ? styleh.active : ""
                  }`}
                  onClick={() =>
                    accordionProps.setAccordion(
                      accordionProps.accordion === i + "" ? null : i + ""
                    )
                  }
                >
                  <div className={styleh.accordionheadertext}>
                    {icon}
                    <p>{i}</p>
                  </div>
                  {accordionProps.accordion !== i + "" ? (
                    <PlusSVG />
                  ) : (
                    <MinusSVG />
                  )}
                </div>
                <div
                  className={`${styleh.accordionbody} ${
                    accordionProps.accordion === i + "" ? styleh.active : ""
                  }`}
                >
                  {children}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className={styleh.nodata}>No data</p>
      )}
    </div>
  )
}
