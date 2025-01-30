const PersonForm = (props) => {
    return (
        <form onSubmit={props.submit}>
            <div>
            name:
            <input
            value={props.nameVal}
            onChange={props.nameHandle}
            />
            <br/>
            phone:
            <input
            value={props.phoneVal}
            onChange={props.phoneHandle}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm