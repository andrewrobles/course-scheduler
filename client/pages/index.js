import { useState, useEffect} from 'react'

import Dropdown from '../components/dropdown'
import AddButton from '../components/addButton'

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
          <Dropdown options={scheduleNames} saveSchedules={saveSchedules}/>
          <AddButton numSchedules={state.schedules.length} saveSchedules={saveSchedules}/>    
      </div>
    </div>
  )
}
