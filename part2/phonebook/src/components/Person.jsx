const Person = ({ person, remove }) => {
    return (
        <li>{person.name}: {person.phone} <button onClick={() => remove(person.id)}>delete</button></li>
    )
}
export default Person