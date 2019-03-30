import React from 'react'
const UserForm = (props) =>{
        return(
                <form onSubmit={props.getUser}>
                    <input id="search" type="text" name="username" placeholder="Enter Username Here"/>
                    <button id="btn">SUBMIT</button>

                </form>
                        )
}

export default UserForm