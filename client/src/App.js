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
      isAdding: false, 
      buttonValue: 'Lägg till',
      buttonColor: 'blue'
    }
  }

  addWhisky = () => {
    this.setState({isAdding: true})
    fetch('/whiskies', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.selectedWhisky)
    }).then(response => {
      response.json().then(result => {
        console.log(result)
        this.setState({isAdding: false, buttonValue: 'Ny whisky, nice!', buttonColor: 'green'})
      }).catch(err => {
        console.log(err)
        this.setState({isAdding: false, buttonValue: 'Fel, säg till Jonas!', buttonColor: 'red'})
      })
    }).catch(err => {
      console.log(err)
      this.setState({isAdding: false, buttonValue: 'Fel, säg till Jonas!', buttonColor: 'red'})
    })


    const filtedred_whiskies = this.state.added_whiskies.filter(whisky => {
      return whisky.key === this.state.selectedWhisky.key
    })
    if (filtedred_whiskies.length === 0) {
      const added_whiskies = [...this.state.added_whiskies, this.state.selectedWhisky]
      this.setState({ added_whiskies, showing_whiskies: added_whiskies })
    }
  }

  setSelectedWhisky = (whisky) => {
    this.setState({ selectedWhisky: whisky, buttonColor: 'blue', buttonValue: 'Lägg till' })
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

          <Button 
          loading={this.state.isAdding} 
          color={this.state.buttonColor} 
          onClick={this.addWhisky}
          >{this.state.buttonValue}</Button>

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
