import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomPrompt } from './Prompt'; // Corrected path
import '../App.css'; // Correct path to App.css

function Typeshyt() {
    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [sampleText, setSampleText] = useState('');
    const [highlightStyle, setHighlightStyle] = useState('underline');
    const [promptLength, setPromptLength] = useState(25);
    const [correctColor, setCorrectColor] = useState('green');
    const [incorrectColor, setIncorrectColor] = useState('red');

    const correctColorRef = useRef(null);
    const incorrectColorRef = useRef(null);

    const handleRestart = useCallback(() => {
        setText('');
        setStartTime(null);
        setEndTime(null);
        setWpm(0);
        setAccuracy(100);
        const prompt = getRandomPrompt().split(' ').slice(0, promptLength).join(' ');
        console.log("New Prompt on Restart:", prompt); // Debugging: Log the new prompt
        setSampleText(prompt);
    }, [promptLength]);

    useEffect(() => {
        handleRestart();
    }, [handleRestart]);

    useEffect(() => {
        if (endTime && startTime) {
            const timeDiff = (endTime - startTime) / 1000; // in seconds
            const wordsTyped = text.split(' ').length;
            const rawWpm = (wordsTyped / timeDiff) * 60;
            setWpm(rawWpm * (accuracy / 100)); // Adjust WPM by accuracy
        }
    }, [endTime, startTime, text, accuracy]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault(); // Prevent default tab behavior
                handleRestart();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleRestart]);

    useEffect(() => {
        const prompt = getRandomPrompt().split(' ').slice(0, promptLength).join(' ');
        setSampleText(prompt);
    }, [promptLength]);

    const handleChange = (e) => {
        if (!startTime) {
            setStartTime(new Date());
        }
        const inputText = e.target.value;
        setText(inputText);

        const currentTime = new Date();
        const timeDiff = (currentTime - startTime) / 1000; // in seconds
        const wordsTyped = inputText.split(' ').filter(word => word.length > 0).length; // Filter out empty strings
        const rawWpm = (wordsTyped / timeDiff) * 60;

        // Calculate accuracy
        const correctChars = sampleText.slice(0, inputText.length).split('').filter((char, index) => char === inputText[index]).length;
        const accuracyPercentage = (correctChars / inputText.length) * 100;
        setAccuracy(inputText.length > 0 ? accuracyPercentage : 100);

        // Adjust WPM by accuracy
        setWpm(rawWpm * (accuracy / 100));

        // End test when the input text length matches the sample text length
        if (inputText.length === sampleText.length) {
            setEndTime(currentTime);
        }
    };

    const renderTextWithColors = () => {
        return sampleText.split('').map((char, index) => {
            let color = '#e0e0e0';
            let style = {};
            if (index < text.length) {
                color = char === text[index] ? correctColor : incorrectColor;
            }
            if (index === text.length) {
                switch (highlightStyle) {
                    case 'bold':
                        style.fontWeight = 'bold';
                        break;
                    case 'italic':
                        style.fontStyle = 'italic';
                        break;
                    case 'box':
                        style.border = '1px solid gray';
                        break;
                    default:
                        style.textDecoration = 'underline';
                }
            }
            return (
                <span key={index} style={{ color, ...style, fontSize: '24px' }}>
                    {char}
                </span>
            );
        });
    };

    const handleColorChange = (e, setColor) => {
        setColor(e.target.value);
    };

    return (
        <div className="test-container">
            <div className="test-box">
                <h1 className="test-header">TypeHyt</h1>
                <div className="test-prompt">
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }}>
                        {renderTextWithColors()}
                    </div>
                    <textarea
                        value={text}
                        onChange={handleChange}
                        className="test-textarea"
                    />
                </div>
                <h2 className="test-stats">Live WPM: {wpm.toFixed(2)}</h2>
                <h2 className="test-stats">Accuracy: {accuracy.toFixed(2)}%</h2>
                {endTime && <h2 className="test-stats">Your typing speed is {wpm.toFixed(2)} WPM</h2>}
                <button onClick={handleRestart} className="test-button">
                    Restart
                </button>
            </div>
            <div className="customization-panel">
                <h2>Customization</h2>
                <div>
                    <label>Highlight Style:</label>
                    <select value={highlightStyle} onChange={(e) => setHighlightStyle(e.target.value)}>
                        <option value="underline">Underline</option>
                        <option value="bold">Bold</option>
                        <option value="italic">Italic</option>
                        <option value="box">Box</option>
                    </select>
                </div>
                <div>
                    <label>Prompt Length: {promptLength} words</label>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={promptLength}
                        onChange={(e) => setPromptLength(Number(e.target.value))}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>Correct Color:</label>
                    <div
                        onClick={() => correctColorRef.current.click()}
                        style={{ width: '20px', height: '20px', backgroundColor: correctColor, marginLeft: '10px', border: '1px solid #ddd', cursor: 'pointer' }}
                    ></div>
                    <input
                        type="color"
                        ref={correctColorRef}
                        value={correctColor}
                        onChange={(e) => handleColorChange(e, setCorrectColor)}
                        style={{ display: 'none' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>Incorrect Color:</label>
                    <div
                        onClick={() => incorrectColorRef.current.click()}
                        style={{ width: '20px', height: '20px', backgroundColor: incorrectColor, marginLeft: '10px', border: '1px solid #ddd', cursor: 'pointer' }}
                    ></div>
                    <input
                        type="color"
                        ref={incorrectColorRef}
                        value={incorrectColor}
                        onChange={(e) => handleColorChange(e, setIncorrectColor)}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Typeshyt;