import { useState, useEffect} from 'react'

export default function Home() {  
  const [state, setState] = useState({
    message: "",
  })

  useEffect(() => {
    getMessage()
  }, [])

  const getMessage = () => {
    fetch('http://localhost:8000/helloworld/')
    .then(response => response.json())
    .then(data => saveMessage(data.message))
    .catch( err => {
        saveMessage('Connection error')
    })
  }

  const saveMessage = (message) => {
      setState({
        message: message,
      })
  }

  return (
    <div>
      {state.message}
    </div>
  )
}