import React, { Component } from 'react'
import { Card, Button, Modal } from 'semantic-ui-react';



export default class WhiskyItem extends Component {

  constructor(props) {
    super(props)
    this.state = { isDeleting: false }
  }

  handleDeletePress = () => {
    this.setState({ isDeleting: true })
    this.props.handleWhiskyDelete(this.props.whisky)
  }

  render() {
    return (
      <div>
        <Card centered={true}>
          <Card.Header ><strong> {this.props.namn} </strong></Card.Header>
          <Card.Meta>{this.props.namn2}</Card.Meta>
          <Card.Description>
            {
              this.props.typ + ", " +
              this.props.ursprunglandnamn + '/' + this.props.ursprung + ', ' +
              this.props.alkoholhalt
            }
          </Card.Description>
          <Card.Content extra>
            {
              this.props.volymiml + "ml, " + this.props.prisinklmoms + "kr"
            }
          </Card.Content>
          
          <Card.Content extra>
            <Modal trigger={<Button color='red'>Ta Bort</Button>} closeIcon>
              <Modal.Header>Ta Bort Whisky</Modal.Header>
              <Modal.Content>
                <p>
                  Är du säker på att du vill ta bort: <strong>{this.props.namn}: {this.props.namn2}; {this.props.ursprung} {this.props.alkoholhalt}</strong>
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button loading={this.state.isDeleting} color='red' onClick={this.handleDeletePress}>
                  Ja
                </Button>
              </Modal.Actions>
            </Modal>
          </Card.Content>

        </Card>
      </div>
    )
  }
}
