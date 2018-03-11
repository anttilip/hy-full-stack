import React from 'react'
import { connect } from 'react-redux'
import { modifyFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange(event) {
    event.preventDefault()
    const filterValue = event.target.value
    this.props.modifyFilter(filterValue)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input
          value={this.props.filter}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  filter: state.filter
})

const mapDispatchToProps = {
  modifyFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
