import React, { useEffect, useState } from 'react';
import microphoneImg from './assets/microphone.png';
import headphoneImg from './assets/headphone.png';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import { KeyboardEvent } from 'react';

function App() {

  const [userText, setUserText] = useState<string>('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setUserText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your Browser doesn't support Speech to Text</span>
  }

  const handleTextToSpeechClick = () => {
    const value = new SpeechSynthesisUtterance(userText);
    window.speechSynthesis.speak(value);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTextToSpeechClick();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={microphoneImg} className="App-logo" alt="microphone" />
          <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <AwesomeButton type="primary" className='btn-control' onPress={() => SpeechRecognition.startListening()}>Start</AwesomeButton>
            <AwesomeButton type="danger" className='btn-control' onPress={() => SpeechRecognition.stopListening()}>Stop</AwesomeButton>
            <AwesomeButton type="secondary" className='btn-control' onPress={resetTranscript}>Reset</AwesomeButton>
            <input 
              type="text" 
              className="App-Input" 
              placeholder="Text" 
              value={userText}
              onChange={e => setUserText(e.target.value)}
              onKeyDownCapture={handleKeyPress}
            />
            <AwesomeButton style={{width: '100%'}} type="primary" onPress={handleTextToSpeechClick}>Speech</AwesomeButton>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
