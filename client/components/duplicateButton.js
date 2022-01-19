import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-regular-svg-icons'


export default function DuplicateButton(props) {
    return  <div className="ml-2 mt-0.5 text-xl" >
        <FontAwesomeIcon onClick={props.duplicateSchedule} icon={faClone} id="duplicate-schedule" className="text-gray-700 fa-sm hover:bg-gray-200 rounded-sm p-0.5"/>
    </div>  
}