import React from "react"
import { connect } from "react-redux"
import Page from "components/layout"
import { actions } from "store/actions"

const DataWrapper: React.FC<{
  children: any
  props?: any
}> = ({ children, ...props }) => {
  return <Page {...props}>{React.cloneElement(children, props)}</Page>
}

type mapStateProps = (state: any) => { states: any }

const mapStateToProps: mapStateProps = (state: any) => ({
  states: Object.assign({}, state),
})

const mapDispatchToProps = { ...actions }

export default connect(mapStateToProps, mapDispatchToProps)(DataWrapper)
