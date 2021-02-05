import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectLanguages } from '../actions/auth';

const LanguageScreen = ({ selectLanguages }) => {
    const [foreign, setForeign] = useState('');
    const [native, setNative] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.selection}>

                <Text style={styles.title}>Enter your languages</Text>

                {/* Foreign language */}
                <TextInput
                    autoCompleteType="off"
                    textContentType="oneTimeCode"
                    style={styles.input}
                    placeholder="What language are you learning?"
                    value={foreign}
                    onChangeText={input => setForeign(input)}
                    selectionColor={'#f5dfa3'}
                />

                {/* Native language */}
                <TextInput
                    autoCompleteType="off"
                    textContentType="oneTimeCode"
                    style={styles.input}
                    placeholder="What is your native language?"
                    value={native}
                    onChangeText={input => setNative(input)}
                    selectionColor={'#f5dfa3'}
                />

                {/* Save button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        
                        const formData = {
                            foreignLanguage: foreign,
                            nativeLanguage: native
                        }

                        selectLanguages(formData)
                    }}>
                    <Text style={styles.buttonText} selectionColor={'#f3c74f'}>Next</Text>
                </TouchableOpacity>

            </View>


        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        marginTop: '45%',
        marginHorizontal: 35,
        alignItems: 'center'
    },

    selection: {
        marginBottom: 40,
        alignItems: 'center',
        width: '90%'
    },

    title: {
        fontFamily: 'lato-bold',
        fontSize: 16,
        marginBottom: 20,
        color: '#514F55'
    },

    input: {
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 12,
        borderRadius: 7,
        marginVertical: 8,
        width: '100%'
    },

    button: {
        width: '100%',
        backgroundColor: '#f3c74f',
        color: '#fff',
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginVertical: 20
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'lato-black'
    }
})

export default connect(null, { selectLanguages })(LanguageScreen);