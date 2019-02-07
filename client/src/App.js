import React, { Component } from 'react';
import './App.css';
import { Container, Header, Divider, Button, Input } from 'semantic-ui-react'
import SearchField from './components/SearchField/SearchField'
import WhiskyList from './components/WhiskyList/WhiskyList'
import whiskies from './data/whiskies';


const new_whiskies = whiskies.map(whisky => {
  return ({
    "title": whisky.namn,
    "description": whisky.namn2 + ': ' + whisky.alkoholhalt,
    "price": whisky.prisinklmoms,
    "key": whisky.artikelid,
    ...whisky
  })
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      all_whiskies: new_whiskies,
      added_whiskies: [],
      showing_whiskies: [],
      selectedWhisky: {},
    }
  }

  addWhisky = () => {
    const filtedred_whiskies = this.state.added_whiskies.filter(whisky => {
      return whisky.key === this.state.selectedWhisky.key
    })
    if (filtedred_whiskies.length === 0) {
      const added_whiskies = [...this.state.added_whiskies, this.state.selectedWhisky]
      this.setState({ added_whiskies, showing_whiskies: added_whiskies  })
    }
  }

  setSelectedWhisky = (whisky) => {
    this.setState({ selectedWhisky: whisky })
  }

  filterWhiskies = ((event, input) => {
    if (input.value === '') {
      this.setState({ showing_whiskies: this.state.added_whiskies })
    }
    const re = new RegExp(input.value, 'i');
    const filtered_whiskies = this.state.added_whiskies.filter(function (whisky) { return re.test(whisky.title); });
    this.setState({ showing_whiskies: filtered_whiskies })
  })


  render() {
    return (
      <div className="App" >

        <Container text>
          <Divider hidden={true} />
          <Header as='h2'>Tisdagsklubben</Header>
          <p>
            Välkommen till tisdagsklubben. Här kan du lägga till din köpta whisky!
          </p>
          <SearchField handleSelection={this.setSelectedWhisky} options={this.state.all_whiskies} />

          <Divider hidden={true} />

          <Button color="green" onClick={this.addWhisky}>Lägg Till</Button>

          <Divider />

          <Input placeholder='Filter...' onChange={this.filterWhiskies} />

          <Divider hidden={true} />

          <WhiskyList whiskies={this.state.showing_whiskies} />

        </Container>
      </div>
    );
  }
}

export default App;
