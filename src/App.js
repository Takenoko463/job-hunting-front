import axios from "axios"
import React, { useEffect, useState } from "react"

function App() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    (async() => {
      try {
        const response = await axios.get("http://43.207.6.215/api/greeting")
        setGreeting(response.data.greeting)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <div className="App">
      <p>{greeting}</p>
    </div>
  )
}

export default App;

