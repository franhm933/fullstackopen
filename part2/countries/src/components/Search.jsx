const Search = (props) => {
    return (
        <div className="finder">
        find countries:  
        <input
        value={props.search}
        onChange={props.handle}
      />
      </div>
    )
}
export default Search