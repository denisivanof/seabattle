import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setShips} from "../store/main";
import s from '../styles/main.module.css'
import {dock, place, random, rotate, reset} from "../store/editor";
import BattleFieldEditor from "../components/BattleFieldEditor";

const EditorPage = () => {
    const defaultShips = useSelector(state => state.main.ships)

    const ships = useSelector(state => state.editor.ships)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const placed = useMemo(() => ships.every(ship => ship.placed), [ships])

    useEffect(() => {
        dispatch(setShips(defaultShips))
    }, [defaultShips, dispatch])

    const clickHandler = useCallback(() => {
        dispatch(setShips(ships))
        navigate('/')
    }, [dispatch, navigate, ships])

    return (
        <div className={s.container}>
            <div className={s['editorPage']}>
                <BattleFieldEditor
                    ships={ships}
                    onPlace={(id, x, y) => dispatch(place({ id, x, y }))}
                    onDock={id => dispatch(dock(id))}
                    onRotate={(id, mouseX, mouseY, cellSize) =>
                        dispatch(rotate({ id, mouseX, mouseY, cellSize }))
                    }
                />
            </div>
            <div className={s['editorActions']}>
                <div className={s.editorActions__item}>
                    <button className={s.action} onClick={() => dispatch(reset())}>
                        Сбросить
                    </button>
                    <button className={s.action} onClick={() => dispatch(random())}>
                        Случайно
                    </button>
                    <button className={s.action} disabled={!placed} onClick={clickHandler}>
                        Сохранить
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EditorPage;
