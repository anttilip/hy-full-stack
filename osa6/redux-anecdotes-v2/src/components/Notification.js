import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const notification = this.props.store.getState().notification
    return (
      <div>
        { notification &&
          <div style={style}>
            {notification}
          </div>
        }
      </div>
    )
  }
}

export default Notification
