import React from 'react';
import Person from './components/Person';
import personService from './services/persons';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      error: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })

  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if(this.state.persons.map(person => person.name).includes(personObject.name))
    {
      
      alert('This person is already in the phone book!')

    } else {
      
     personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          error: `Succesfully added '${personObject.name}' to the phonebook`
      })
        setTimeout(() => {
          this.setState({error: null})
        },5000)
      })
    }
}

  handleNameInput = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberInput = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  deletePerson = (id) => {
    return () => {
      personService
        .remove(id)
        .then(response => {
          const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({
            persons: persons,
            error: 'Contact has been succesfully removed'
          })
          setTimeout(()=> {
            this.setState({error: null})
          },5000)
        })
    }
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div> 
          rajaa naytettavia: <input/>
        </div>
        <h3>Lisaa Uusi</h3>
        <form onSubmit={this.addPerson}>
          <div> 
            nimi: <input 
            value={this.state.newName}
            onChange = {this.handleNameInput}
            />
          </div>
          <div>
            numero: <input
            value={this.state.newNumber}
            onChange = {this.handleNumberInput}
             />
            
          </div>
          <div> 
            <button type="submit">lisaa</button>
          </div>
        </form>
       <div>
        <h3>Numerot</h3>
        <Notification message={this.state.error}/>
        <table>
          {this.state.persons.map(person=><Person 
            key={person.name} 
            person={person}
            deletePerson = {this.deletePerson(person.id)}
            />
          )}
        </table>
       </div>
      </div>
      )
  }
}

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
    )
}


export default App;
