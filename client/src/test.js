import React from 'react'
import { Container, Divider, Grid, Header, Image, Search, Button, Card } from 'semantic-ui-react';
import SearchField from './components/SearchField/SearchField'
import WhiskyList from './components/WhiskyList/WhiskyList'
import whiskies from './data/whiskies.js'

const some_whiskies = whiskies.slice(0,10)

const GridLayout = () => (
  <div>



    <Container text>
      <Header as='h3'>Text Container</Header>
      <p>
        Sometimes you just need to put a single column of centered text on a page. A{' '}
        <code>text container</code> is a special type of container optimized for a single flowing
        column of text, like these instructions on this page.
      </p>
      <p>
        Text containers <b>do not need to use grids</b> and help simplify basic page layouts.
      </p>

      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column > <SearchField /> <Button /> </Grid.Column>
        </Grid.Row>
      </Grid>


      <Divider />

      <WhiskyList whiskies={some_whiskies} />

      <Divider />

      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column >
            <Card
              centered={true}
              header={whiskies[0].Namn}
              meta={whiskies[0].Namn2}
              description={whiskies[0].Typ + ", " + whiskies[0].Ursprunglandnamn + ', ' + whiskies[0].Alkoholhalt}
              extra={whiskies[0].Volymiml + "ml, " + whiskies[0].Prisinklmoms + "kr"}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column >
          <Card
              centered={true}
              header={whiskies[25].Namn}
              meta={whiskies[25].Namn2}
              description={whiskies[25].Typ + ", " + whiskies[25].Ursprunglandnamn + ', ' + whiskies[25].Alkoholhalt}
              extra={whiskies[25].Volymiml + "ml, " + whiskies[25].Prisinklmoms + "kr"}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column >
            <Card
              centered={true}
              header='Elliot Baker'
              meta='Friend'
              description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
              extra="Some extra info"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column >
            <Card
              centered={true}
              header='Elliot Baker'
              meta='Friend'
              description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
              extra="Some extra info"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </Container>
  </div>
)

export default GridLayout