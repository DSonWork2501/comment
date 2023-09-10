import { Dialog, DialogContent } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps";
import { useStyles } from '../EmployDelivery';
import History from '@history/@history';

const getLocationFromAddress = (address) => {
    return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                resolve({ latitude: lat(), longitude: lng() })
            } else {
                reject('Geocode was not successful for the following reason:', status)
            }
        });
    });
}

const calculateDistance = (currentLocation, destination) => {
    if (!currentLocation) return null;

    const startLatLng = new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
    );

    const endLatLng = new window.google.maps.LatLng(
        destination.lat,
        destination.lng
    );

    const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
        startLatLng,
        endLatLng
    );

    const distanceInKilometers = distanceInMeters / 1000;

    return distanceInKilometers;
};

const returnAdd = (currentOrder) => {
    return (currentOrder?.customeraddress ? currentOrder?.customeraddress + ',' : '')
        + (currentOrder?.customerward ? currentOrder?.customerward + ',' : '')
        + (currentOrder?.customerdistrict ? currentOrder?.customerdistrict + ',' : '')
        + (currentOrder?.customercity ? currentOrder?.customercity + '' : '')
}

function Map({ listLocation, entities, setUserLocations }) {
    const [selectedPark, setSelectedPark] = useState(null);
    const mapRef = React.createRef();
    const [mapZoom, setMapZoom] = useState(11);
    const [origin, setOrigin] = useState(null); // Current location
    const [directions, setDirections] = useState(null);
    const [destination, setDestination] = useState(null);
    const reEntitiesList = useMemo(() => {
        if (entities?.data?.length && origin) {
            return entities.data.map(val => {
                return { ...val, kilometer: val?.localMap ? calculateDistance(origin, { lat: val.localMap.latitude, lng: val.localMap.longitude }) : null }
            })
        }
        return []
    }, [entities, origin])
    // console.log(reEntitiesList);
    const calculateAndDisplayDirections = (origin, destination) => {
        if (origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING, // Change to your preferred travel mode
                },
                (response, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(response.routes[0].overview_path);
                    } else {
                        console.error('Directions request failed:', status);
                    }
                }
            );
        }
    };

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setOrigin({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    const originString = JSON.stringify(origin), destinationString = JSON.stringify(destination);
    useEffect(() => {
        const origin_ = JSON.parse(originString), destination_ = JSON.parse(destinationString);

        calculateAndDisplayDirections(origin_?.lat ? { lat: origin_.lat, lng: origin_.lng } : null, destination_?.lat ? { lat: destination_.lat, lng: destination_.lng } : null);
    }, [originString, destinationString]);

    // const onDirectionsLoad = (directions) => {
    //     setDirections(directions);
    // };

    useEffect(() => {
        setUserLocations(prev => {
            if (!prev?.length) {
                let data = [];
                if (entities?.data?.length)
                    entities.data.forEach(val => {
                        data.push({ ...val, func: getLocationFromAddress(returnAdd(val)) })
                    })
                return data
            }
            return prev
        })
    }, [entities, setUserLocations])
    console.log(selectedPark);
    const handleZoomChanged = () => {
        const newZoom = mapRef.current.getZoom();
        setMapZoom(newZoom);
    };

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

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
    // console.log(directions?.length && directions[0]);
    return (
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 10.8231, lng: 106.6297 }}
            onZoomChanged={handleZoomChanged}
            ref={mapRef}
        >
            {origin && (
                <Marker
                    icon={{
                        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/480px-Location_dot_blue.svg.png',
                        scaledSize: new window.google.maps.Size(10, 10),
                    }}
                    position={origin}
                />
            )}

            {directions && (
                <>
                    <Polyline
                        path={[origin, new window.google.maps.LatLng(
                            directions[0].lat(),
                            directions[0].lng()
                        )]}
                        options={{
                            strokeColor: '#5c6268', // Color of the dashed line
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            strokeDasharray: [10, 9], // Dashed pattern: 10px dash, 5px gap
                        }}
                    />
                    <Polyline
                        path={directions}
                        options={{
                            strokeColor: '#007bff', // Change color as needed
                            strokeOpacity: 0.5,
                            strokeWeight: 6,
                        }}
                    />
                </>

            )}

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

            {Boolean(reEntitiesList?.length) && reEntitiesList.map(element => (
                element?.localMap
                    ? <Marker
                        key={element.id}
                        position={{
                            lat: element.localMap.latitude,
                            lng: element.localMap.longitude
                        }}
                        onClick={() => {
                            //setSelectedPark(park);
                        }}
                        //icon={<FontAwesomeIcon icon={faBox} />}
                        icon={{
                            url: 'https://images.freeimages.com/fic/images/icons/61/dragon_soft/512/user.png',
                            scaledSize: new window.google.maps.Size(20 * (mapZoom / 13), 20 * (mapZoom / 13)),
                        }}
                    >
                        <InfoWindow
                            // onCloseClick={() => {
                            //     setSelectedPark(null);
                            // }}
                            position={{
                                lat: element.localMap.latitude,
                                lng: element.localMap.longitude
                            }}
                        >
                            <div className='text-10'>
                                <div>
                                    {element.customername} - <span onClick={() => {
                                        setDestination({
                                            lat: element.localMap.latitude,
                                            lng: element.localMap.longitude
                                        })
                                    }} className='text-blue cursor-pointer'>{element.kilometer.toFixed(2)} km</span>
                                </div>
                                <div>
                                    <span className='text-blue'>{element.id}</span> -  {element.customermoblie}
                                </div>
                            </div>
                        </InfoWindow>
                    </Marker>
                    : null
            ))}


        </GoogleMap>

    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

const MapLocation = ({ open, entities }) => {
    const classes = useStyles();
    const [userLocations, setUserLocations] = useState(null);
    const [listMap, setListMap] = useState(null);
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

    useEffect(() => {
        if (userLocations?.length) {
            let object = {}
            Promise.allSettled(userLocations.map(val => val.func)).then((value) => {
                value.forEach((element, i) => {
                    const { value, status } = element;
                    object[userLocations[i].id] = status === "fulfilled" ? value : null;
                });
            }).finally(() => {
                setListMap(object)
            })
        }
    }, [userLocations])


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
                    zIndex: 1,
                    bottom: 6,
                    left: 10,
                    width: 70,
                    textAlign: 'center'
                }}>
                    <div className='bg-white p-8 cursor-pointer rounded-4 shadow-4' onClick={() => History.push(window.location.pathname.replace('/4/', '/2/'))}>
                        Trở về
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    left: 0,
                    width: '100%'
                }}>

                    <MapWrapped
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCIhqUEC9g0C1jwJnqR3_fiTUicJXfEguc&v=3.exp&libraries=geometry,drawing,places}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        listLocation={listLocation}
                        entities={entities ? { ...entities, data: listMap ? entities.data.map(val => ({ ...val, localMap: listMap[val.id] })) : entities.data } : entities}
                        setUserLocations={setUserLocations}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MapLocation;