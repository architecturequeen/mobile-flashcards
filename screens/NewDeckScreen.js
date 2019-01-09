import React from 'react';
import {
  AsyncStorage,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import * as Data from '../data/Data';

export default class NewDeckScreen extends React.Component {
  state = {
    text: ''
  };

  createDeck = () => {
    let deck = { title: this.state.text, questions: [] };
    Data.createDeck(this.state.text).then(() => {
      AsyncStorage.getItem('decks', (err, result) => {});
      this.props.navigation.navigate('DeckList', { refresh: 'refresh' });
      this.props.navigation.navigate('Deck', { deck: deck });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.text}>Create New Deck</Text>
          <TextInput
            placeholder="Enter title"
            onChangeText={text => this.setState({ text })}
            style={{
              ...styles.text,
              borderColor: 'gray'
            }}
          />
          <Button title="Create" onPress={this.createDeck} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    paddingBottom: 13,
    textAlign: 'center'
  }
});
