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
    const { deck } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Text>Deck</Text>
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
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

DeckScreen.defaultProps = {
  deck: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }
};
