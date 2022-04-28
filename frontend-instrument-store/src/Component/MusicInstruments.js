import { useLocation } from "react-router-dom"
import Paginate from "./Paginate"

const MusicInstruments =  ()=> {

    const location = useLocation();
    const {name} = location.state
    const {instruments} = location.state
    const {product} = location.state 
    return(
        <div>
            <h1>{name}</h1>
            <Paginate items={instruments} Component={product} />
        </div>
    )
}

export default MusicInstruments;
