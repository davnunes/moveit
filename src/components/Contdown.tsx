import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');
 
    function startCountdown() {
        setIsActive(true); 
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false);
        setTime(0.1 * 60);
    }

    // Fired when happen some
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled type="button" className={`${styles.countDownButton} ${styles.countDownButtonActive}`}>
                    Ciclo encerrado
                </button>
            ) : (
                // Tag sem valor para condição ser reconhecida pelo ternário
                <>
                    { isActive ? (
                        <button type="button" className={`${styles.countDownButton} ${styles.countDownButtonActive}`} onClick={resetCountdown}>
                            Abandonar um ciclo 
                        </button>
                    ) : (
                        <button type="button" className={styles.countDownButton} onClick={startCountdown}>
                            Iniciar um ciclo 
                        </button>
                    )}
                </>
            )}
        </div>
    );
}