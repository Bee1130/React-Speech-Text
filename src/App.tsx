import React from 'react';
import logo from './microphone.png';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';

function App() {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Your Browser doesn't support Speech to Text</span>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <AwesomeButton type="primary" className='btn-control' onPress={() => SpeechRecognition.startListening()}>Start</AwesomeButton>
          <AwesomeButton type="danger" className='btn-control' onPress={() => SpeechRecognition.stopListening()}>Stop</AwesomeButton>
          <AwesomeButton type="secondary" className='btn-control' onPress={resetTranscript}>Reset</AwesomeButton>
          <p>{transcript}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
