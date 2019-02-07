import React from 'react'
import { Card } from 'semantic-ui-react';



export default function WhiskyItem(props) {
  return (
    <div>
      <Card
        centered={true}
        header={props.namn}
        meta={props.namn2}
        description={props.typ + ", " + props.ursprunglandnamn + '/' + props.ursprung + ', ' + props.alkoholhalt}
        extra={props.volymiml + "ml, " + props.prisinklmoms + "kr"}
      />
    </div>
  )
}
