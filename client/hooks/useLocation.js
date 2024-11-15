// useLocation.js
import { useState } from 'react';
import * as Location from 'expo-location';
import { setUserLocation } from '../slices/LocationSlice';
import { useDispatch } from 'react-redux';

const useLocation = () => {
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState('');
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [streetName, setStreetName] = useState(null); // New state for street name

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was not granted');
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
            const { latitude, longitude } = coords;
            setLatitude(latitude);
            setLongitude(longitude);
            dispatch(setUserLocation({ latitude, longitude }));
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });

            // Set street name based on the response
            if (response.length > 0) {
                setStreetName(response[0].street);
            }

            console.log("User's Location", response);
        }

        return { latitude, longitude, streetName, errorMessage };
    };

    return { getUserLocation, latitude, longitude, streetName, errorMessage };
};

export default useLocation;
