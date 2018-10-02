import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
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
						title = { 'Changing Colors Garage' }
						position = {{ lat: 48.870936, lng: 2.309818 }}
						name = { 'Changing Colors Garage' }
					/>
					<InfoWindow
						marker = { this.state.activeMarker }
						visible = { this.state.showingInfoWindow }
						style = {{width: '90%', height: '34vh' }}

						
					>
					
						Le 4<br />
							
					
					</InfoWindow>
				</Map>
		  </React.Fragment>
		);
	  }
	}
	export default GoogleApiWrapper({
		api: ('AIzaSyCjz8reC9ybEkD44fMKLaWSW8YLuagvmwk')
	})(GoogleMapsContainer)