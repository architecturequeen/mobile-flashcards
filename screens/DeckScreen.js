import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class DeckScreen extends React.Component {
  render() {
    const deck = this.props.deck || this.props.navigation.state.params.deck;

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{deck.title} Deck!</Text>
        <Text style={styles.text}>{deck.questions.length} cards</Text>
        <Button
          title="Add Card"
          onPress={() => navigate('NewQuestion', { deckTitle: deck.title })}
        />
        <Button
          title="Start Quiz"
          onPress={() => navigate('Quiz', { deck: deck })}
          disabled={deck.questions.length === 0}
        />
        <Button
          title="Back to Home"
          onPress={() => navigate('Home', { refresh: 'refresh' })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: '#fff',
    color: 'red'
  },
  text: {
    fontSize: 20,
    paddingBottom: 13,
    textAlign: 'center'
  }
});
