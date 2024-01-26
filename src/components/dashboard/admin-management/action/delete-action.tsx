import { IRightSection } from "components/reusable/right-section"
import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import { IRoleAction } from "interfaces/IRoleActions"
import React, { useState } from "react"
import { SelectedItems } from "../action-old/create"
import { TypeButton } from "utils/new/button"
import TextPrompt from "utils/new/text-prompt"
import { PAGENUMBER, PAGESIZE, getQuery } from "."

const DeleteAction = ({
  states,
  actions,
  rsProps,
  selectedItems,
  onRemoveSelectedItems,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRoleAction>
  selectedItems: Array<{ id: string; name: string }>
  onRemoveSelectedItems: (id: string) => void
}) => {
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  const isSingle = selectedItems.length === 1
  const isBulk = rsProps?.data === undefined
  const id = rsProps?.data?.id || ""
  const name = rsProps?.data?.name || ""
  const selectedActions = isBulk
    ? selectedItems.length
      ? "(" + selectedItems.length + ")"
      : ""
    : "(1)"

  const deleteActions = () => {
    actions.deleteAction(
      {
        actionIds: isBulk
          ? selectedItems.map((item) => parseInt(item.id))
          : [parseInt(id)],
      },
      () => {
        actions.getAllAction(getQuery(`${PAGESIZE}&${PAGENUMBER}`))
        setResponse({
          message: "Action(s) deleted",
          isSuccessful: true,
        })
      },
      () => {
        setResponse({
          message: "Something went wrong",
          isSuccessful: false,
        })
      }
    )
  }

  return (
    <div className="d-flex flex-column" style={{ gap: "30px" }}>
      <div className="card-section px-4 py-4">
        <div className="pb-4">
          <div className="text-center">
            <p className="role-title">Selected Actions {selectedActions}</p>
          </div>
          <div className="grid-items">
            {isBulk ? (
              selectedItems.map((i, index) => (
                <div key={i.id} className="pt-3">
                  <SelectedItems
                    id={i.id + ""}
                    title={i.name}
                    onRemove={!isSingle ? onRemoveSelectedItems : undefined}
                    index={index + 1}
                  />
                </div>
              ))
            ) : (
              <SelectedItems
                id={id + ""}
                title={name}
                onRemove={undefined}
                index={1}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ gap: "30px" }}
      >
        <TextPrompt prompt="Are you sure you want to delete?" status={false} />
        <TypeButton
          title="Delete Action(s)"
          onClick={deleteActions}
          load={states.actions.deleteActionLoading}
          style={{ background: "none" }}
          buttonType="danger"
        />
      </div>
      <div className="" />
      {response !== null ? (
        <TextPrompt
          prompt={response?.message || ""}
          status={response?.isSuccessful}
        />
      ) : null}
    </div>
  )
}

export default DeleteAction
