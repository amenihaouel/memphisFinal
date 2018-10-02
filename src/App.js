/* eslint-disable no-undef */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import "./App.css";
import Tempchart from "./components/Tempchart";
import Bothchart from "./components/Bothchart";
import Login from "./components/Login";

import Map from "./GoogleMapsContainer.js";
import io from "socket.io-client";
import * as moment from "moment";

import Capture from "./images/Capture.PNG";
import temps from "./images/thermometer.png";
import doors from "./images/open-exit-door.png";
import ibm from "./images/ibm.png";
import watts from "./images/ray.png";
import casino from "./images/logoCasino.png";
import watson from "./images/ibm_watson_avatar_200.png";
import notifications from "./images/notifications-bell-button with notif.png";
import lines from "./images/lines.png";
import { isNumber } from "util";

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
    tempTab: [],
    rawTempData: [],
    lastTemp: "",
    lastTempDate: "",
    time: "",
    modalIsOpen: false,
    doorModalIsOpen: false,
    bothModalIsOpen: false,
    bothData: {
      id: "5",
      title: "Température et ouverture",
      type: "both",
      data: []
    },
    dataTempCurrent: {
      id: "1",
      title: "Température pour le capteur 1",
      device: "capteur 1",
      type: "temp",
      data: [
        { x: "1538257155", y: "7" },
        { x: "1538267155", y: "4" },
        { x: "1538277155", y: "11" },
        { x: "1538287155", y: "3" },
        { x: "1538297155", y: "7" },
        { x: "1538357155", y: "6" },
        { x: "1538317155", y: "7" },
        { x: "1538327155", y: "12" },
        { x: "1538337155", y: "12" },
        { x: "1538357155", y: "12" }
      ]
    },
    dataDoorCurrent: {
      id: "3",
      title: "Ouverture pour le capteur 1",
      device: "capteur 1",
      type: "door",
      data: [
        { x: "1538257155", y: 1 },
        { x: "1538267155", y: 0 },
        { x: "1538277155", y: 0 },
        { x: "1538287155", y: 0 },
        { x: "1538297155", y: 1 },
        { x: "1538357155", y: 1 },
        { x: "1538317155", y: 0 },
        { x: "1538327155", y: 0 }
      ]
    },
    dataTemp1: {
      id: "1",
      class: "category 1",
      title: "Température pour le capteur 1",
      device: "capteur 1",
      type: "temp",
      data: [
        { x: "1538257155", y: "7" },
        { x: "1538267155", y: "4" },
        { x: "1538277155", y: "11" },
        { x: "1538287155", y: "3" },
        { x: "1538297155", y: "7" },
        { x: "1538357155", y: "6" },
        { x: "1538317155", y: "7" },
        { x: "1538327155", y: "12" }
      ]
    },
    dataTemp2: {
      id: "2",
      class: "category 2",
      title: "Température pour le capteur 2",
      device: "capteur 2",
      type: "temp",
      data: [
        { x: "1538257155", y: "5" },
        { x: "1538267155", y: "6" },
        { x: "1538277155", y: "16" },
        { x: "1538287155", y: "0" },
        { x: "1538297155", y: "-1" },
        { x: "1538357155", y: "-5" },
        { x: "1538317155", y: "7" },
        { x: "1538327155", y: "12" },
        { x: "1538337155", y: "8" },
        { x: "1538347155", y: "5" }
      ]
    },
    dataDoor2: {
      id: "3",
      class: "category 2",
      title: "Ouverture pour le capteur 2",
      device: "capteur 2",
      type: "door",
      data: [
        { x: "1538257155", y: 0 },
        { x: "1538267155", y: 1 },
        { x: "1538277155", y: 1 },
        { x: "1538287155", y: 1 },
        { x: "1538297155", y: 1 },
        { x: "1538357155", y: 1 },
        { x: "1538317155", y: 0 },
        { x: "1538327155", y: 0 }
      ]
    },
    dataDoor1: {
      id: "3",
      class: "category 1",
      title: "Ouverture pour le capteur 1",
      device: "capteur 1",
      type: "door",
      data: [
        { x: "1538257155", y: 1 },
        { x: "1538267155", y: 0 },
        { x: "1538277155", y: 0 },
        { x: "1538287155", y: 0 },
        { x: "1538297155", y: 1 },
        { x: "1538357155", y: 1 },
        { x: "1538317155", y: 0 },
        { x: "1538327155", y: 0 }
      ]
    }
  };

  getLastTemp = () => {
    fetch("https://memphis.eu-gb.mybluemix.net/getHisto?deviceid=88AD22", {
      method: "GET",
      mode: "cors"
    })
      .then(r => {
        if (r.ok) return r.json();
        else return { error: r.statusText };
      })
      .then(json => {
        this.processTempData(json);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  processTempData(json) {
    var tmpTab = [];
    for (var i = 0; i < json.length; i++) {
      var element = { x: json[i].timestring, y: json[i].data };
      tmpTab.push(element);
    }
    this.setState({
      lastTemp: json[json.length - 1].data,
      lastTempDate: json[json.length - 1].time,
      tempTab: tmpTab,
      rawTempData: json
    });
  }

  addElementToDataTempCurrent(jsonObject) {
    var newData = { x: jsonObject.time, y: jsonObject.data };
    console.log("newData ", newData);
    var tmpTab = this.state.dataTempCurrent.data;
    tmpTab.push(newData);
    console.log("tmpTab ", tmpTab);
    this.setState({
      dataTempCurrent: {
        id: "1",
        title: "Température pour le capteur 1",
        device: "capteur 1",
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
    for (var i = 0; i < this.state.rawTempData.length; i++) {
      var tmp = {
        x: this.state.rawTempData[i].time,
        y: this.state.rawTempData[i].data
      };
      tmpTab.push(tmp);
    }
    this.setState({
      dataTempCurrent: {
        id: "1",
        title: "Température pour le capteur 1",
        device: "capteur 1",
        type: "temp",
        data: tmpTab
      }
    });

    console.log(type);
    if (type === "both") {
      const bothData = {
        temp: this.state.dataTempCurrent,
        door: this.state.dataDoorCurrent
      };
      this.setState({
        bothData: {
          id: "5",
          title: "Température et ouverture",
          type: "both",
          device: this.state.dataTempCurrent.device,
          data: bothData
        }
      });
      this.setState({ bothModalIsOpen: true });
    } else {
      if (type === "temp") {
        this.setState({ modalIsOpen: true });
      } else {
        this.setState({ doorModalIsOpen: true });
      }
    }
  }

  closeModal(type) {
    if (type === "both") {
      this.setState({ bothModalIsOpen: false });
    } else {
      if (type === "temp") {
        this.setState({ modalIsOpen: false });
      } else {
        this.setState({ doorModalIsOpen: false });
      }
    }
  }

  componentDidMount() {
    this.getLastTemp();
    // Create a socket instance
    var socket = new WebSocket("wss://memphis.eu-gb.mybluemix.net/ws/temp");

    // Open the socket
    socket.onopen = function(event) {
      socket.send("I am the client and I'm listening!");
    };

    // Listen for messages
    socket.onmessage = event => {
      console.log("Client received a message", event);
      console.log("data ", event.data);
      var jsonObject = JSON.parse(event.data);
      console.log("json Object : ", jsonObject);
      if (jsonObject.device == "88AD22") {
        //this.updateLastTemp(jsonObject.data);
        var element = { x: jsonObject.timestring, y: jsonObject.data };
        this.setState({
          lastTemp: jsonObject.data,
          lastTempDate: jsonObject.time,
          tempTab: [...this.state.tempTab, element],
          rawTempData: [...this.state.rawTempData, jsonObject]
        });
        this.addElementToDataTempCurrent(jsonObject);
      }
    };

    // Listen for socket closes
    socket.onclose = function(event) {
      console.log("Client notified socket has closed", event);
    };
  }

  initialState = { ...this.state };

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
    if (number === 1) {
      this.setState({ 
        dataTempCurrent: this.state.dataTemp1,
        dataDoorCurrent: this.state.dataDoor1 
      });
      console.log("sensor 1", this.state.dataTemp1);
    } else {
      console.log("sensor 2", this.state.dataTemp2);
      this.setState({ 
        dataTempCurrent: this.state.dataTemp2,
        dataDoorCurrent: this.state.dataDoor2 
      });
    }
    console.log(this.state.dataTempCurrent);
  }

  setCurrentDoorSensorTo(number) {
    if (number === 1) {
      this.setState({ dataDoorCurrent: this.state.dataDoor1 });
      console.log("sensor 1", this.state.dataDoor1);
    } else {
      console.log("sensor 2", this.state.dataDoor2);
      this.setState({ dataDoorCurrent: this.state.dataDoor2 });
    }
    console.log(this.state.dataDoorCurrent);
  }

  render() {
    const { lastTemp, time, tempTab, lastTempDate } = this.state;
    console.log("lastTemp ", lastTemp);
    console.log("tempTab ", tempTab);
    console.log("lasttempDate ", lastTempDate);

    {if (this.state.connected) {
      return (
        <div className="App">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this, "temp")}
          style={modalStyles}
          contentLabel="Temp chart"
        >
          <Tempchart data={this.state.dataTempCurrent} />

          <ul>
            {this.state.tempTab.map(value => (
              <li>
                {" "}
                Température : {value.y}, relevé à {value.x}{" "}
              </li>
            ))}
          </ul>
        </Modal>

        <Modal
          isOpen={this.state.doorModalIsOpen}
          onRequestClose={this.closeModal.bind(this, "door")}
          style={modalStyles}
          contentLabel="Door chart"
        >
          <Tempchart data={this.state.dataDoorCurrent} />
        </Modal>

        <Modal
          isOpen={this.state.bothModalIsOpen}
          onRequestClose={this.closeModal.bind(this, "both")}
          style={modalStyles}
          contentLabel="Both chart"
        >
          <Bothchart data={this.state.bothData} />
        </Modal>

        <header className="App-header">
          {/*<p className="App-title">Tableau de bord CASINO par IBM <img className="header-img" src={watson} /></p>*/}
          <img className="header-img" src={casino} />
          <div className="header-menu right">
            <img className="header-img right" src={ibm} />
            <img className="header-img right" src={notifications} />
            <img className="header-img right lines" src={lines} />
          </div>
        </header>
        <div className="map-container">
          <div className="map-header">
            <span>Cartographie des magasins</span>
          </div>
          <Map className="actual-map" />
        </div>

        <div className="div-display">
          <div className="plan">
            <div className="store-map-header">
              <span>Plan du magasin</span>
            </div>
            <img
              className="temp-img-plan-1"
              src={temps}
              onClick={this.setCurrentTempSensorTo.bind(this, 1)}
            />
            <img
              className="temp-img-plan-2"
              src={doors}
              onClick={this.setCurrentDoorSensorTo.bind(this, 1)}
            />

            <img
              className="temp-img-plan-3"
              src={temps}
              onClick={this.setCurrentTempSensorTo.bind(this, 2)}
            />
            <img
              className="temp-img-plan-4"
              src={doors}
              onClick={this.setCurrentDoorSensorTo.bind(this, 2)}
            />

            <img className="temp-img-plan-main" src={Capture} />
          </div>
          <div className="first-column">


            {/* température */}
            <div
              className="card temp-card"
              onClick={this.onTempClick.bind(this, 1)}
            >
              <div className="card-title">
                <span>
                  Alertes Température {this.state.dataTempCurrent.device}
                </span>
              </div>
              <div className="card-content">
                <div className="card-left-content">
                  <div className="card-data">
                    <div className="number-display center">
                      {lastTemp}
                      °C
                    </div>
                    <div className="icon-display">
                      <img className="temp-img center" src={temps} />
                    </div>
                  </div>
                  <div className="card-info-title">
                    <div className="font-display">
                      {moment
                        .unix(this.state.lastTempDate)
                        .format("HH:mm DD/MM")}
                    </div>
                    {/*<div className="font-display"> à {time}</div>*/}
                  </div>
                </div>
                <div className="card-right-content">
                  <div className="card-data">
                    <div className="number-display">
                      {this.state.dataTempCurrent.data.length} fois
                    </div>
                  </div>
                  <div className="card-info-title">
                    <div className="notif">Dernière semaine</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Consommation Electrique</span>
              </div>
              <div className="card-content">
                <div className="card-left-content">
                  <div className="card-data">
                    <div className="card-data-value">
                      <div className="number-display">2031</div>
                      <div className="smaller">(kwh)</div>
                    </div>
                    <div className="icon-display">
                      <img className="temp-img" src={watts} />
                    </div>
                  </div>
                  <div className="card-info-title">
                    <div className="font-display">Ce mois</div>
                  </div>
                </div>
                <div className="card-right-content">
                  <div className="card-data">
                    <div className="number-display red"> +3 %</div>
                  </div>
                  <div className="card-info-title">
                    <div className="notif">Comparée au dernier mois</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portes ouvertes/fermées */}
          <div className="second-column">
            <div className="card" onClick={this.onDoorClick.bind(this, 1)}>
              <div className="card-title">
                <span>
                  Alertes Porte Meuble Froid {this.state.dataDoorCurrent.device}
                </span>
              </div>
              <div className="card-content">
                <div className="card-left-content">
                  <div className="card-data">
                    <div className="red center">
                      {this.state.dataDoorCurrent.data[0].y === 1
                        ? "Ouvert"
                        : "Fermé"}
                    </div>
                    <div className="icon-display">
                      <img className="temp-img" src={doors} />
                    </div>
                  </div>
                  {/*                  <div className="card-info-title">
                    <div className="font-display">il y a 3 minutes</div>
                  </div>*/}
                </div>
                <div className="card-right-content">
                  <div className="card-data">
                    <div className="number-display">
                      {this.state.dataDoorCurrent.data.length} alertes
                    </div>
                  </div>
                  <div className="card-info-title">
                    <div className="notif">Dernière 24h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variations temp */}
            <div className="card" onClick={this.onWatsonClick.bind(this, 1)}>
              <div className="card-title">
                <span>Watson IoT Insights</span>
              </div>
              <div className="card-content">
                <div className="card-left-content-iot">
                  <div className="card-info-title">
                    <div className="notif">
                      "Variation de température causée par l'ouverture des
                      portes."
                    </div>
                  </div>
                </div>

                <div className="card-right-content-iot">
                  <div className="card-data">
                    <div className="icon-display">
                      <img className="temp-img" src={watson} />
                    </div>
                  </div>
                </div>
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
      )
    }}
  }
}

export default App;
