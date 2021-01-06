//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, PermissionsAndroid , TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import firebase from '../../firebase/firebase';


const win = Dimensions.get('window');


// create a component
export default class MapsComponent extends Component {

    state = {
        open: false,
        region: {
            "latitude": 60.1098678,
            "longitude": 24.7385084,
            "latitudeDelta": 0.9,
            "longitudeDelta": 0.0
        },
        lat: null,
        long: null,
        places: null,


    }

    updateState(location) {
        const lat = 4.624335;
        const long = -74.063644;
        this.setState({ lat, long }, () => this.getPlaces())
    }

    async componentDidMount() {
        console.log("component")



        this.updateState()





    }

    getPlaces() {
        const url = this.getUrlWithParam(this.state.lat, this.state.long, 90000, 'store', 'AIzaSyCEBH6-bCH58atCkrjz28oqDB2QXpulddI');
        console.log("asdasda")
        fetch(url)
            .then((data) => data.json())
            .then((res) => {
                const arrayMarkers = [];

                res.results.map((element, i) => {
                    arrayMarkers.push(
                        <Marker
                            key={i}
                            coordinate={{
                                latitude: element.geometry.location.lat,
                                longitude: element.geometry.location.lng,

                            }}
                        />
                    )
                })
                this.setState({ places: arrayMarkers })
            })
    }


    getUrlWithParam(lat, long, radius, type, API) {
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        const location = `location=${lat},${long}&radius=${radius}`;
        const typedata = `&types=${type}`;
        const key = `&key=${API}`;
        return `${url}${location}${typedata}${key}`;
    }


    onPressModal = () => {
        let abrir = !this.state.open
        this.setState({ open: abrir })
    }

    handleInfo() {
        this.setState({open:false})
        this.props.navigation.navigate("Info")
    }

    handleSignOut() {
        firebase.auth.signOut()
        this.props.navigation.navigate("Home")

    }



    render() {
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons name="menu" size={35} color="black" onPress={() => this.onPressModal()} style={{ marginTop: win.height * 0.05, marginStart: win.width * 0.03 }} />

                <View>
                    {this.state.lat ? <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: this.state.lat,
                            longitude: this.state.long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        {this.state.places}
                    </MapView> : null}

                </View>

                <Modal isVisible={this.state.open} onBackdropPress={() => this.onPressModal()}
                    style={{ marginLeft: 0, marginRight: win.width * 0.3, marginTop: 0, marginBottom: 0, }}
                    animationIn="slideInLeft" animationOut="slideOutLeft">
                    <ScrollView scrollIndicatorInsets={{ right: 1 }} style={{ flex: 1, backgroundColor: "#fed209" }}>
                        <MaterialCommunityIcons name="close" size={35} color="black" onPress={() => this.onPressModal()} style={{ alignSelf: "flex-end", marginEnd: 15, marginTop: 15 }} />

                        <TouchableOpacity onPress={() => this.handleInfo()}>
                            <Text style={{marginStart:15, fontWeight:"bold", fontSize:20, marginTop:30}}>
                                Información de treinta
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.handleSignOut()}>
                            <Text style={{marginStart:15, fontWeight:"bold", fontSize:20, marginTop:30}}>
                                Cerrar sesión.
                            </Text>
                        </TouchableOpacity>


                    </ScrollView>
                </Modal>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

