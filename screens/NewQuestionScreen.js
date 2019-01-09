import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import * as Data from '../data/Data';

export default class NewQuestionScreen extends React.Component {
  state = {
    question: '',
    answer: ''
  };

  submitQuestion = () => {
    const title =
      this.props.deckTitle || this.props.navigation.state.params.deckTitle;
    Data.createQuestion(this.state.question, this.state.answer, title).then(
      () => {
        AsyncStorage.getItem('decks', (err, result) => {
          const decks = JSON.parse(result);
          let deck = decks[title];
          // this.props.navigation.navigate('DeckList', { refresh: 'refresh' });
          this.props.navigation.navigate('Deck', { deck: deck });
        });
      }
    );
  };

  render() {
    const deckTitle =
      this.props.deckTitle || this.props.navigation.state.params.deckTitle;

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create a New Card</Text>
        <TextInput
          placeholder="Enter question"
          onChangeText={question => this.setState({ question })}
          style={styles.text}
        />
        <TextInput
          placeholder="Enter answer"
          onChangeText={answer => this.setState({ answer })}
          style={styles.text}
        />
        <Button title="Submit" onPress={this.submitQuestion} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: '#fff'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  }
});
