import { useEffect, useState } from "react";
import microphoneImg from "./assets/microphone.png";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { KeyboardEvent } from "react";

function App() {
  const [userText, setUserText] = useState<string>("");
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setUserText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your Browser doesn't support Speech to Text</span>;
  }

  const handleTextToSpeechClick = () => {
    const utterance = new SpeechSynthesisUtterance(userText);
    const voices = window.speechSynthesis
      .getVoices()
      .filter(
        (voice) => voice.voiceURI === "Microsoft Zira - English (United States)"
      );
    if (voices.length > 0) {
      utterance.voice = voices[0];
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTextToSpeechClick();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={microphoneImg} className="App-logo" alt="microphone" />
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <div className="btn-group">
            <AwesomeButton
              type="primary"
              className="btn-control"
              onPress={() => SpeechRecognition.startListening()}
            >
              Start
            </AwesomeButton>
            <AwesomeButton
              type="danger"
              className="btn-control"
              onPress={() => SpeechRecognition.stopListening()}
            >
              Stop
            </AwesomeButton>
            <AwesomeButton
              type="secondary"
              className="btn-control"
              onPress={resetTranscript}
            >
              Reset
            </AwesomeButton>
          </div>
          <input
            type="text"
            className="App-Input"
            placeholder="Text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            onKeyDownCapture={handleKeyPress}
          />
          <AwesomeButton
            style={{ width: "100%" }}
            type="primary"
            onPress={handleTextToSpeechClick}
          >
            Speech
          </AwesomeButton>
        </div>
      </header>
    </div>
  );
}

export default App;
