import React from 'react'
import { modifyFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange(event) {
    event.preventDefault()
    const filterValue = event.target.value
    this.props.store.dispatch(modifyFilter(filterValue))
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input
          value={this.props.store.getState().filter}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    )
  }
}

export default Filter
