import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import TextInput from '../customComponents/TextInputCustom'
import firebase from '../../firebase/firebase'
// create a component

const win = Dimensions.get('window');



export default class MainView extends Component {

    state = {
        email: null,
        password: null,
    }
    handleLogin = () => {
        if ((this.state.email != "" && this.state.email != null) && (this.state.password != "" && this.state.password != null)) {
            console.log("handle login")
            firebase.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    console.log(user)
                    this.props.navigation.navigate("Maps")
                })
                .catch(error => {
                    alert(error)
                    console.log(error)
                 }
                )
        }
        else {
            alert("Faltan campos por llenar")
        }
    }


    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentCon}>

                <TextInput valor={this.state.email} textContentType="emailAddress" placeholder="Correo Electronico" icon="email-outline"
                    onChangeText={valor => this.setState({ email: valor })} style={{ marginLeft: 36, marginEnd: 36 }} />

                <TextInput valor={this.state.password} icon="lock-open"
                    maxLength={35} textContentType='password' placeholder="Contraseña *"
                    onChangeText={valor => this.setState({ password: valor })} style={{ marginLeft: 36, marginEnd: 36 }} />

                <TouchableOpacity onPress={() => this.handleLogin()} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={{ color: "#000000", marginTop: 15 }}>
                    ¿Aun no eres un usuario?
                </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Signin')} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Signin</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fed209',
    },
    contentCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        marginTop: 15,
        backgroundColor: "#1d7874",
        width: "70%",
        height: win.height * 0.05,
        borderRadius: 10,
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF"
    }
});

//make this component available to the app
