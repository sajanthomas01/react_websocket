import React from 'react';
import Websocket from 'react-websocket';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myid: '',
      recid:'',
      message: ''
    }
  }
  handleData(stream) {
    let data = JSON.parse(stream);
    console.log(data.id);
    console.log('state ===> ',this.state.message);
    if (data.id === this.state.myid) {
      alert(data.message);
    }

  }
  handleOpen() {
    alert("connected:)");
  }
  handleClose() {
    alert("disconnected:(");
  }

  sendMessage() {
    const obj = {
      message: this.state.message,
      id: this.state.recid
    }
    this.refWebSocket.sendMessage(JSON.stringify(obj));
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Set My ID" value={this.state.id} onChange={(e) => this.setState({ myid: e.target.value })} /><br></br>
        <input type="text" placeholder="Set Receipent ID" value={this.state.id} onChange={(e) => this.setState({ recid: e.target.value })} /><br></br>
        <input type="text" placeholder="Input Message" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />
        <button onClick={() => this.sendMessage()} >Send Message</button><br></br>
        MY ID  ===> {this.state.myid}<br></br>
        Message to {this.state.recid} : {this.state.message}
        <Websocket url='ws://localhost:8888/live'  onMessage={this.handleData.bind(this)}
          onOpen={this.handleOpen} onClose={this.handleClose}
          reconnect={true} debug={true}
          ref={Websocket => {
            this.refWebSocket = Websocket;
          }} />
      </div>
    );
  }
}

export default App;