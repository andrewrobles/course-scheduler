import { useState, useEffect} from 'react'

import Dropdown from '../components/dropdown'
import AddButton from '../components/addButton'
import DuplicateButton from '../components/duplicateButton'

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
    fetch('https://andrewrobles.pythonanywhere.com/schedules/')
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

  const duplicateSchedule = () => {
    const selectedScheduleName = getSelectedScheduleName(state.schedules, state.selectedScheduleIndex)
    fetch('https://andrewrobles.pythonanywhere.com/schedules/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': selectedScheduleName + ' (Copy)'})
    })
    .then(response => response.json())
    .then(data => saveSchedules(data))
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
          <div className='flow-root'>
            <div className='float-left'>
              <AddButton numSchedules={state.schedules.length} saveSchedules={saveSchedules}/> 
            </div>
            <div className='float-left'>
              <DuplicateButton duplicateSchedule={duplicateSchedule} />   
            </div>
          </div>
      </div>
    </div>
  )
}

function getSelectedScheduleName(schedules, selectedScheduleIndex) {

  if (schedules[selectedScheduleIndex]== undefined) {
    return ""
  } else {
    return schedules[selectedScheduleIndex].name
  }
}
