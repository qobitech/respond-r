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

  const isPlural = (value: any[]) => (value.length > 1 ? "s" : "")

  const selectedRoleActions = roleState.data
    .filter((role) => selectedRoles?.includes(role.id.toString()))
    .map((role) => role.actions)

  const merge = (a: any, b: any, predicate = (a: any, b: any) => a === b) => {
    const c = [...a] // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem: any) =>
      c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
    )
    return c
  }

  const getMergeArrays = () => {
    let mergedArray = []
    for (let i = 0; i < selectedRoleActions.length; i++) {
      mergedArray = merge(selectedRoleActions[i], mergedArray)
    }
    return mergedArray
  }
  const mergedArrays = getMergeArrays()

  const filteredSelectedItems = selectedItems.filter(
    (i) => !mergedArrays.includes(i.name)
  )

  const isSingle = filteredSelectedItems.length === 1
  const isBulk = rsProps?.data === undefined
  const id = rsProps?.data?.id || ""
  const name = rsProps?.data?.name || ""
  const selectedActions = isBulk
    ? filteredSelectedItems.length
      ? "(" + filteredSelectedItems.length + ")"
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
            ? filteredSelectedItems.map((item) => item.id.toString())
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
          <div className="role-title">
            <p>Selected Actions {selectedActions}</p>
          </div>
          <div className="grid-items">
            {isBulk ? (
              filteredSelectedItems.map((i, index) => (
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
          title={`Assign action${isPlural(
            filteredSelectedItems
          )} to role${isPlural(selectedRoles)}`}
          onClick={assignRoleToActions}
          load={states.actions.addActionToRoleLoading}
          buttonSize="small"
        />
      </div>
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
