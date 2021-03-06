import React, {
    Component
} from 'react';
//import logo from './logo.svg';
import './App.css';

import Person from './Person/Person';
import './Person/Person.css';

import Radium from 'radium';


class App extends Component {

    state = {
        persons: [
            {id: 'abc', name: 'Alex', age: 28}, 
            {id: 'jab', name: 'Manu', age: 29},
            {id: 'xyz', name: 'Stephanie', age: 26}
        ],
        
        otherState: 'some other value',
        showPersons: false
    }

    deletePersonHandler = (personIndex) => {
       // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState( {persons: persons})
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id  === id;
        });
        
        const person = {
            ...this.state.persons[personIndex]
        };

        //const person = Object.assign({}, this.state.persons[personIndex]);
        
        person.name = event.target.value;
        
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState( {persons: persons} );
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    render() {

        const style = {
            backgroundColor: "green",
            color: 'white',
            font: 'ínherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightgreen',
                color:'black'
            }   
        };

        let persons = null;
        
        if (this.state.showPersons)
        {
            persons = (
                <div>
                {this.state.persons.map((person,index) => {
                    return <Person 
                        click={() => this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}
                        key={person.id}
                        changed={(event)=>this.nameChangedHandler(event, person.id)}/>
                })}
            </div> 
            );

            style.backgroundColor = 'red';

            style[':hover'] = {
                backgroundColor: 'salmon',
                color:'black'
            }   
        }

        //let classes = ['red','bold'].join(' ');
        const classes =[];
        if (this.state.persons.length <=2){
            classes.push('red');
        }

        if(this.state.persons.length <=1){
            classes.push('bold');
        }

        return ( <
            div className = "App" >
            <h1>Hi, I'm a react app</h1>
            <p className={classes.join(' ')}>This is really working!</p>
            <button
                style={style} 
                onClick={this.togglePersonsHandler}>Toggle Persons</button>
            
            {persons}
            </div>
        );
        //return React.createElement('div',null, 'Hi, I\'m a React App!!!');
        //return React.createElement('div', {className:'Ápp'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default Radium(App);
