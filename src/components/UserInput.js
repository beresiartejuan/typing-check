export default function UserInput(){

    return (<input
        className="block"
        type="text" 
        name="user_input" 
        autoFocus={true} 
        onBlur={({ target }) => target.focus()}
    ></input>)
}