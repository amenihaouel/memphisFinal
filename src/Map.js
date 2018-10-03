import React, {
	Component
} from 'react';
import './App.css';
import { Marker, GoogleMapReact } from 'google-map-react';
const AnyReactComponent = ({ text }) => (<div><p>{text}</p></div>);
class Map extends Component {
	static defaultProps = {
		center: {
			lat: 48.87,
			lng: 2.30
		},
		zoom: 11,
		key: 11
	};
	render() {
		const GoogleMapsMarkers = (
			<div className="hey">
				<AnyReactComponent
					lat={48.870936}
					lng={2.309818}
					text={'LE 4 '}
				/>
				<AnyReactComponent
					lat={48.88}
					lng={2.309818}
					text={'LE 4 2'}
				/>
			</div>
		);
		return (
			<React.Fragment>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyBxdqbNXFP2qUMJMshc1RD4nsoExIGeM8k', v: '3;31' }}		
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					onChildMouseEnter={this.onChildMouseEnter}
					onChildMouseLeave={this.onChildMouseLeave}
					heatmapLibrary={true}
				>

					{GoogleMapsMarkers}
				</GoogleMapReact>
			</React.Fragment>
		)
	}
}
export default Map