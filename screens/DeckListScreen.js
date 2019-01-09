import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Data from '../data/Data';

export default class DeckListScreen extends React.Component {
  state = {
    decks: {},
    isMounted: false
  };

  isEmpty = obj => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  };

  reloadDecks = () => {
    Data.getDecks()
      .then(results => {
        if (this.state.isMounted) {
          this.setState({ decks: JSON.parse(results) });
        }
      })
      .catch(error => {
        console.log('Promise is rejected with error: ' + error);
      });
  };

  componentDidMount = () => {
    this.setState({ isMounted: true });
    Data.getDecks()
      .then(results => {
        if (results !== null) {
          if (this.state.isMounted) {
            this.setState({ decks: JSON.parse(results) });
          }
        }
      })
      .catch(error => {
        console.log('Promise is rejected with error: ' + error);
      });
  };

  componentWillUnmount() {
    this.state.isMounted = false;
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.navigation.state.params) {
      if (this.props.navigation.state.params.refresh) {
        this.reloadDecks();
      }
    }
    return (
      <View style={styles.container}>
        {Object.keys(this.state.decks).length == 0 ? (
          <Text style={styles.text}>
            You have No Decks Created Yet. Click on NewDeck tab at the bottom to
            create one
          </Text>
        ) : (
          <Text style={styles.text}>My Decks</Text>
        )}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 7
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  }
});
