import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export default function AddButton(props) {
    const addSchedule = () => {
        fetch('http://localhost:8000/schedules/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'name': 'Schedule #' + (props.numSchedules + 1).toString()})
        })
        .then(response => response.json())
        .then(data => props.saveSchedules(data))
    }

    return  <div className="ml-2 mt-0.5 text-xl" >
        <FontAwesomeIcon onClick={addSchedule} icon={faPlus} id="select-schedule" className="text-gray-700 fa-sm hover:bg-gray-200 rounded-sm p-0.5"/>
    </div>  
}