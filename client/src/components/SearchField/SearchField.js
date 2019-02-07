import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'


export default class SearchField extends Component {
  constructor(props) {
    super(props)
    
    this.state = {isLoading: false, value: '', results: []}
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title + ": " + result.description })
    this.props.handleSelection(result)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      
      this.setState({
        isLoading: false,
        results: _.filter(this.props.options, isMatch),
      })
    }, 300)
  }

  render() {
    return (
      <div>
         <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={this.state.results}
            value={this.state.value}
            onFocus={() => this.setState({value: ''})}
            {...this.props}
          />
      </div>
    )
  }
}

