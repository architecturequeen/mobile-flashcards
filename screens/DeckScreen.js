import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class DeckScreen extends React.Component {
  render() {
    const deck = this.props.deck || this.props.navigation.state.params.deck;

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>
        <Button title="Add Card TODO" onPress={() => {}} />
        <Button
          title="Start Quiz"
          onPress={() => navigate('Quiz', { deck: deck })}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff'
  }
});
