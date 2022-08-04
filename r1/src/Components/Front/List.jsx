import { useContext } from "react";
import FrontContext from "./FrontContext";
import Line from "./Line";


function List() {

    const {items} = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Products</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    items ? items.map(i => <Line key={i.id} line={i}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;