import React, { ReactNode, useState } from "react"
import "./style.scss"
import { MinusSVG, PlusSVG } from "utils/new/svgs"

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
        <div className="accordion">
          {data
            .filter((i) => i)
            .map((i, index) => (
              <div
                className={`accordionitem ${
                  index + 1 === data.length ? "islast" : ""
                } `}
                key={index + i}
              >
                <div
                  className={`accordionheader ${
                    accordionProps.accordion === i + "" ? "active" : ""
                  }`}
                  onClick={() =>
                    accordionProps.setAccordion(
                      accordionProps.accordion === i + "" ? null : i + ""
                    )
                  }
                >
                  <div className={"accordionheadertext"}>
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
                  className={`accordionbody ${
                    accordionProps.accordion === i + "" ? "active" : ""
                  }`}
                >
                  {children}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className={"nodata"}>No data</p>
      )}
    </div>
  )
}
