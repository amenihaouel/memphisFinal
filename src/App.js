/* eslint-disable no-undef */
import React, {
  Component
} from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import "./App.css";
import Tempchart from "./components/Tempchart";
import Bothchart from "./components/Bothchart";
import Login from "./components/Login";
import BothchartDoor from "./components/BothchartDoor";

import Map from "./GoogleMapsContainer.js";
import io from "socket.io-client";
import * as moment from "moment";

import map from "./images/le41.png";

import Capture from "./images/storeplan 2.png";
import temps from "./images/thermometer.png";
import doors from "./images/open-exit-door.png";
import ibm from "./images/ibm.png";
import watts from "./images/ray.png";
import casino from "./images/logoCasino.png";
import watson from "./images/ibm_watson_avatar_200.png";
import notifications from "./images/notifications-bell-button with notif.png";
import lines from "./images/lines.png";
import {
  isNumber
} from "util";

const tab = [];

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "500px", // <-- This sets the height
    overlfow: "scroll"
  }
};

Modal.setAppElement("#root");

class App extends Component {
  state = {
    connected: false,
    tempSensor: "",
    doorSensor: "",
    tempTab: [],
    doorTab: [],
    rawTempData: [],
    rawDoorData: [],
    lastTemp: "",
    lastTempDate: "",
    time: "",
    modalIsOpen: false,
    doorModalIsOpen: false,
    bothModalIsOpen: false,
    dataDoorBothCurrent: {
      id: "2",
      title: "Ouvertures des portes et Alertes pour le Rayon charcuterie",
      type: "both",
      data: []
    },
    bothData: {
      id: "5",
      title: "Température et ouverture",
      type: "both",
      data: []
    },
    dataTempCurrent: {
      id: "1",
      title: "Température pour le Rayon charcuterie",
      device: "Rayon charcuterie",
      type: "temp",
      data: [{
        x: "1538257155",
        y: 1
      }]
    },
    dataDoorCurrent: {
      id: "3",
      title: "Ouverture pour le Rayon charcuterie",
      device: " Rayon charcuterie",
      type: "door",
      data: [{
        x: "1538257155",
        y: 1
      }]
    },
    dataAlertCurrent: {
      id: "3",
      title: "Alertes pour le Rayon charcuterie",
      device: " Rayon charcuterie",
      type: "door",
      data: []
    },
    dataTemp1: {
      id: "1",
      class: "category 1",
      title: "Température pour le Rayon charcuterie",
      device: "Rayon charcuterie",
      type: "temp",
      data: []
    },
    dataTemp2: {
      id: "2",
      class: "category 2",
      title: "Température pour le Rayon boucherie-volaille",
      device: "Rayon boucherie-volaille",
      type: "temp",
      data: []
    },
    dataTemp3: {
      id: "3",
      title: "Température pour le Rayon ultra frais",
      device: "Rayon ultra frais",
      type: "temp",
      data: []
    },
    dataDoor1: {
      id: "3",
      title: "Ouverture pour le Rayon charcuterie",
      device: "Rayon charcuterie",
      type: "door",
      data: [{
        alert: false
      }]
    },
    dataDoor2: {
      id: "3",
      class: "category 2",
      title: "Ouverture pour le Rayon boucherie-volaille",
      device: "Rayon boucherie-volaille",
      type: "door",
      data: [{
        alert: false
      }]
    },
    dataDoor3: {
      id: "3",
      class: "category 1",
      title: "Ouverture pour le Rayon ultra frais",
      device: "Rayon ultra frais",
      type: "door",
      data: [{
        alert: false
      }]
    }
  };

  getLastDoor = (id) => {
    switch (id) {
      case 1:
        fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88B318", {
            method: "GET",
            mode: "cors"
          })
          .then(r => {
            if (r.ok) return r.json();
            else return {
              error: r.statusText
            };
          })
          .then(json => {
            this.processDoorData(id, json);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        break;

      case 2:
        fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88B329", {
            method: "GET",
            mode: "cors"
          })
          .then(r => {
            if (r.ok) return r.json();
            else return {
              error: r.statusText
            };
          })
          .then(json => {
            this.processDoorData(id, json);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        break;

      case 3:
        fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88B34C", {
            method: "GET",
            mode: "cors"
          })
          .then(r => {
            if (r.ok) return r.json();
            else return {
              error: r.statusText
            };
          })
          .then(json => {
            this.processDoorData(id, json);
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        break;
    }
  };

  getLastTemp = (id) => {
    switch (id) {
      case 1:
        fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88AD22", {
            method: "GET",
            mode: "cors"
          })
          .then(r => {
            if (r.ok) return r.json();
            else return {
              error: r.statusText
            };
          })
          .then(json => {
            this.processTempData(id, json);
        
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        break;

      case 2:
        fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88AD1F", {
            method: "GET",
            mode: "cors"
          })
          .then(r => {
            if (r.ok) return r.json();
            else return {
              error: r.statusText
            };
          })
          .then(json => {
            this.processTempData(id, json);
          
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        break;

      case 3:
        fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88AD1A", {
            method: "GET",
            mode: "cors"
          })
          .then(r => {
            if (r.ok) return r.json();
            else return {
              error: r.statusText
            };
          })
          .then(json => {
            this.processTempData(id, json);
          
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        break;
    }
  };
    
  processTempData(id, json) {
    var tmpTab = [];
    let nbrNotifs = 0;
    for (var i = 0; i < json.length; i++) {
      var element = {
        x: json[i].time,
        y: json[i].data
      };
      tmpTab.push(element);
    }
    switch(id){
    case 1:
    {
      tmpTab.forEach(function(el){
      if(el.y <-1 || el.y>7)
          nbrNotifs ++
      });
    }
    break;
    case 2:
    {
      tmpTab.forEach(function(el){
        if(el.y <-1 || el.y>5)
            nbrNotifs ++
        });
    }
    break;
    case 3:
    {
      tmpTab.forEach(function(el){
        if(el.y <-1 || el.y>5)
            nbrNotifs ++
        });
    }
    break;
  }
    console.log("nnnnnn",nbrNotifs);
    this.setState({
      lastTemp: json[json.length - 1].data,
      lastTempDate: json[json.length - 1].time,
      tempTab: tmpTab,
      nbrNotifsTemp: nbrNotifs,
      rawTempData: json
    });
  }
 

  processDoorData(id, json) {
    var tmpDoor = [];
    for (var i = 0; i < json.length; i++) {
      var element = {
        x: json[i].time,
        y: json[i].data,
        alert: json[i].alert
      };
      tmpDoor.push(element);
     
    }
    console.log("aaaa1",tmpDoor);
    let nbrAlerts = 0;
    tmpDoor.forEach(function(el){
      if(el.alert)
       nbrAlerts++;
    });
    console.log("aaaa",nbrAlerts);
    this.setState({
      lastDoor: json[json.length - 1].data,
      lastDoorDate: json[json.length - 1].time,
      doorTab: tmpDoor,
      nbrLastAlerts: nbrAlerts,
      rawDoorData: json
    });
  }

  addElementToDataTempCurrent(jsonObject) {
    var newData = {
      x: jsonObject.time,
      y: jsonObject.data
    };
    console.log("newData ", newData);
    var tmpTab = this.state.dataTempCurrent.data;
    tmpTab.push(newData);
    console.log("tmpTab ", tmpTab);
    this.setState({
      dataTempCurrent: {
        id: "1",
        title: "Température pour le " + this.state.dataTempCurrent.device,
        device: this.state.dataTempCurrent.device,
        type: "temp",
        data: tmpTab
      }
    });
  }

  openModal(type) {
    /**
     * Before opening modal we setState for datat with real temperature sensor data
     */
    var tmpTab = [];
    for (var i in this.state.rawTempData) {
      var tmp = {
        x: this.state.rawTempData[i].time,
        y: this.state.rawTempData[i].data
      };
      tmpTab.push(tmp);
    }
    this.setState({
      dataTempCurrent: {
        id: "1",
        title: "Température pour le " + this.state.dataTempCurrent.device,
        device: this.state.dataTempCurrent.device,
        type: "temp",
        data: tmpTab
      }
    }, () => {

      //
      // Init Door Openings
      //
      var tmpTab2 = [];
      console.log("rawDoorData ", this.state.rawDoorData);
      for (var i in this.state.rawDoorData) {
        var tmp2 = {
          x: this.state.rawDoorData[i].time,
          y: this.state.rawDoorData[i].data
        };
      
        tmpTab2.push(tmp2);
      }
      console.log("dataDoorCurrent", tmpTab2);
      this.setState({
        dataDoorCurrent: {
          id: "1",
          title: "Ouvertures de portes pour le " + this.state.dataDoorCurrent.device,
          device: this.state.dataDoorCurrent.device,
          type: "opening",
          data: tmpTab2
        }
      }, () => {
        console.log("dataDoorCurrent", tmpTab2);


        //
        // Init Door Alerts
        //
        var tmpTab3 = [];
        for (var i in this.state.rawDoorData) {
          var tmp3 = {
            x: this.state.rawDoorData[i].time,
            y: (this.state.rawDoorData[i].alert ? "Ouverte" : "Fermée")
          };
          tmpTab3.push(tmp3);
        }
        console.log("dataAlertCurrent", tmpTab3);

        this.setState({
          dataAlertCurrent: {
            id: "1",
            title: "Alertes de portes pour le " + this.state.dataDoorCurrent.device,
            device: this.state.dataDoorCurrent.device,
            type: "alert",
            data: tmpTab3
          }
        }, () => {


          const dataDoorBothCurrent_ = {
            alert: this.state.dataAlertCurrent,
            door: this.state.dataDoorCurrent
          };
          console.log("datadoorboth ", dataDoorBothCurrent_);
          this.setState({
            dataDoorBothCurrent: {
              id: "2",
              title: "Température et ouverture",
              type: "both",
              device: this.state.dataDoorCurrent.device,
              data: dataDoorBothCurrent_
            }
          }, () => {

            const bothData_ = {
              temp: this.state.dataTempCurrent,
              door: this.state.dataDoorCurrent
            };
            console.log("databoth ", bothData_);
            this.setState({
              bothData: {
                id: "5",
                title: "Température et ouverture",
                type: "both",
                device: this.state.dataTempCurrent.device,
                data: bothData_
              }
            }, () => {
              //
              //
              //
              console.log("Opening " + type);
              if (type === "both") {
                this.setState({
                  bothModalIsOpen: true
                });

              } else if (type === "temp") {
                this.setState({
                  modalIsOpen: true
                });
              } else { // Door
                this.setState({
                  doorModalIsOpen: true
                });
              }
            }); // SetState bothdata
          }); // dataDoorBothCurrent
        }); // dataAlertCurrent
      }); // dataDoorCurrent
    });
  }

  closeModal(type) {
    if (type === "both") {
      this.setState({
        bothModalIsOpen: false
      });
    } else {
      if (type === "temp") {
        this.setState({
          modalIsOpen: false
        });
      } else {
        this.setState({
          doorModalIsOpen: false
        });
      }
    }
  }

  componentDidMount() {
   
    this.getLastTemp(1);
    this.getLastDoor(1);

    // Create a socket instance
    var socket = new WebSocket("wss://memphis.eu-gb.mybluemix.net/ws/temp");

    // Open the socket
    socket.onopen = function (event) {
      socket.send("I am the client and I'm listening!");
    };

    // Listen for messages
    socket.onmessage = event => {
      console.log("Client received a message", event);
      console.log("data ", event.data);
      var jsonObject = JSON.parse(event.data);
      console.log("json Object : ", jsonObject);

      if (jsonObject.device == this.state.tempSensor) {
        //this.updateLastTemp(jsonObject.data);
        var element = {
          x: jsonObject.timestring,
          y: jsonObject.data
        };
        this.setState({
          lastTemp: jsonObject.data,
          lastTempDate: jsonObject.time,
          tempTab: [...this.state.tempTab, element],
          rawTempData: [...this.state.rawTempData, jsonObject]
        });
        this.addElementToDataTempCurrent(jsonObject);
      }

      if (jsonObject.device == this.state.doorSensor) {
        //this.updateLastTemp(jsonObject.data);
        var element = {
          x: jsonObject.timestring,
          y: jsonObject.data
        };
        this.setState({
          lastDoor: jsonObject.data , //doit represnter le nbre réel coté hamed
          lastDoorDate: jsonObject.time,
          doorTab: [...this.state.doorTab, element],
          rawDoorData: [...this.state.rawDoorData, jsonObject]
        });
        this.addElementToDataTempCurrent(jsonObject);
      }
    };

    // Listen for socket closes
    socket.onclose = function (event) {
      console.log("Client notified socket has closed", event);
    };
  }

  initialState = { ...this.state
  };

  onTempClick = id => {
    this.openModal("temp");
  };

  onDoorClick = (couple) => {
    console.log('couple', couple);
    this.openModal("door");
  };

  onWatsonClick = () => {
    this.openModal("both");
  };

  handleLogin = (status) => {
    console.log('login', status);
    this.setState({connected: status});
  }

  setCurrentTempSensorTo(number) {
    switch (number) {
      case 1:
      this.getLastDoor(1);
      this.getLastTemp(1);
        this.setState({
          tempSensor: "88AD22",
          dataTempCurrent: this.state.dataTemp1,
          dataDoorCurrent: this.state.dataDoor1
        });
        console.log('HERE', this.state.dataDoorCurrent);
        console.log("sensor 1", this.state.dataTemp1);
        // this.getLastTemp(1);
        break;

      case 2:
        this.getLastDoor(2);
        this.getLastTemp(2);
        this.setState({
          tempSensor: "88AD1F",
          dataTempCurrent: this.state.dataTemp2,
          dataDoorCurrent: this.state.dataDoor2
        });
        console.log("sensor 2", this.state.dataTemp2);
        // this.getLastTemp(2);
        break;

      case 3:
        this.getLastDoor(3);
        this.getLastTemp(3);
        this.setState({
          tempSensor: "88AD1A",
          dataTempCurrent: this.state.dataTemp3,
          dataDoorCurrent: this.state.dataDoor3 
        });
        console.log("sensor 3", this.state.dataTemp3);
        // this.getLastTemp(3);
        break;
    }
    // console.log(this.state.dataTempCurrent);
  }

  setCurrentDoorSensorTo(number) {
    switch (number) {
      case 1:
      this.getLastDoor(1);
      this.getLastTemp(1);
        this.setState({
          doorSensor: "88B318",
          dataTempCurrent: this.state.dataTemp1,
          dataDoorCurrent: this.state.dataDoor1
        });
        console.log("sensor 1", this.state.dataDoor1);
        break;

      case 2:
        this.getLastDoor(2);
        this.getLastTemp(2);
        this.setState({
          doorSensor: "88B329",
          dataTempCurrent: this.state.dataTemp2,
          dataDoorCurrent: this.state.dataDoor2
        });
        console.log("sensor 2", this.state.dataDoor2);
        // this.getLastDoor(2);
        break;

      case 3:
        this.getLastDoor(3);
        this.getLastTemp(3);
        this.setState({
          doorSensor: "88B34C",
          dataTempCurrent: this.state.dataTemp3,
          dataDoorCurrent: this.state.dataDoor3
        });
        console.log("sensor 3", this.state.dataDoor3);
        this.getLastDoor(3);
        break;

    }
    // console.log(this.state.dataDoorCurrent);
  }

  render() {
      const {
        lastTemp,
        time,
        tempTab,
        lastTempDate
      } = this.state;
      // console.log("lastTemp ", lastTemp);
      // console.log("tempTab ", tempTab);
      // console.log("lasttempDate ", lastTempDate);

      {if (this.state.connected) {
      return ( 
      <div className = "App" >
          <Modal isOpen = {
            this.state.modalIsOpen
          }
          onRequestClose = {
            this.closeModal.bind(this, "temp")
          }
          style = {
            modalStyles
          }
          contentLabel = "Temp chart" >
          <Tempchart data = {
            this.state.dataTempCurrent
          }
          />


          </Modal>

          <Modal isOpen = {
            this.state.doorModalIsOpen
          }
          onRequestClose = {
            this.closeModal.bind(this, "door")
          }
          style = {
            modalStyles
          }
          contentLabel = "Door chart" >
          <BothchartDoor data = {this.state.dataDoorBothCurrent}/> </Modal >

          <Modal isOpen = {
            this.state.bothModalIsOpen
          }
          onRequestClose = {
            this.closeModal.bind(this, "both")
          }
          style = {
            modalStyles
          }
          contentLabel = "Both chart" >
          <Bothchart data = {
            this.state.bothData
          }/> </Modal >

          <header className = "App-header" > { /*<p className="App-title">Tableau de bord CASINO par IBM <img className="header-img" src={watson} /></p>*/ } <img className = "header-img"
          src = {
            casino
          } /> <div className = "header-menu right" >
          <img className = "header-img right"
          src = {
            ibm
          }/> <img className = "header-img right"
          src = {
            notifications
          }
          /> <img className = "header-img right lines"
          src = {
            lines
          }/> </div > </header> <div className = "map-container" >
          <div className = "map-header" >
          <span > Cartographie des magasins </span> </div > <img src={map} className = "actual-map" / >
          </div>

          <div className = "div-display" >
          <div className = "plan" >
          <div className = "store-map-header" >
          <span > Plan du magasin </span> </div > <img className = "temp-img-plan-1"
          src = {
            temps
          }
          onClick = {
            this.setCurrentTempSensorTo.bind(this, 1)
          }
          /> <img className = "temp-img-plan-2"
          src = {
            doors
          }
          onClick = {
            this.setCurrentDoorSensorTo.bind(this, 1)
          }
          />

          <img className = "temp-img-plan-3"
          src = {
            temps
          }
          onClick = {
            this.setCurrentTempSensorTo.bind(this, 2)
          }/> <img className = "temp-img-plan-4"
          src = {
            doors
          }
          onClick = {
            this.setCurrentDoorSensorTo.bind(this, 2)
          }
          /> <img className = "temp-img-plan-5"
          src = {
            temps
          }
          onClick = {
            this.setCurrentTempSensorTo.bind(this, 3)
          }
          /> <img className = "temp-img-plan-6"
          src = {
            doors
          }
          onClick = {
            this.setCurrentDoorSensorTo.bind(this, 3)
          }
          /> <img className = "temp-img-plan-main"
          src = {
            Capture
          }
          /> </div > <div className = "first-column" > 
          
          
          
          { /* température */ }
          
          
          <div className = "card temp-card" onClick = {this.onTempClick.bind(this, 1)}>
            <div className = "card-title" >
              <span >Alertes Température {this.state.dataTempCurrent.device} </span> 
            </div > 
          <div className = "card-content" >
          <div className = "card-left-content" >
          <div className = "card-data" >
          <div className = "number-display center" > {
            lastTemp
          }°
          C </div> <div className = "icon-display" >
          <img className = "temp-img center"
          src = {
            temps
          }
          /> </div > </div> <div className = "card-info-title" >
          <div className = "font-display" > {
            moment
            .unix(this.state.lastTempDate)
            .format("HH:mm DD/MM")
          } </div> { /* < div className = "font-display" > à {
            time
          } < /div>*/
        } </div> </div > <div className = "card-right-content" >
        <div className = "card-data" >
        <div className = "number-display" > {
          this.state.nbrNotifsTemp
        } alerte(s) </div> </div > <div className = "card-info-title" >
        <div className = "notif" > Dernières 5h </div> </div > </div> </div > </div>

        <div className = "card" >
        <div className = "card-title" >
        <span > Consommation Electrique </span> </div > <div className = "card-content" >
        <div className = "card-left-content" >
        <div className = "card-data" >
        <div className = "card-data-value" >
        <div className = "number-display" > 220 </div> <div className = "smaller" > (kwh) </div> </div > <div className = "icon-display" >
        <img className = "temp-img"
      src = {
        watts
      }
      /> </div > </div> <div className = "card-info-title" >
        <div className = "font-display" > Ce mois </div> </div > </div> <div className = "card-right-content" >
        <div className = "card-data" >
        <div className = "number-display red" > +3 % </div> </div > <div className = "card-info-title" >
        <div className = "notif" > Comparée au dernier mois </div> </div > </div> </div > </div> </div >

        { /* Portes ouvertes/fermées */ } <div className = "second-column" >
        <div className = "card"
      onClick = {
          this.onDoorClick.bind(this, 1)
        } >
        <div className = "card-title" >
        <span >
        Alertes Porte Meuble Froid {
          this.state.dataDoorCurrent.device
        } </span> </div > <div className = "card-content" >
        <div className = "card-left-content" >
        <div className = "card-data" >
        <div className = "red center" > {
          this.state.lastDoor
        }  Ouverture(s)  </div> <div className = "icon-display" >
      
        <img className = "temp-img"
      src = {
        doors
      }
      />  
      </div > 
      
      </div>
      <div className = "notifO" > Dernières 10 minutes  </div>   {
      /*                  <div className="card-info-title">
                          <div className="font-display">il y a 3 minutes</div>
                        </div>*/
    } </div> <div className = "card-right-content" >
    <div className = "card-data" >
    <div className = "number-display" > {
      this.state.nbrLastAlerts
    } alerte(s) </div> 
    </div > 
    <div className = "card-info-title" >
    <div className = "notif" > Dernières 5h   </div> 
    </div > </div> </div > </div>

  { /* Variations temp */ } <div className = "card"
  onClick = {
      this.onWatsonClick.bind(this, 1)
    }> 
    <div className = "card-title" >
    <span> Watson IoT Insights </span> </div> <div className = "card-content" >
    <div className = "card-left-content-iot" >
    <div className = "card-info-title" >
    <div className = "notif" >
    "Variation de température causée par l'ouverture des
  portes." </div > </div> </div >

    <div className = "card-right-content-iot" >
    <div className = "card-data" >
    <div className = "icon-display" >
    <img className = "temp-img"src = {watson}/> 
    </div > 
    </div> 
    </div > 
    </div> 
    </div> 
    </div> 
    </div> 
    </div>
    );
    } else {
      // Rander the login if not connected
      return (
        <div>
          <Login onLogin={this.handleLogin} key="1"></Login>
        </div>
      );
    }
  }
}
}
export default App;
