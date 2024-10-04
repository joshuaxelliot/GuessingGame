import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [number, setNumber] = useState();
  const [inputGuess, setInputGuess] = useState();
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    randomNumberGenerator();
  }, []);

  function randomNumberGenerator() {
    const number = Math.floor(Math.random() * 30) + 1;
    setNumber(number);
  }

  function handleInputChange(text) {
    const numericValue = text.replace(/[^0-9]/g, "");
    setInputGuess(numericValue);
  }

  function handleClick() {
    if (inputGuess == number) {
      setIsCorrect(true);
    } else if (inputGuess > number) {
      setFeedback("Too High!");
    } else {
      setFeedback("Too Low!");
    }
  }

  function handleNewRound() {
    randomNumberGenerator();
    setIsCorrect(false);
    setInputGuess(""); 
  }

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <View style={styles.container}>
      <View style={styles.feedback}>
        {isCorrect && <Text style={styles.correctText}>Correct!</Text>}
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>

      <Text style={styles.title}>Guess a number between 1-30</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleInputChange}
        value={inputGuess}
        placeholder="Pick a number"
      />

      <Pressable
        onPress={isCorrect ? handleNewRound : handleClick}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#81c784" : "#388e3c", 
          },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>{isCorrect ? "Play again!" : "Guess!"}</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20, 
  },
  title: {
    fontSize: 24,
    margin: 20,
    fontWeight: "700",
    textAlign: "center", 
    color: "#388e3c", 
  },
  input: {
    width: "80%", 
    height: 50,
    borderWidth: 2,
    borderColor: "#388e3c", 
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  button: {
    borderRadius: 10,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    width: "80%",
  },
  buttonText: {
    color: "#fff", 
    textAlign: "center",
  },
  feedback: {
    margin: 0,
    height: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "700",
    color: "red",
  },
  correctText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#388e3c",
  },
});
