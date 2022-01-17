import { Menu, Transition } from '@headlessui/react'
import { useEffect, Fragment } from 'react'
import { ChevronDownIcon} from '@heroicons/react/solid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


export default function Dropdown(props) {
    return (
      <Menu as="div" id="select-schedule" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 w-44">
            <div className="ml-0.5">
              <SelectedScheduleName schedules={props.schedules}/>
            </div>
            <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <ScheduleOptions 
                schedules={props.schedules}
                saveSchedules={props.saveSchedules}
              />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  function SelectedScheduleName(props) {
    const lastIndex = props.schedules.length - 1
    if (props.schedules[lastIndex] == undefined) {
      return ""
    } else {
      return props.schedules[lastIndex].name
    }
  }

  function ScheduleOptions(props) {
    if (props.schedules.length == 0) {
      return null
    } else {
      // Schedules will be displayed in reverse order
      const reversedSchedules = [...props.schedules]
      reversedSchedules.reverse()

      const showDeleteButton = props.schedules.length > 1
      console.log(showDeleteButton)

      return reversedSchedules.map(element => <Option label={element.name} id={element.id} saveSchedules={props.saveSchedules} showDeleteButton={showDeleteButton}/>)
    }
  }

  function Option(props) {
      const deleteSchedule = () => {
        const url = 'http://localhost:8000/schedules/' + props.id.toString() + '/delete/'
        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => props.saveSchedules(data))
      }

      return <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full text-left px-4 py-2 text-sm'
          )}
        >
          {props.label}
          {props.showDeleteButton ? <FontAwesomeIcon onClick={deleteSchedule} id="delete-schedule" className="float-right" icon={faTimes}/> : null}
        </a>
      )}
    </Menu.Item>
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }