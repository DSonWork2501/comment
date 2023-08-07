import { Dialog, DialogContent } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import { useStyles } from '../EmployDelivery';

function Map({ listLocation }) {
    const [selectedPark, setSelectedPark] = useState(null);
    const mapRef = React.createRef();
    const [mapZoom, setMapZoom] = useState(11);

    const handleZoomChanged = () => {
        const newZoom = mapRef.current.getZoom();
        setMapZoom(newZoom);
    };

    console.log(listLocation);
    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        const geocoder = new window.google.maps.Geocoder();
        const address = '1600 Amphitheatre Parkway, Mountain View, CA'; // Replace with the desired address

        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                console.log({ lat: lat(), lng: lng() });
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    const turnIcon = (element) => {
        if (element?.equalLocaltion)
            return 'https://cdn-icons-png.flaticon.com/128/3967/3967503.png'
        return element.type === 'receive'
            ? "https://cdn-icons-png.flaticon.com/128/7274/7274660.png"
            : "https://cdn-icons-png.flaticon.com/128/3967/3967503.png"
    }

    return (
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 10.8231, lng: 106.6297 }}
            onZoomChanged={handleZoomChanged} 
            ref={mapRef}
        >
            {listLocation.map(element => (
                <Marker
                    key={element.orderID}
                    position={{
                        lat: element.latitude,
                        lng: element.longitude
                    }}
                    onClick={() => {
                        //setSelectedPark(park);
                    }}
                    //icon={<FontAwesomeIcon icon={faBox} />}
                    icon={{
                        url: turnIcon(element),
                        scaledSize: new window.google.maps.Size(20 * (mapZoom / 13), 20 * (mapZoom / 13)),
                    }}
                >
                </Marker>
            ))}

            {selectedPark && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                    position={{
                        lat: selectedPark.geometry.coordinates[1],
                        lng: selectedPark.geometry.coordinates[0]
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>

    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const MapLocation = ({ open, entities }) => {
    const classes = useStyles();
    const listLocation = useMemo(() => {
        let locations = [];
        if (entities?.data?.length)
            entities.data.forEach(element => {
                if (element?.shipping?.location) {
                    const loc = JSON.parse(element?.shipping?.location);
                    if (loc?.start && loc?.end && loc?.start?.latitude === loc?.end?.latitude && loc?.start?.longitude === loc?.end?.longitude) {
                        locations.push({ ...loc.start, type: 'receive', orderID: element?.shipping?.orderid, equalLocaltion: true })
                        locations.push({ ...loc.end, type: 'done', orderID: element?.shipping?.orderid, equalLocaltion: true })
                    } else {
                        if (loc?.start)
                            locations.push({ ...loc.start, type: 'receive', orderID: element?.shipping?.orderid })
                        if (loc?.end)
                            locations.push({ ...loc.end, type: 'done', orderID: element?.shipping?.orderid })
                    }
                }
            });
        return locations
    }, [entities])

    return (
        <Dialog className={classes.modal2} open={open} fullWidth maxWidth="md" tabIndex={1000}>
            <DialogContent className='text-11' style={{
                paddingTop: 8,
                position: 'fixed',
                zIndex: 111,
                background: 'white',
                height: '100%',
                top: 0,
                left: 0,
                width: '100%'
            }}>
                <div style={{
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    left: 0,
                    width: '100%'
                }}>

                    <MapWrapped
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA&v=3.exp&libraries=geometry,drawing,places}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        listLocation={listLocation}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MapLocation;