/*global google*/
import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import marker4casino from "./images/marker4casino.png";
class GoogleMapsContainer extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
	  }
	  // binding this to event-handler functions
	  this.onMarkerClick = this.onMarkerClick.bind(this);
	  this.onMapClick = this.onMapClick.bind(this);
	}
	onMarkerClick = (props, marker, e) => {
		this.setState({
		  selectedPlace: props,
		  activeMarker: marker,
		  showingInfoWindow: true
		});
	  }
	  onMapClick = (props) => {
		if (this.state.showingInfoWindow) {
		  this.setState({
			showingInfoWindow: false,
			activeMarker: null
		  });
		}
	  }
	  render() {
	
		return (
			<React.Fragment>
				<Map
				item
				xs = { 12 }
				style = {{width: '100%', height: '34vh' }}
				google = { this.props.google }
				onClick = { this.onMapClick }
				zoom = { 14 }
				initialCenter = {{ lat: 48.870936, lng: 2.309818 }}
				>
					<Marker 
						onClick = { this.onMarkerClick }
						title = { 'Le 4' }
						position = {{ lat: 48.870936, lng: 2.309818 }}
						name = { 'Le 4' }
						icon = {marker4casino}
						
					/>
					
					
					<Marker 
						onClick = { this.onMarkerClick }
						title = { 'Le 5' }
						position = {{ lat: 48.867853, lng:  2.296481 }}
						name = { 'Le 5' }
						
					/>
					
					<Marker 
						onClick = { this.onMarkerClick }
						title = { 'Le 6' }
						position = {{ lat: 48.875421, lng: 2.341964 }}
						name = { 'Le 6' }
	
					/>
						<Marker 
						onClick = { this.onMarkerClick }
						title = { 'Le 7' }
						position = {{ lat: 48.864240, lng: 2.375383 }}
						name = { 'Le 7 ' }
					/>
	
					<InfoWindow
						marker = { this.state.activeMarker }
						visible = { this.state.showingInfoWindow }
						style = {{width: '90%', height: '34vh' }}	
					>
						Casino magasin augmenté<br />
					</InfoWindow>
				</Map>
		  </React.Fragment>
		);
	  }
	}
	export default GoogleApiWrapper({
		apiKey: ('AIzaSyBxdqbNXFP2qUMJMshc1RD4nsoExIGeM8k')
	})(GoogleMapsContainer)