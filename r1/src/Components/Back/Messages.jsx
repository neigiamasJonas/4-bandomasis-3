

import { useContext } from "react";
import BackContext from "./BackContext";


function Messages() {

    const { messages } = useContext(BackContext);

    return (
        <>
        <div className="show-message">
        {
            messages.map(msg => (
                
                    <div className={'alert alert-' + msg.type} role="alert" key={msg.id}>
                        {msg.text}
                     </div>
               
            ))
        }
        </div>
        </>
    );
}

export default Messages;