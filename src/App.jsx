import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
 const [flavors, setFlavors] = useState([])


useEffect (() =>{
  const fetchFlavors = async () =>{
    const {data} = await axios.get('http://localhost:5050/api/flavors')
    setFlavors(data)
  }
  fetchFlavors()
},[])


const deleteFlavor = async (flav) =>{
  try {
    const response = await axios.delete(`http://localhost:5050/api/flavors/${flav.id}`)
    const newFlavors = flavors.filter((flavs) =>{
      return flavs.id !== flav.id
    })
    setFlavors(newFlavors)
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className='container'><h1>Ice Cream Flavors - ({flavors.length})</h1>
    {
        flavors.map((flavor) =>{
          return (
            <li key={flavor.id}>{flavor.name}
            <br />
            <button onClick={() =>{deleteFlavor(flavor)}}>X</button></li>
          )
        })
    }
    </div>
  )
}

export default App
