import { Accordion, useAccordion } from 'components/reusable/accordion'
import Switch, { Case } from 'components/reusable/switch'
import { ISOTDetails } from 'interfaces/IVehicle'
import { VehicleInfoSectionItem } from './vehicle-info-section-item'
import { VehicleInfoSectionColorItem } from './vehicle-info-section-color-item'
import { TypeButton } from 'utils/button'

export const VehicleSOTItem = ({
  sot,
  handlePrev
}: {
  sot: ISOTDetails | null
  handlePrev: () => void
}) => {
  const accordionProps = useAccordion()

  const accordionData = ['Vehicle Owner', 'Vehicle Info', 'Vehicle License']
  return (
    <div>
      <div className="vehicle-cta-back">
        <TypeButton buttonSize="small" title="Go back" onClick={handlePrev} />
      </div>
      <Accordion data={accordionData} accordionProps={accordionProps}>
        <Switch>
          <Case condition={accordionProps.isAccordion(accordionData[0])}>
            <div className="vehicle-info-section">
              <VehicleInfoSectionItem
                label="Owner"
                value={sot?.owner?.fullName}
              />
              <VehicleInfoSectionItem
                label="Address"
                value={sot?.owner?.address}
              />
              <VehicleInfoSectionItem label="Email" value={sot?.owner?.email} />
              <VehicleInfoSectionItem label="Phone" value={sot?.owner?.phone} />
            </div>
          </Case>
          <Case condition={accordionProps.isAccordion(accordionData[1])}>
            <div className="vehicle-info-section">
              <VehicleInfoSectionItem
                label="Reg Number"
                value={sot?.regNumber}
              />
              <VehicleInfoSectionItem
                label="Chassis Number"
                value={sot?.chassisNumber}
              />
              <VehicleInfoSectionItem
                label="Engine Number"
                value={sot?.engineNumber}
              />
              <VehicleInfoSectionColorItem label="Color" value={sot?.colour} />
              <VehicleInfoSectionItem label="Make" value={sot?.make} />
              <VehicleInfoSectionItem label="Model" value={sot?.model} />
              <VehicleInfoSectionItem
                label="Registration Date"
                value={sot?.registrationDate}
              />
              <VehicleInfoSectionItem
                label="Transaction ID"
                value={sot?.transactionId}
              />
              <VehicleInfoSectionItem
                label="Transaction ID"
                value={sot?.state}
              />
              <VehicleInfoSectionItem label="Year" value={sot?.year} />
            </div>
          </Case>
          <Case condition={accordionProps.isAccordion(accordionData[2])}>
            {/* <div className="vehicle-info-section">
                  <VehicleInfoSectionItem
                    label="Inspection"
                    value={sot?.service.inspection || ""}
                  />
                  <VehicleInfoSectionItem
                    label="License Expiry Date"
                    value={sot?.service.license.expiryDate || ""}
                  />
                  <VehicleInfoSectionItem
                    label="License Active"
                    value={sot?.service.license.isActive ? "True" : "False"}
                  />
                  <VehicleInfoSectionItem
                    label="Road Worthiness Expiry Date"
                    value={sot?.service?.roadWorthiness?.expiryDate}
                  />
                  <VehicleInfoSectionItem
                    label="Road Worthiness Active"
                    value={
                      sot?.service?.roadWorthiness?.isActive ? "True" : "False"
                    }
                  />
                </div> */}
          </Case>
        </Switch>
      </Accordion>
    </div>
  )
}
