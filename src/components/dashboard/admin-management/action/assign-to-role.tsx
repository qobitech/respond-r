import { IRightSection } from "components/reusable/right-section"
import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import { IRoleAction } from "interfaces/IRoleActions"
import React, { useEffect, useState } from "react"
import { RoleSelectItem, SelectedItems } from "../action-old/create"
import { TypeButton } from "utils/new/button"
import TextPrompt from "utils/new/text-prompt"

const AssignToRole = ({
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
  const { getAllRoles, getAllOrganization } = actions
  const roleState = states.role.getAllRoles

  useEffect(() => {
    getAllRoles("")
    getAllOrganization("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const setValue = (id: string, checked: boolean) => {
    setSelectedRoles((prev) => {
      if (!prev?.includes(id)) return [id.toString(), ...prev]
      return prev.filter((i) => i.toString() !== id.toString())
    })
  }

  const isSingle = selectedItems.length === 1
  const isBulk = rsProps?.data === undefined
  const id = rsProps?.data?.id || ""
  const name = rsProps?.data?.name || ""
  const selectedActions = isBulk
    ? selectedItems.length
      ? "(" + selectedItems.length + ")"
      : ""
    : "(1)"

  const assignRoleToActions = () => {
    if (!selectedRoles[0]) {
      setResponse({
        message: "Please select roles",
        isSuccessful: false,
      })
    } else {
      actions.addActionToRole(
        {
          roleId: selectedRoles,
          actionId: isBulk
            ? selectedItems.map((item) => item.id.toString())
            : [id],
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
      <div className="card-section px-4 py-4">
        <div className="pb-4">
          <div className="text-center">
            <p className="role-title">
              Selected Roles{" "}
              {selectedRoles.length ? "(" + selectedRoles.length + ")" : ""}
            </p>
          </div>
          <div className="grid-items">
            {roleState?.data?.map((i) => (
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
          title="Assign Selected Action(s) to Selected Role(s)"
          onClick={assignRoleToActions}
          load={states.actions.addActionToRoleLoading}
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
