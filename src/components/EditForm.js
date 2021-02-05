import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { saveWord, updateWord } from '../actions/words';
import { saveList, updateList } from '../actions/lists';
import { toggleSlide } from '../actions/utils';
import ErrorMessage from './ErrorMessage';



const EditForm = (props) => {
    // VocabularyScreen, WordListScreen
    const { headerText, buttonText, firstPlaceholder, secondPlaceholder } = props;

    // actions
    const { saveList, updateList, saveWord, updateWord, toggleSlide } = props;

    // mapStateToProps
    const { error, edit } = props;

    // Destructure edit 
    const { editMode, editData, editId } = edit;


    const submitEdit = (editType, editData, editId) => {

        switch (editType) {

            case 'createList':
                // editData: ['listname']
                return saveList(editData);

            case 'editList':
                // editData: ['listname']
                // editId: '45345q121'
                return updateList(editData, editId)

            case 'createWord':
                // editData: ['foreign', 'native']
                // editId: listId
                return saveWord(editData, editId);

            case 'editWord':
                // editData: ['foreign', 'native']
                // editId: wordId
                return updateWord(editData, editId)
        }

    }


    // Form state
    const [firstField, setFirstField] = useState(editData[0])
    const [secondField, setSecondField] = useState(editData[1])
    const [inputRef, setInputRef] = useState();

    // Load edit from state to form
    useEffect(() => {
        setFirstField(editData[0]);
        setSecondField(editData[1]);
    }, [editData])


    // Clear Form 
    const clearState = () => {
        setFirstField('');
        setSecondField('');
        inputRef.focus();
    }


    return (
        <>
            {/* Closing x button */}
            <FontAwesome
                style={styles.close}
                name="times"
                size={24}
                color="#514F55"
                onPress={() => {
                    toggleSlide();
                    clearState();
                }}
            />

            <View style={styles.container} >

                {/* Form header */}
                <Text style={styles.title} > {headerText} </Text>

                {/* Error message */}
                {error ? <ErrorMessage message={error} /> : null}


                {   // Check if first input exists in editData
                    editData[0] !== undefined && (
                        <>
                            {/* firstField input */}
                            <TextInput
                                ref={ref =>  setInputRef(ref)}
                                autoCompleteType="off"
                                textContentType="oneTimeCode"
                                autoCapitalize='none'
                                style={styles.input}
                                placeholder={firstPlaceholder}
                                value={firstField}
                                onChangeText={input => setFirstField(input)}
                                selectionColor={'#f5dfa3'}
                            />
                        </>
                    )
                }

                {   // Check if second input exists in editData
                    editData[1] !== undefined && (
                        <>
                            {/* secondField input */}
                            <TextInput
                                autoCompleteType="off"
                                textContentType="oneTimeCode"
                                autoCapitalize="none"
                                style={styles.input}
                                placeholder={secondPlaceholder}
                                value={secondField}
                                onChangeText={input => setSecondField(input)}
                                selectionColor={'#f5dfa3'}
                            />
                        </>
                    )
                }


                {/* Save button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        submitEdit(editMode, [firstField.trim(), secondField.trim()], editId)
                        clearState();
                    }}>
                    <Text style={styles.buttonText} selectionColor={'#f3c74f'}>{buttonText}</Text>
                </TouchableOpacity>
            </View >
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        marginTop: '45%',
        marginHorizontal: 35,
        alignItems: 'center'
    },

    close: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 40,
        paddingVertical: 30
    },

    title: {
        fontFamily: 'lato-bold',
        fontSize: 16,
        marginBottom: 25,
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


const mapStateToProps = state => ({
    error: state.alerts.error,
    edit: state.utils.edit
})

export default connect(mapStateToProps, { toggleSlide, saveList, saveWord, updateWord, updateList })(EditForm)