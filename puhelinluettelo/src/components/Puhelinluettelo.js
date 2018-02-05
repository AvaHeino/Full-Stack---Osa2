import React from 'react'
import axios from 'axios'
       

const Person = ({person, deletePerson}) => {
    return (
        <tbody>
          <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={deletePerson}>Poista</button></td>
          </tr>
        </tbody>
      )
  }

export default Person