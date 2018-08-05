import React from 'react';

class Form extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <form action="city">
        <h2>Cities</h2>
        {this.props.dataCitysToPrint.map(data => {
          return (
            <div>
              <label htmlFor={data}>{data}</label>
              <input id={data} type="checkbox" value={data} name={data} onChange={this.props.filterCity}/>
            </div>
          )
        })}
        <h2>Gender</h2>
        {this.props.dataGender.map(data => {
          return (
            <div>
              <label htmlFor={data}>{data}</label>
              <input id={data} type="checkbox" value={data} name={data} onChange={this.props.filterGender}/>
            </div>
          )
        })}
      </form>
    );
  }
}

export default Form;
