import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react';



export default class WhiskyItem extends Component {

  constructor(props) {
    super(props)
    this.state = {isDeleting: false}
  }

  handleDeletePress = () => {
    this.setState({isDeleting: true})
    this.props.handleWhiskyDelete(this.props.whisky)
  }

  render() {
    return (
      <div>
        <Card centered={true}>
          <Card.Header ><strong>{this.props.namn} </strong> </Card.Header>
          <Card.Meta>{this.props.namn2}</Card.Meta>
          <Card.Description>{this.props.typ + ", " + this.props.ursprunglandnamn + '/' + this.props.ursprung + ', ' + this.props.alkoholhalt}</Card.Description>
          <Card.Content extra>{this.props.volymiml + "ml, " + this.props.prisinklmoms + "kr"}</Card.Content>
          <Card.Content extra>
            <Button basic={true} loading={this.state.isDeleting} color='red' onClick={this.handleDeletePress}>
              Ta bort
          </Button>
          </Card.Content>
        </Card>
      </div>
    )
  }
}
