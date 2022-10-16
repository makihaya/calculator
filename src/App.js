import { render } from "@testing-library/react";
//import React, { Component } from 'react';
import { useState } from 'react';
//import PropTypes from 'prop-types';
//import { send } from 'emailjs-com';
import React, { useRef } from 'react';
//import emailjs from '@emailjs/browser';
 
{/*BUILDING OBJECTIVES
- Display text to p tag with button
*/}
 
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      string: '',
      array: [],
      array2: [],
      result: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.calculate = this.calculate.bind(this);
  }
 
  handleInput = (event, entry) => {
    //if array is empty and entry is . push . to array
    if(this.state.array.length == 0
      && /[\.]/.test(entry) == true){
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })
    }
    //if entry is number and array is empty
    else if (/[0-9\.]/.test(entry) == true
      && this.state.array.length == 0){
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })  
    }
    //if entry is operation and array is empty
    else if(this.state.array.length == 0
      && /[*+-/^\.]/.test(entry) == true){
        return null;
    }
    //if entry is number and last entry is operation
    else if (/[0-9]/.test(entry) == true
      && /[*+-/^\.]/.test(this.state.array[this.state.array.length - 1]) == true){
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })  
    }
    //if entry is number and last entry is number or ., add entry to last entry
    else if(/[0-9]/.test(entry) == true
      && /[0-9\.]/.test(this.state.array[this.state.array.length - 1]) == true) {
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })
    }
    //if entry is . and last entry is number and does not contain ., add entry to last entry
    else if (/[\.]/.test(entry) == true
      && /[0-9]/.test(this.state.array[this.state.array.length - 1]) == true
      && this.state.array[this.state.array.length - 1].includes('.') == false) {
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })
    }
    //if entry is . and last entry is number and does contain ., keep array same
    else if (/[\.]/.test(entry) == true
      && (/[0-9\.]/.test(this.state.array[this.state.array.length - 1]) == true
      && this.state.array[this.state.array.length - 1].includes('.') == true)){
        this.setState({
          string: this.state.string,
          array: this.state.array
        })
    }
    //if entry is . and last entry is operation, push entry to array
    else if (/[\.]/.test(entry) == true
      && /[*+-/^\.]/.test(this.state.array[this.state.array.length - 1]) == true) {
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })
    }
    //if entry is operation and last entry is number, push entry to array
    else if(/[*+-/^\.]/.test(entry) == true
      && /[0-9]/.test(this.state.array[this.state.array.length - 1]) == true
      && /[\.]/.test(this.state.array[this.state.array.length - 1]) == false
      && this.state.array.length !== 0){
        this.state.array.push(entry)
        this.setState({
          string: this.state.string += entry,
          array: this.state.array
        })
    }
   
    //console.log(this.state.string);
    //console.log(this.state.array);
    //console.log('last: ' + this.state.string.slice(this.state.string.length - 1, this.state.string.length))
    //console.log('last3: ' + this.state.string.slice(this.state.string.length - 3, this.state.string.length))
    //console.log('del3: ' + this.state.string.slice(0, this.state.string.length - 3))
  }
 
  clearEntry = () => {
      this.state.array.pop();
    this.setState({
      array: this.state.array
    })
    //if last char is space, delete last 3 chars
    if(this.state.string.slice(this.state.string.length - 1, this.state.string.length) == ' '){
      this.setState({
        string: this.state.string.slice(0, this.state.string.length - 3)
      })
    }
    //else delete last 1 char
    else{
      this.setState({
        string: this.state.string.slice(0, this.state.string.length - 1) 
      })
    }
    //console.log(this.state.string);
    //console.log(this.state.array);
  }
 
  clearAll = () => {
    this.setState({
      array: [],
      array2: [],
      string: '',
      result: ''
    })
  }

  calculate = () => {
    this.state.array2 = [];
    if(/[0-9]/.test(this.state.array[this.state.array.length - 1]) == false){
      return null;
      }
    for(let i = 0; i < this.state.array.length; i++){
      switch(this.state.array[i]){
        case ' + ':
        case ' - ':
        case ' * ':
        case ' / ':
          //this.state.array.splice(this.state.array.indexOf(this.state.array[i]),
            //1, this.state.array[i]);
          this.state.array2.concat(this.state.array[i]);
          //console.log(this.state.array2);
        default:
          this.state.array2 += (this.state.array[i])
          //console.log(this.state.array2);
      }
    }
    this.state.array2 = this.state.array2.split(' ');  
    console.log(this.state.array2);
    //console.log(this.state.array)
    if(this.state.array2.length < 3){
      return null;
    }else if(/[0-9]/.test(this.state.array2[this.state.array2.length - 1]
    .charAt(this.state.array2[this.state.array2.length - 1].length - 1)) == false){
      return null;
    }else{
      let num = Number(this.state.array2[0]);
      //console.log(num)
    for(let i = 2; i < this.state.array2.length; i+=2){
      //console.log(this.state.array2[i - 1]);
      //console.log(Number(this.state.array2[i]));
      switch(this.state.array2[i - 1]){
        case '+':
          num += Number(this.state.array2[i]);
          break;
        case '-':
          num -= Number(this.state.array2[[i]]);
          break;
        case '*':
          num *= Number(this.state.array2[i]);
          break;
        case '/':
          num /= Number(this.state.array2[[i]]);
          break;
        default:
          continue;
      }//console.log('num: ' + num)
    }
    //console.log(this.state.array2);
    //console.log(this.state.array.join(' '));
    
    this.state.result = num;
    this.setState({
      result: this.state.result
    })
    console.log(this.state.result);
    }
  }
 
  render(){
    const pStyle = {
      width: 250,
      height: 25,
      border: '1px solid black'
    }
    return(
      <div>
      <p style={pStyle}>{this.state.string}</p>
      <p style={pStyle}>= {this.state.result}</p>
      <div>
        <button onClick={this.clearEntry}>CE</button>
        <button onClick={this.clearAll}>C</button>
      </div>
     
      <div>
        <button onClick={event => this.handleInput(event, '1')}>1</button>
        <button onClick={event => this.handleInput(event, '2')}>2</button>
        <button onClick={event => this.handleInput(event, '3')}>3</button>
        <button onClick={event => this.handleInput(event, '4')}>4</button>
        <button onClick={event => this.handleInput(event, '5')}>5</button>
        <button onClick={event => this.handleInput(event, '6')}>6</button>
        <button onClick={event => this.handleInput(event, '7')}>7</button>
        <button onClick={event => this.handleInput(event, '8')}>8</button>
        <button onClick={event => this.handleInput(event, '9')}>9</button>
        <button onClick={event => this.handleInput(event, '0')}>0</button>
      </div>
     
      <div>
        <button onClick={event => this.handleInput(event, '.')}>.</button>
        <button onClick={event => this.handleInput(event, ' + ')}>+</button>
        <button onClick={event => this.handleInput(event, ' - ')}>–</button>
        <button onClick={event => this.handleInput(event, ' / ')}>÷</button>
        <button onClick={event => this.handleInput(event, ' * ')}>×</button>
      </div>

      <div>
        <button onClick={this.calculate}>=</button>
      </div>

    </div>

    )
  }
};
export default DisplayMessages;
