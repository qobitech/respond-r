import { IRightSection } from "components/reusable/right-section"
import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React, { useEffect, useState } from "react"
import { RoleSelectItem, SelectedItems } from "../action-old/create"
import { TypeButton } from "utils/new/button"
import TextPrompt from "utils/new/text-prompt"
import { IRole } from "interfaces/IRole"

const AssignToRole = ({
  states,
  actions,
  rsProps,
  selectedItems,
  onRemoveSelectedItems,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRole>
  selectedItems: Array<{ id: string; name: string }>
  onRemoveSelectedItems: (id: string) => void
}) => {
  const { getAllAction, getAllOrganization } = actions
  const actionState = states.actions.getAllAction

  useEffect(() => {
    getAllAction("")
    getAllOrganization("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  const [selectedActions, setSelectedActions] = useState<string[]>([])

  const setValue = (id: string, checked: boolean) => {
    setSelectedActions((prev) => {
      if (!prev?.includes(id)) return [id.toString(), ...prev]
      return prev.filter((i) => i.toString() !== id.toString())
    })
  }

  const assignRoleToActions = () => {
    if (!selectedActions[0]) {
      setResponse({
        message: "Please select actions",
        isSuccessful: false,
      })
    } else {
      actions.addActionToRole(
        {
          roleId: isBulk
            ? selectedItems.map((item) => item.id.toString())
            : [id],
          actionId: selectedActions,
        },
        () => {
          setResponse({
            message: "Actions assigned to role(s) successfully",
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
  }

  const isSingle = selectedItems.length === 1
  const isBulk = rsProps?.data === undefined
  const id = rsProps?.data?.id || ""
  const name = rsProps?.data?.name || ""
  const selectedRoleActions = rsProps?.data?.actions
  const selected = isBulk
    ? selectedItems.length
      ? "(" + selectedItems.length + ")"
      : ""
    : "(1)"

  return (
    <div className="d-flex flex-column" style={{ gap: "30px" }}>
      <div className="card-section px-4 py-4">
        <div className="pb-4">
          <div className="role-title">
            <p>Selected Roles {selected}</p>
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
      <div className="card-section px-4 py-4">
        <div className="pb-4">
          <div className="role-title">
            <p>
              Selected Actions{" "}
              {selectedActions.length ? "(" + selectedActions.length + ")" : ""}
            </p>
          </div>
          <div className="grid-items">
            {actionState?.data
              ?.filter((action) => !selectedRoleActions?.includes(action.name))
              ?.map((i) => (
                <div key={i.id} className="">
                  <RoleSelectItem
                    id={i.id + ""}
                    title={i.name}
                    setValue={setValue}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <TypeButton
          buttonSize="small"
          title="Assign Selected Action(s) to Selected Role(s)"
          onClick={assignRoleToActions}
          load={states.actions.addActionToRoleLoading}
          buttonType="outlined"
        />
      </div>
      <div className="my-1" />
      {response !== null ? (
        <TextPrompt
          prompt={response?.message || ""}
          status={response?.isSuccessful}
        />
      ) : null}
    </div>
  )
}

export default AssignToRole
