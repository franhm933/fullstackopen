const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    var classType = 'success'
    if (type === 'error') {
        classType = 'error'
    }
  
    return (
      <div className={classType}>
        {message}
      </div>
    )
  }

  export default Notification