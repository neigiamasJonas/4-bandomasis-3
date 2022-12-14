import { useContext } from "react";
import BackContext from "../BackContext";
import Line from "./Line";


function List() {

    const {items} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Items</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    items ? items.map(p => <Line key={p.id} line={p}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;