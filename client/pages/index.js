import { useState, useEffect} from 'react'

import Dropdown from '../components/dropdown'
import AddButton from '../components/addButton'

export default function Home() {  
  const [state, setState] = useState({
    schedules: [],
    selectedScheduleName: "",
    selectedScheduleIndex: 0
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
        schedules: schedules,
        selectedScheduleIndex: schedules.length - 1
      })
    }
  }

  const selectSchedule = (scheduleIndex) => {
    setState({
      ...state,
      selectedScheduleIndex: scheduleIndex
    })
  }

  return (
    <div>
      <div className="m-3"> 
          <Dropdown 
            saveSchedules={saveSchedules} 
            schedules={state.schedules}
            selectedScheduleIndex={state.selectedScheduleIndex}
            selectSchedule={selectSchedule}
          />
          <AddButton numSchedules={state.schedules.length} saveSchedules={saveSchedules}/>    
      </div>
    </div>
  )
}
