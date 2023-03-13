import './App.css';

import useEngine from './useEngine.js';

import GeneratedText from "./components/GeneratedText.js";
import Timer from "./components/Timer.js";
import RestartButton from "./components/RestartButton.js";
import Message from './components/Message';
import Results from './components/Results';

function App() {

    const { time, status, textChecked, results, finalMessages } = useEngine();

    return (
        <div>
            <div className="mx-auto text-center mb-5">
                <h1 className=" text-4xl font-bold text-green-700">{"<Typing-Check\\>"}</h1>
            </div>
            <Timer timeLeft={time}></Timer>
            <GeneratedText words={textChecked} className="mt-3"></GeneratedText>
            { status === "ready" && 
                <Message className="mt-4"></Message>
            }
            <RestartButton className='mx-auto text-gray-300 mt-2'></RestartButton>
            { status !== "ready" && status !== "running" &&
                <Results className="mt-1" message={finalMessages[status]} results={results}></Results>
            }
        </div>
    );
}

export default App;
