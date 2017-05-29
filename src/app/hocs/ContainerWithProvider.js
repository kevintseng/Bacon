import React from "react"
import { Provider } from "mobx-react/native"

function ContainerWithProvider(WrappedComponent,props){
  return(function component(){
    return(
      <Provider {...props}>
        <WrappedComponent/>
      </Provider>
    )
  })
}

export default ContainerWithProvider