import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import TextInput from '../customComponents/TextInputCustom'
import firebase from '../../firebase/firebase'
// create a component

const win = Dimensions.get('window');


export default class Signin extends Component {

    state = {
        email: null,
        password: null,
        confPassword: null,
    }

    handleSingUp = () => {
        if (this.state.email != null && this.state.email != "" && this.state.password != null
            && this.state.password != "" && this.state.confPassword != null && this.state.conf != "") {
            if (this.state.password != this.state.confPassword) {
                alert("Las contraseñas no coinciden")
            }
            else {
                firebase.auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then((user) => {
                        // Signed in
                        // ...
                        console.log(user)

                        this.props.navigation.navigate("Maps")
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        console.log(errorMessage)
                        // ..
                    });
            }
        }


        else {
            alert("Faltan campos por llenar")
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentCon}>

                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Registrate en la app </Text>

                <TextInput valor={this.state.email} textContentType="emailAddress" placeholder="Correo Electronico" icon="email-outline"
                    onChangeText={valor => this.setState({ email: valor })} style={{ marginLeft: 36, marginEnd: 36 }} />

                <TextInput valor={this.state.password} icon="lock-open"
                    maxLength={35} textContentType='password' placeholder="Contraseña *"
                    onChangeText={valor => this.setState({ password: valor })} style={{ marginLeft: 36, marginEnd: 36 }} />

                <TextInput valor={this.state.confPassword} icon="lock-open"
                    maxLength={35} textContentType='password' placeholder="Confirmar contraseña *"
                    onChangeText={valor => this.setState({ confPassword: valor })} style={{ marginLeft: 36, marginEnd: 36 }} />


                <TouchableOpacity onPress={() => this.handleSingUp()} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Registrarse</Text>
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
