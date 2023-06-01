import React, { useState, useEffect } from 'react';
import useInterval from '../../hooks/use-interval';
import { Button } from '../Button';
import { Timer } from '../Timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function Pomodoro(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  };

  const configRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  return (
    <>
      <div className="pomodoro">
        <h2>Status:</h2>
        <h3>{working ? 'Trabalho' : 'Descanso'}</h3>
        <Timer mainTime={mainTime} />
        <div className="controls">
          <Button text="Trabalhar" onClick={() => configWork()} />
          <Button text="Descansar" onClick={() => configRest(false)} />
          <Button
            className={!working && !resting ? 'hidden' : ''}
            text={timeCounting ? 'Pause' : 'Play'}
            onClick={() => setTimeCounting(!timeCounting)}
          />
        </div>
      </div>
      <div className="details">
        <p>Ciclos concluídos: 0</p>
        <p>Horas trabalhadas: 00:00:00</p>
        <p>Horas descansadas: 00:00:00</p>
        <p>Próximo ciclo: Trabalho</p>
      </div>
    </>
  );
}