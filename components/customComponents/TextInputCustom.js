import React from "react";
import { View, Text, Platform, TextInput, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PlaneoTextField extends React.Component {

    state = {
        showPassword: true,
        valor: null,
    }
    constructor(props) {
        super(props);
    }

    onChangeText(valor) {
        if (this.props.onChangeText) {
            if (/^[\x20-\x7E]*$/.test(valor) || valor == "") {
                this.setState({ valor: valor })
                this.props.onChangeText(valor)
            }
        }
    }

    showPlaceholder() {
        return !(this.state.valor == '' || this.state.valor == null);
    }

    onChangeTextEmail(valor) {

        if (this.props.onChangeText) {
            if (/^[\x20-\x7E]*$/.test(valor) || valor == "") {
                this.setState({ valor: valor.replace(/\s/g, '') })
                this.props.onChangeText(valor)
            }

        }
    }


    render() {
        var entrada;
        if (this.props.textContentType === 'password')
            entrada = (<TextInput placeholder={this.props.placeholder}
                placeholderTextColor="#777777" maxLength={this.props.maxLength} secureTextEntry={Platform.OS === "ios" ? false : this.state.showPassword}
                style={styles.textInput} value={this.state.valor}
                onChangeText={(valor) => this.onChangeText(valor)
                } />);
        else if (this.props.textContentType === 'emailAddress') {
            entrada = (<TextInput placeholder={this.props.placeholder} placeholderTextColor="#777777" maxLength={this.props.maxLength} textContentType="emailAddress"
                style={styles.textInput} value={this.state.valor} keyboardType="email-address" autoCompleteType="email" importantForAutofill="yes"
                onChangeText={(valor) => this.onChangeTextEmail(valor)} />);
        }

        var inputElement = (
            <View style={StyleSheet.flatten([{
                flexDirection: "row", borderWidth: 1, borderRadius: 5, height: 60, backgroundColor: "#FFFFFF",
                marginTop: 15,
                borderColor: this.props.error ? "#EC6666" : "#E7E7E7",
                paddingStart: 11,
                alignItems: "center"
            }, this.props.style])}>
                {typeof (this.props.icon) === 'number' && (
                    <Image source={this.props.icon} style={{ width: 20, height: 21, marginEnd: 15 }} />
                )}
                {typeof (this.props.icon) === 'string' && (
                    <MaterialCommunityIcons name={this.props.icon} size={21} style={{ marginEnd: 15 }} color="#1d7874" />
                )}

                <View style={{ width: '80%' }}>
                    {this.showPlaceholder() ? <Text style={{ fontSize: 15, color: "#777777" }}>{this.props.placeholder} </Text> : null}
                    {entrada}
                </View>

                {this.props.textContentType === 'password' && Platform.OS != "ios" && (
                    <Ionicons onPress={() => this.setState({ showPassword: !this.state.showPassword })} name={Platform.OS === "ios" ? "ios-eye" : "md-eye"} size={25}
                        style={{ alignSelf: "center", position: 'absolute', right: 40, color: '#ABB0B7' }} />
                )}
            </View>
        );



        return inputElement;


    }

}

const styles = StyleSheet.create({
    textInput: {
        width: '90%',
        color: '#333333'
    },
});
