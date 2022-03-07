import React, { Component } from 'react'; //different
import { useHistory } from 'react-router-dom';

let user = "null";
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.authenticated)
        console.log(this.props.currentUser)
        
        return (
            <div className='appMain'>
            <div className='circleContainer'>
            {this.props.authenticated ? <img className="avatar" src={this.props.currentUser.imageUrl} alt="logo"/>: <img className="avatar" src="https://eplecaki.pl/51077-thickbox_default/zeszyt-a5-16kart-cienie-linie-rachaelhale-kotek-meow.jpg" alt="logo"/>}
            </div>
               <div className="container">
               <div className="menu">
               <p className="menuText"> {this.props.authenticated ? <div>Witaj {this.props.currentUser.name}!</div>: <div>Witaj Gość!</div>}</p>
               <button className="buttonGET" onClick={()=> this.props.history.push("/get")}>GET</button>
               <button className="buttonPOST" onClick={()=> this.props.history.push("/post")}>POST</button>
               <button className="buttonPUT" onClick={()=> this.props.history.push("/put")}>PUT</button>
               <button className="buttonDELETE" onClick={()=> this.props.history.push("/delete")}>DELETE</button>
               </div>
               </div>
               {this.props.authenticated ? <button className="buttonLOGIN"  onClick={this.props.onLogout}>Log out</button>: <button className="buttonLOGIN" onClick={()=> this.props.history.push("/login")}>Log in</button>}
               </div>
           );
    }
}


export default Home;