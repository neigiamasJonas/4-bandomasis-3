
function OrderLine({ line }) {

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.title}</b>
                    <i>{line.price.toFixed(2)} EUR</i>
                    <span>Color: {line.color}</span>
                    <span>Color Hex code: {line.color_hex}</span>
                    <div className="cat">{line.cat}</div>
                    <div>
                        {
                            line.photo ? <div className='photo-bin'><img src={line.photo} alt='chosen img'></img></div> : null
                        }
                    </div>
                    <div>{line.size}</div>
                    <div>{line.com}</div>
                    <div>{line.status}</div>
                    <div>{line.sum}</div>
                </div>
            </div>
        </li>
    );
}

export default OrderLine;