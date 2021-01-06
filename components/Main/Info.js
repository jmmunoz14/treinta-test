//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
export default class Info extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../../assets/treinta-logo-yellow-gmail.png")} style={{ marginTop: 30 }} />
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 25 }}>
                    ¿Qué es treinta?
                </Text>

                <Text style={{ textAlign: "center", fontWeight: "normal", fontSize: 15, marginTop: 15, marginStart: 15, marginEnd: 15 }}>
                    Treinta es una aplicación para moviles que gestiona las transacciones de tu negocio, conoce la utilidad de tu negocio en cualquier momento y registra y cobra deudas 3 veces más eficazmente.
                </Text>

                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop:15 }}>
                    Registra todas las ventas y gastos
                </Text>
                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop:15 }}>
                    Visualiza la utilidad del negocio al instante
                </Text>
                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop:15 }}>
                    Cobra puntualmente la deuda de tus clientes
                </Text>
                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop:15 }}>
                    Recuerda cuando pagar a proveedores y acreedores
                </Text>
                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop:15 }}>
                    Los datos se mantienen seguros
                </Text>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

