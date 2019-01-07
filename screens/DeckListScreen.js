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
import * as Data from '../data/Data';

export default class DeckListScreen extends React.Component {
  state = {
    decks: {}
  };

  componentDidMount = () => {
    Data.loadDecks().then(() => {
      Data.getDecks()
        .then(results => {
          this.setState({ decks: JSON.parse(results) });
        })
        .catch(error => {
          console.log('errrrrrrrrrrorrrrrrr');
          //this callback is executed when your Promise is rejected
          console.log('Promise is rejected with error: ' + error);
        });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        {Object.keys(this.state.decks).map(deck => (
          <TouchableOpacity
            key={deck}
            style={styles.button}
            onPress={() => navigate('Deck', { deck: this.state.decks[deck] })}
          >
            <View>
              <Text>{this.state.decks[deck].title}</Text>
              <Text>{this.state.decks[deck].questions.length} cards</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});
