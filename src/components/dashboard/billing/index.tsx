import React from "react"
import "./index.scss"
import { IStates } from "interfaces/IReducer"
import "../../../utils/new/pagination.scss"
import "../../../utils/new/page.scss"
import CardTabTable, { useCardTab } from "components/reusable/card-tab"
import APIBundles from "./api-bundles"
import APIConfiguration from "./api-configs"
import ConfigurationGroup from "./api-config-group"
import ClientSubscription from "./client-subscriptions"

interface IProps {
  states?: IStates
}

export const billingTabEnum = {
  APIBUNDLES: "API Bundles",
  APICONFIG: "API Configurations",
  CONFIGGROUPS: "Configuration Groups",
  CLIENTSUBS: "Client Subscription",
}

const Billing: React.FC<IProps> = ({ states, ...props }) => {
  const tabProps = useCardTab(billingTabEnum, billingTabEnum.APIBUNDLES)

  return (
    <div className="main-page">
      <div className="pg-container">
        <CardTabTable tag="Lorem ipsum" title="Billing" {...tabProps}>
          <div>
            {tabProps.tab === billingTabEnum.APIBUNDLES && <APIBundles />}
            {tabProps.tab === billingTabEnum.APICONFIG && <APIConfiguration />}
            {tabProps.tab === billingTabEnum.CONFIGGROUPS && (
              <ConfigurationGroup />
            )}
            {tabProps.tab === billingTabEnum.CLIENTSUBS && (
              <ClientSubscription />
            )}
          </div>
        </CardTabTable>
      </div>
    </div>
  )
}

export default Billing
