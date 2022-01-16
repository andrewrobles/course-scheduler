import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect} from 'react'

import Dropdown from '../components/dropdown'

export default function Home() {  
  const [state, setState] = useState({
    schedules: []
  })

  useEffect(() => {
    getSchedules()
  }, [])

  const getSchedules = () => {
    fetch('http://localhost:8000/schedules/')
    .then(response => response.json())
    .then(data => saveSchedules(data))
  }

  const saveSchedules = (schedules) => {
    if (schedules != state.items) {
      setState({
        schedules: schedules
      })
    }
  }

  const scheduleNames = state.schedules.map(element => element.name)
  
  return (
    <div>
      <div className="m-3"> 
          <Dropdown options={scheduleNames}/>
          <div className="ml-2 mt-0.5 text-xl">
            <FontAwesomeIcon icon={faPlus} className="create-schedule text-gray-700 fa-sm hover:bg-gray-200 rounded-sm p-0.5"/>
          </div>      
      </div>
    </div>
  )
}
