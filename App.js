import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

var randomNumber = Math.floor(Math.random() * 100);
const ROUNDS = 3;
var buttonDisabler = true;
var totalScore = 0;
var totalHints = 0;
var totalGuesses = 0;
var hint = '';

export default function App() {
  const [getRound, setRound] = useState(1);
  const [getNum, setNum] = useState('');
  const [getAttempts, setAttempts] = useState(0);
  const [getScore, setScore] = useState(0);
  const [getScreen, setScreen] = useState(1);
  const [getHints, setHints] = useState(0);

  const userInput = (text) => {
    if (buttonDisabler) {
      setNum(getNum + text);
    }
  };

  const createHint = () => {
    var num1 = 0;
    var num2 = 0;
    setScore(getScore - 2);
    if (getHints == 4) {
      hint = randomNumber % 2 == 0 ? 'The number is even' : 'The number is odd';
      setHints(getHints + 1);
    } else {
      num1 = randomNumber + Math.ceil(Math.random() * (5 - getHints) * 5);
      num2 = randomNumber - Math.floor(Math.random() * (5 - getHints) * 5);
      num1 = num1 == randomNumber ? num1 + 1 : num1;
      num2 = num2 == randomNumber ? num2 - 1 : num2;
      num1 = num1 < 100 ? num1 : 100;
      num2 = num2 > 0 ? num2 : 0;
      hint = 'The number is between ' + num2 + ' and ' + num1;
      setHints(getHints + 1);
    }
  };

  const changeRound = () => {
    setAttempts(0);
    setRound(getRound + 1);
    setScore(0);
    setNum('');
    setHints(0);
    hint = '';
    buttonDisabler = true;
    randomNumber = Math.floor(Math.random() * 100);
  };

  const gameReset = () => {
    setScreen(1);
    setAttempts(0);
    setNum('');
    setHints(0);
    setRound(1);
    setScore(0);
    hint = '';
    buttonDisabler = true;
    totalScore = 0;
    totalHints = 0;
    totalGuesses = 0;
  };

  const checkInput = () => {
    if (getNum == '' || getNum == 'Correct!') return;
    if (randomNumber == getNum) {
      setScore(10 - 2 * getHints);
      setAttempts(getAttempts + 1);
      setNum('Correct!');
      buttonDisabler = false;
    } else {
      if (getAttempts + 1 == 5) {
        buttonDisabler = false;
        setAttempts(getAttempts + 1);
        setNum('');
      } else {
        setAttempts(getAttempts + 1);
      }
    }
  };

  const StartScreen = (
    <View style={styles.container}>
      <Text style={styles.textStyle1}>Guess the Number</Text>
      <View style={{ marginTop: 20, border: '1px solid black' }}>
        <Button
          color="#ffd860"
          title="Start Game"
          onPress={() => setScreen(2)}
        />
      </View>
    </View>
  );

  const GameScreen = (
    <View style={styles.container}>
      <Text style={styles.textStyle1}>Round {getRound}</Text>
      <Text style={styles.textStyle1}>{getHints.hint}</Text>
      <View style={{ height: 20, marginVertical: 5 }}>
        <Text style={styles.textStyle2}>{getNum}</Text>
      </View>
      <Text style={styles.textStyle2}>Score: {getScore}</Text>
      <Text style={styles.textStyle3}>Guesses left: {5 - getAttempts}</Text>
      <Text style={styles.textStyle3}>Hints left: {5 - getHints}</Text>
      <View style={{ height: 20, marginVertical: 5 }}>
        <Text style={[styles.textStyle3, { color: '#ff1ecd' }]}>{hint}</Text>
      </View>

      {/* Row 1 */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.buttonStyle}>
          <Button title="1" color="#ffd860" onPress={userInput.bind(this, 1)} />
        </View>
        <View style={styles.buttonStyle}>
          <Button title="2" color="#ffd860" onPress={userInput.bind(this, 2)} />
        </View>
        <View style={styles.buttonStyle}>
          <Button title="3" color="#ffd860" onPress={userInput.bind(this, 3)} />
        </View>
      </View>

      {/* Row 2 */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.buttonStyle}>
          <Button title="4" color="#ffd860" onPress={userInput.bind(this, 4)} />
        </View>
        <View style={styles.buttonStyle}>
          <Button title="5" color="#ffd860" onPress={userInput.bind(this, 5)} />
        </View>
        <View style={styles.buttonStyle}>
          <Button title="6" color="#ffd860" onPress={userInput.bind(this, 6)} />
        </View>
      </View>

      {/* Row 3 */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.buttonStyle}>
          <Button color="#ffd860" title="7" onPress={userInput.bind(this, 7)} />
        </View>

        <View style={styles.buttonStyle}>
          <Button color="#ffd860" title="8" onPress={userInput.bind(this, 8)} />
        </View>

        <View style={styles.buttonStyle}>
          <Button color="#ffd860" title="9" onPress={userInput.bind(this, 9)} />
        </View>
      </View>

      {/* Row 4 */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.buttonStyle}>
          <Button
            color="#ffd860"
            title="Guess"
            onPress={() => checkInput()}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button color="#ffd860" title="0" onPress={userInput.bind(this, 0)} />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            color="#ffd860"
            title="Reset"
            onPress={() => {
              setNum('');
            }}
          />
        </View>
      </View>

      {/* Row 5 */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 3,
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.buttonStyle}>
          <Button
            color="#ffd860"
            title="Hint"
            disabled={getHints > 4 || !buttonDisabler ? true : false}
            onPress={() => {
              createHint();
            }}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            color="#ffd860"
            title="Done"
            disabled={buttonDisabler}
            onPress={() => {
              totalScore = totalScore + getScore;
              totalGuesses = totalGuesses + getAttempts;
              totalHints = totalHints + getHints;
              setScreen(3);
            }}
          />
        </View>
      </View>
    </View>
  );

  const StatsScreen = (
    <View style={styles.container}>
      <Text style={styles.textStyle4}>GAME SUMMARY</Text>
      <Text style={styles.textStyle2}>Rounds Played : {getRound}</Text>
      <Text style={styles.textStyle2}>Total Score: {totalScore}</Text>
      <Text style={styles.textStyle2}>Total Guesses Taken: {totalGuesses}</Text>
      <Text style={styles.textStyle2}>Total Hints Taken: {totalHints}</Text>
      <Text style={styles.textStyle2}>____________________</Text>
      <Text style={styles.textStyle4}>ROUND SUMMARY</Text>
      <Text style={styles.textStyle2}>Round Score: {getScore}</Text>
      <Text style={styles.textStyle2}>Guesses Taken: {getAttempts}</Text>
      <Text style={styles.textStyle2}>Hints Taken: {getHints}</Text>
      <Text style={styles.textStyle2}>The Number was {randomNumber}</Text>
      <View
        style={{
          width: 120,
          marginTop: 25,
          border: '1px solid black',
        }}>
        <Button
          title="Continue"
          color="#ffd860"
          disabled={getRound == ROUNDS ? true : false}
          onPress={() => {
            changeRound();
            setScreen(2);
          }}
        />
      </View>
      <View
        style={{
          width: 120,
          marginVertical: 10,
          border: '1px solid black',
        }}>
        <Button title="Finish" color="#ffd860" onPress={() => gameReset()} />
      </View>
    </View>
  );

  const screenSwitching = () => {
    if (getScreen == 1) {
      return StartScreen;
    } else if (getScreen == 2) {
      return GameScreen;
    } else {
      return StatsScreen;
    }
  };

  return <View style={styles.container}>{screenSwitching()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78c4d4',
    textAlign: 'center',
  },
  textStyle1: {
    fontSize: 40,
    color: '#ff1ecd',
    fontWeight: 'bold',
  },
  textStyle2: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textStyle3: {
    fontSize: 15,
    color: 'white',
  },
  textStyle4: {
    fontSize: 30,
    color: '#ff1ecd',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  buttonStyle: {
    width: 80,
    marginHorizontal: 2,
  },
});
