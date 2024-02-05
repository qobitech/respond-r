import { IRightSection } from "components/reusable/right-section"
import { IAction } from "interfaces/IAction"
import { IStates } from "interfaces/IReducer"
import React, { useEffect, useState } from "react"
import { RoleSelectItem } from "../action-old/create"
import { IRole } from "interfaces/IRole"
import TextPrompt from "utils/new/text-prompt"
import { PulseSVG } from "utils/new/svgs"
import { TypeButton } from "utils/new/button"
import { useGlobalContext } from "components/layout"

const ViewActions = ({
  actions,
  states,
  rsProps,
}: {
  states: IStates
  actions: IAction
  rsProps?: IRightSection<IRole>
}) => {
  const { getOrganization } = useGlobalContext()
  const { getActionsForRole } = actions
  const actionRolesLoading = states.actions.getActionsForRoleLoading
  const actionRoles = states?.actions?.getActionsForRole?.data
  const name = rsProps?.data?.name || ""
  const id = rsProps?.data?.id || 0
  const organization = getOrganization?.(
    "id",
    rsProps?.data?.organisationId || 0
  )?.name
  // const roleActions = rsProps?.data?.actions

  useEffect(() => {
    getActionsForRole(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedActions, setSelectedActions] = useState<string[]>([])
  const [response, setResponse] = useState<{
    message: string
    isSuccessful: boolean
  } | null>(null)

  const setValue = (id: string, checked: boolean) => {
    setSelectedActions((prev) => {
      if (!prev?.includes(id)) return [id.toString(), ...prev]
      return prev.filter((i) => i.toString() !== id.toString())
    })
  }

  const handleUnassignAllActions = () => {
    actions?.unassignMultipleActionsForRole(
      {
        actionIds: actionRoles.map((i) => parseInt(i)),
        roleId: id,
      },
      () => {
        setResponse({
          message: "actions unassigned successfully",
          isSuccessful: true,
        })
      },
      (err) => {
        console.log(err)
        setResponse({ message: "Something went wrong", isSuccessful: false })
      }
    )
  }

  const handleUnassignActions = () => {
    actions?.unassignMultipleActionsForRole({
      actionIds: selectedActions.map((i) => parseInt(i)),
      roleId: id,
    })
  }

  const isAll = selectedActions?.length === actionRoles?.length

  return (
    <div className="d-flex flex-column" style={{ gap: "30px" }}>
      <div className="card-section px-4 py-4">
        <div className="pb-4">
          <div
            className="role-title d-flex align-items-center justify-content-center mb-4"
            style={{ gap: "20px" }}
          >
            <p>
              Actions for {name} ({organization})
            </p>
            {actionRolesLoading ? <PulseSVG /> : null}
          </div>
          <div className="grid-items">
            {!actionRoles?.length ? (
              <div>
                <TextPrompt prompt="No actions" status={false} />
              </div>
            ) : (
              actionRoles?.map((i, index) => (
                <div key={i} className="">
                  <RoleSelectItem id={i} title={i} setValue={setValue} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-center mt-4"
        style={{ gap: "20px" }}
      >
        <TypeButton
          buttonSize="small"
          title="Un-assign selected actions"
          buttonType="outlined"
          onClick={handleUnassignActions}
          load={
            isAll ? false : states.role.unassignMultipleActionsForRoleLoading
          }
        />
        <TypeButton
          buttonSize="small"
          title="Un-assign all actions"
          buttonType="outlined"
          onClick={handleUnassignAllActions}
          load={
            isAll ? states.role.unassignMultipleActionsForRoleLoading : false
          }
        />
      </div>
      <div className="my-3" />
      {response !== null ? (
        <TextPrompt
          prompt={response?.message || ""}
          status={response?.isSuccessful}
        />
      ) : null}
    </div>
  )
}

export default ViewActions
