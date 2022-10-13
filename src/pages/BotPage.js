import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {reset, shoot} from "../store/bot";
import s from '../styles/main.module.css'
import BattleField from "../components/BattleField";
import BattleFieldTable from "../components/BattleFieldTable";
import Ship from "../components/Ship";
import {Link} from "react-router-dom";
import Shot from "../components/Shot";

const BotPage = () => {
    const dispatch = useDispatch()

    const state = useSelector(state => state.bot)
    const defaultShips = useSelector(state => state.main.ships)
    const [showBot, setShowBot] = useState(false)
    useEffect(() => {
        dispatch(reset(defaultShips))
    }, [defaultShips, dispatch])

    const getStatusTemplate = (text) => {
        return (
            <span style={{textAlign: 'center', fontSize: '30px'}}>
					{text}
            </span>
        )
    }
    const status = useMemo(() => {
        if (state.playing) {
            return getStatusTemplate('Ваш ход')
        }
        if (state.playerWin) {
            return getStatusTemplate('Поздравляю с победой')
        }
        return getStatusTemplate('Вы проиграли')
    }, [state.playerWin, state.playing])
    return (
        <div className={s.container}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className={s['mainContent']}>
                    <div>
                        <div className={s.mainItem}>
                            <BattleField>
                                <BattleFieldTable
                                    columns={10}
                                    rows={10}
                                    signed={true}
                                    axisX={n => n + 1}
                                    axisY={n => 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'[n]}
                                    hovered={false}
                                    onClick={() => {}}
                                />
                                {state.playerShips.map(ship => (
                                    <Ship key={ship.id} {...ship} />
                                ))}
                                {state.playerShots.map(shot => (
                                    <Shot key={shot.id} {...shot} />
                                ))}
                            </BattleField>
                            <BattleField>
                                <BattleFieldTable
                                    hovered
                                    onClick={(x, y) => dispatch(shoot({ x, y }))}
                                    columns={10}
                                    rows={10}
                                    signed={true}
                                    axisX={n => n + 1}
                                    axisY={n => 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'[n]}
                                />
                                {state.botShips.filter(ship => ship.killed || showBot)
                                    .map(ship => (
                                        <Ship key={ship.id} {...ship} />
                                    ))}

                                {state.botShots.map(shot => (
                                    <Shot key={shot.id} {...shot} />
                                ))}
                            </BattleField>
                        </div>
                        <div className={s.mainStatus}>
                            {status}
                        </div>
                        <div className={s['mainActions']}>
                            <button className={s.action}
                                    onClick={() => dispatch(reset(defaultShips))}
                            >
                                Переиграть
                            </button>
                            <button className={s.action}
                                    onClick={() => setShowBot(x => !x)}
                            >
                                Показать бота
                            </button>
                            <Link to='/'>
                                <button className={s.action}
                                        onClick={() => dispatch(reset(defaultShips))}
                                >
                                    Сдаться
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotPage;
