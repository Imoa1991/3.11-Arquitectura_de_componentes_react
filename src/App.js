import React, { Component } from 'react';
import './App.css';
import Form from './components/Form.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataperson:[],
      filterPeople:[],
      filterCities:[],
      filterGender:[]
    }
    this.cities = [];
    this.gender = [];
    this.getPerson=this.getPerson.bind(this);
    this.createCities=this.createCities.bind(this);
    this.createGender=this.createGender.bind(this);
    this.filter=this.filter.bind(this);
    this.filterCity=this.filterCity.bind(this);
    this.filterGender=this.filterGender.bind(this);
    this.getPerson();
  }

  getPerson() {
    fetch('https://randomuser.me/api/?results=50')
    .then(data => {
      return data.json();
    })
    .then(data =>{
      this.createCities(data.results);
      this.createGender(data.results);
      this.setState({
        dataperson: data.results,
        filterPeople: data.results
      })
    });
  }
  createCities(dataperson) {
    dataperson.map(person => {
      if (this.cities.includes(person.location.city) === false) {
        this.cities.push(person.location.city);
      }
    })
  }
  createGender(dataperson) {
    dataperson.map(person =>{
      if(this.gender.includes(person.gender)=== false) {
        this.gender.push(person.gender);
      }
    })
  }
  filterCity(event){
    let city = event.currentTarget.value;
    if (this.state.filterCities.includes(city) === true) {
      let positionToRemove = this.state.filterCities.indexOf(city);
      this.state.filterCities.splice(positionToRemove, 1);
    } else {
      this.state.filterCities.push(city)
    }
    this.filter();
  }
  filterGender(event){
    let gender = event.currentTarget.value;
    if (this.state.filterGender.includes(gender) === true) {
      //indexOf me busca la posición donde esta ese elemento
      let positionToRemove = this.state.filterGender.indexOf(gender);
      //splice elimina el elemento a partir de su posicion en el array
      this.state.filterGender.splice(positionToRemove, 1);
    } else {
      this.state.filterGender.push(gender)
    }
    this.filter();
  }
  filter() {
    let newPeople = this.state.dataperson.filter(person => {
      if ((this.state.filterCities.length === 0 || this.state.filterCities.includes(person.location.city) === true) && (this.state.filterGender.length === 0 || this.state.filterGender.includes(person.gender))) {
        return true;
      } else {
        return false;
      }
    })
    this.setState({
       filterPeople: newPeople
    });
  }
  render() {
    return (
      <div className="App">
        <Form dataCitysToPrint={this.cities} dataGender={this.gender} filterGender={this.filterGender} filterCity={this.filterCity}/>
        <ul>
          {this.state.filterPeople.map(data => {
            return(
              <li>
                <h2>{data.name.first}</h2>
                <img src={data.picture.medium} alt={`photo of ${data.name.first}`}/>
                <h3>{data.location.city}</h3>
                <h4>{data.dob.age}</h4>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
