import React from 'react'
import WhiskyItem from '../WhiskyItem/WhiskyItem'
import { Grid } from 'semantic-ui-react';

export default function WhiskyList(props) {
  const whiskies = props.whiskies
  let whiskyItems = whiskies.map(whisky => {
    return (
      <Grid.Row key={whisky.artikelid} columns={1}>
        <Grid.Column >
          <WhiskyItem
            namn={whisky.namn}
            namn2={whisky.namn2}
            typ={whisky.typ}
            ursprunglandnamn={whisky.ursprunglandnamn}
            ursprung={whisky.ursprung}
            alkoholhalt={whisky.alkoholhalt}
            volymiml={whisky.volymiml}
            prisinklmoms={whisky.prisinklmoms}
            handleWhiskyDelete={props.handleWhiskyDelete}
            whisky={whisky}
          />
        </Grid.Column>
      </Grid.Row>
    )
  })

  return (
    <div>
      <Grid>
        {whiskyItems}
      </Grid>
    </div>
  )
}
