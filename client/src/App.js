import React, { Component } from 'react';
import './App.css';
import { Container, Header, Divider, Button, Input, Loader, Dimmer } from 'semantic-ui-react'
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
      isLoading: true,
      all_whiskies: new_whiskies,
      added_whiskies: [],
      showing_whiskies: [],
      selectedWhisky: {},
      loadingMessage: 'Dricker Whisky',
      isAdding: false,
      buttonValue: 'Lägg till',
      buttonColor: 'blue'
    }
    this.fetchWhiskies()
  }

  _updateWhiskies = () => {
    this.setState({ isAdding: true })
    fetch('/whiskies', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.selectedWhisky)
    }).then(response => {
      response.json().then(result => {
        const added_whiskies = [...this.state.added_whiskies, this.state.selectedWhisky]
        this.setState({
          added_whiskies,
          showing_whiskies: added_whiskies,
          isAdding: false,
          buttonValue: 'Ny whisky, nice!',
          buttonColor: 'green'
        })
      }).catch(err => {
        this.setState({ 
          isAdding: false, 
          buttonValue: 'Kunde inte lägga till, säg till Jonas!', 
          buttonColor: 'red' 
        })
      })
    }).catch(err => {
      this.setState({ 
        isAdding: false, 
        buttonValue: 'Kunde inte lägga till, säg till Jonas!', 
        buttonColor: 'red' 
      })
    })
  }

  addWhisky = () => {
    const filtedred_whiskies = this.state.added_whiskies.filter(whisky => {
      return whisky.key === this.state.selectedWhisky.key
    })

    if (filtedred_whiskies.length === 0) {
      this._updateWhiskies()
    } else {
      this.setState({ buttonValue: 'Denna whisky finns redan.', buttonColor: 'yellow' })
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
    const filtered_whiskies = this.state.added_whiskies.filter((whisky) => re.test(whisky.namn));
    this.setState({ showing_whiskies: filtered_whiskies })
  })

  deleteWhisky = (whisky) => {
    fetch('/whiskies', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(whisky)
    }).then(response => {
      response.json().then(result => {
        this.setState({ 
          isLoading: false, 
          added_whiskies: result.whiskies, 
          showing_whiskies: result.whiskies 
        })
      }).catch(err => {
        this.setState({ 
          isLoading: true, 
          loadingMessage: 'Nu gick nått sönder. Ladda om' 
        })
      })
    }).catch(err => {
      this.setState({ 
        isLoading: true, 
        loadingMessage: 'Nu gick nått sönder. Ladda om'
      })
    })
  }

  fetchWhiskies = () => {
    return fetch('/whiskies', {
      method: 'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(result => {
        this.setState({ 
          isLoading: false, 
          added_whiskies: result.whiskies, 
          showing_whiskies: result.whiskies 
        })
      }).catch(err => {
        this.setState({ loadingMessage: 'Jonas har sabbat nått, testa igen' })
      }).catch(err => {
        this.setState({ loadingMessage: 'Jonas har sabbat nått, testa igen' })
      })
    })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <div className="App">
          <Dimmer active>
            <Loader content={this.state.loadingMessage} />
          </Dimmer>
        </div>
      )
    } else {
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
            >
              {this.state.buttonValue}
            </Button>

            <Divider />

            <Input placeholder='Filter...' onChange={this.filterWhiskies} />

            <Divider hidden={true} />

            <WhiskyList whiskies={this.state.showing_whiskies} handleWhiskyDelete={this.deleteWhisky} />

          </Container>
        </div>
      );
    }
  }
}

export default App;
