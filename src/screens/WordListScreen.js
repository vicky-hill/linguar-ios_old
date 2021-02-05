import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import { deleteWord } from '../actions/words';
import { openEdit, toggleSlide, closeSlide } from '../actions/utils';
import SlideScreen from '../components/SlideScreen';
import WordListItem from '../components/WordListItem';
import HiddenItemWithActions from '../components/HiddenItemWithActions';
import EditForm from '../components/EditForm';


const WordListScreen = (props) => {
    const { route, navigation } = props;

    // actions
    const {  deleteWord, toggleSlide, closeSlide, openEdit } = props;
    
    // mapStateToProps
    const { words, editMode, user: { foreignLanguage, nativeLanguage } } = props;

    // VocabularyItem navigation.navigate()
    const { list } = route.params;

    
    // Filter words by list
    const listWords = words.filter(word => {
        return word.list._id === list._id
    })

    // If EditForm is open when going back, slide down EditForm
    navigation.addListener('blur', () => {
        closeSlide();
    })

    // Edit button
    const editRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }

        const editData = [
            words.find(word => word._id === rowKey).foreign,
            words.find(word => word._id === rowKey).native
        ]

        const editId = rowKey;

        openEdit('editWord', editData, editId);
        toggleSlide();
    }

    // Delete button
    const deleteRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }

        deleteWord(rowKey)
    }


    return (
        <>
            {/* Header with word count */}
            <View style={styles.backgroundHeader}>
                <Text style={styles.title}>{list.title}</Text>
                <Text style={styles.count}>{listWords.length} Words</Text>

                {/* Add new word button that toggles WordForm */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        toggleSlide();
                        openEdit('createWord', null, list._id);
                    }}
                >
                    <Feather name="plus" size={17} color="#f3c74f" />
                    <Text style={styles.addButtonText}>Add new word</Text>
                </TouchableOpacity>
            </View>

            {/* List of Words */}
            <View style={styles.backgroundContent}>
                <SwipeListView
                    showsVerticalScrollIndicator={false}
                    data={listWords}
                    keyExtractor={(word) => word._id}
                    renderItem={({ item }) => {
                        return <WordListItem word={item} />
                    }}
                    rightOpenValue={-170}
                    renderHiddenItem={({ item }, rowMap) => {
                        return (
                            <HiddenItemWithActions
                                data={item}
                                rowMap={rowMap}
                                onEdit={() => editRow(rowMap, item._id)}
                                onDelete={() => deleteRow(rowMap, item._id)}
                                item={item.foreign}
                            />
                        )
                    }}
                />
            </View>

            <SlideScreen>
                <EditForm 
                    headerText={ editMode === 'createWord' ? 'Add a new word' : 'Update word'}
                    buttonText={ editMode === 'createWord' ? 'Add word' : 'Save word'}
                    firstPlaceholder={foreignLanguage}
                    secondPlaceholder={nativeLanguage}
                />
            </SlideScreen>
        </>
    )
}



const styles = StyleSheet.create({

    backgroundHeader: {
        padding: 30,
        paddingTop: 50,
        height: 170
    },

    backgroundContent: {
        backgroundColor: '#fcfcfc',
        flex: 1,
        paddingTop: 20
    },

    title: {
        color: '#413d3d',
        fontSize: 24,
        fontFamily: 'lato-black',
        marginBottom: 7
    },

    count: {
        fontFamily: 'lato-regular',
        color: '#c4c1c1'
    },

    addButton: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 20
    },

    addButtonText: {
        color: '#f3c74f',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 5
    },

    wordForm: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 700,
        backgroundColor: '#fff'
    }
})


const mapStateToProps = state => ({
    words: state.words.words,
    editMode: state.utils.edit.editMode,
    isHidden: state.utils.slideScreen.isHidden,
    user: state.auth.user
})

export default connect(mapStateToProps, { deleteWord, toggleSlide, closeSlide, openEdit })(WordListScreen);