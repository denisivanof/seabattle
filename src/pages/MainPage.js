import React from 'react';
import {useSelector} from "react-redux";
import s from '../styles/main.module.css'
import {Link} from "react-router-dom";
import BattleField from "../components/BattleField";
import BattleFieldTable from "../components/BattleFieldTable";
import Ship from "../components/Ship";

const MainPage = () => {
    const ships = useSelector(state => state.main.ships)
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

                                {ships.map(ship => (
                                    <Ship key={ship.id} {...ship} />
                                ))}
                            </BattleField>
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
                            </BattleField>
                        </div>
                        <div className={s['mainActions']}>
                            <Link to='/editor'>
                                <button className={s.action}>Редактировать</button>
                            </Link>
                            <Link to='/bot'>
                                <button className={s.action}>
                                    Играть с ботом
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
