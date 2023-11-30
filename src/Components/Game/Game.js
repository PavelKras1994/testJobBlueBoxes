import React, { useEffect, useState } from 'react';

import './Game.scss';
import Modal from '../Modal/Modal';

const Game = () => {
    const [blocks, setBlocks] = useState(Array(100).fill('blue')) 
    const [activeYellow, setActiveYellow] = useState(false)
    const [isButtonPressed, setIsButtonPressed] = useState(false)
    const [inputValue, setInputValue] = useState() 
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)
    const [usedNumbers, setUsedNumbers] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleBlockClick = (index) => {
        if (index === activeYellow) {
            const updatedSBlocks = [...blocks];
            updatedSBlocks[activeYellow] = 'green';
            setPlayerScore(score => score+1)
            setBlocks(updatedSBlocks)

            setActiveYellow(null)
            setIsButtonPressed(false)
        }
    }

    useEffect(() => {
        let timer;

        if (isButtonPressed) {
          timer = setTimeout(() => {
            if (activeYellow !== null) {
                const updatedSBlocks = [...blocks];
                updatedSBlocks[activeYellow] = 'red';
                setComputerScore(score => score+1)
                setBlocks(updatedSBlocks)
                setActiveYellow(false)
            }
            setIsButtonPressed(false);
          }, inputValue);
        }
    
        return () => clearTimeout(timer);
      }, [isButtonPressed, activeYellow, blocks, inputValue]);

      useEffect(() => {
        if (playerScore >= 10 || computerScore >= 10) {
            setShowModal(true)
        }
      }, [setShowModal, computerScore, playerScore])

    const gameStart = () => {
        if (isButtonPressed === false) {
            const randomNumber = getRandomUniqueNumber()
            const updatedSBlocks = [...blocks];
            updatedSBlocks[randomNumber] = 'yellow';
            setBlocks(updatedSBlocks)
            setActiveYellow(randomNumber)
            setIsButtonPressed(true)
        }
    }

    const getRandomUniqueNumber = () => {
        let randomNumber;
      
        do {
          randomNumber = Math.floor(Math.random() * 100);
        } while (usedNumbers.includes(randomNumber));
        
        let tempUsedNumbers = usedNumbers
        tempUsedNumbers.push(randomNumber);
        setUsedNumbers(tempUsedNumbers)
        return randomNumber;
      }

    const closeModal = () => {
        setBlocks((Array(100).fill('blue')))
        setInputValue('')
        setPlayerScore(0)
        setComputerScore(0)
        setUsedNumbers([])
        setShowModal(false)
    }

    return (
        <>
        {showModal ? <Modal playerScore={playerScore} computerScore={computerScore} closeModal={closeModal} /> : ''}
        <div className="game">
            <div className="game__container">
                {blocks.map((color, index) => (
                    <div 
                        style={{backgroundColor: color}}  
                        onClick={() => handleBlockClick(index)} 
                        className='game__container_block'
                    >
                    </div>
                ))}
            </div>
            <div className='game__toolbar'>
                <div> Гравець: {playerScore} </div>
                <div> Компьютер: {computerScore} </div>
                <div> Введіть таймер на клік у ms: </div>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
                <button className='game__toolbar_button' onClick={gameStart}> Почати </button>
            </div>
        </div>
        </>
    );
};

export default Game;

