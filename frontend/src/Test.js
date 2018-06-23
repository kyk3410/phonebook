import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {

  state = {
    number : 0,
    list : [],
    send : ''
  }

  getNumberList(){
    axios.get('http://localhost:4000/test')
    .then((response)=>{
        console.log(response.data);
        this.setState({ list : response.data.result});
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  handleClick(){
    // 통신을 한다. (axios);
    this.getNumberList();
  }

  handleChange(e){
    console.log(e.target.value);
    this.setState({send: e.target.value});
  }

  submitClick(){
    // 데이터를 백엔드에 보내 준다.
    // 입력시킨다. (POST)
    console.log(this.state.send);
    axios.post('http://localhost:4000/test',{num : this.state.send})
      .then((response)=>{
        console.log(response.data);
        this.getNumberList();
      }).catch((error)=>{
        console.log(error);
      });
  }
    render() {

      const {list} = this.state;
      // console.log(list);
      const numberList = list.map((value)=>{
        return <h2 key={value.id}>{value.number}</h2>
      });

        return(
            <div>
              <button onClick={this.handleClick.bind(this)}>통신하기</button>
              {/* <h2>{this.state.number}</h2> */}
              <div>{numberList}</div>
              <input type="text" onChange={this.handleChange.bind(this)}/>
              <button onClick={this.submitClick.bind(this)}>입력하기</button>
            </div>
        );
    }
}
export default Test;
