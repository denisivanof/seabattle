import React, {useMemo, useRef} from 'react';
import useSeaBattle from "../hooks/useSeaBattle";
import {useDrop} from "react-dnd";
import s from '../styles/play.module.css'
import BattleField from "./BattleField";
import BattleFieldTable from "./BattleFieldTable";
import Dock from "./Dock";
import DraggableShip from "./DraggableShip";


const BattleFieldEditor = ({ships, onPlace, onDock, onRotate}) => {
    const dockedShips = useMemo(() => ships.filter(ship => !ship.placed), [ships])

    const placedShips = useMemo(() => ships.filter(ship => ship.placed), [ships])
    const { cellSize } = useSeaBattle()
    const placeRef = useRef()

    const [, dockDrop] = useDrop(() => ({
        accept: 'SHIP',
        drop(item) {
            onDock(item.id)
        },
    }))

    const [, placeDrop] = useDrop(() => ({
        accept: 'SHIP',
        drop(item, monitor) {
            const mouseStart = monitor.getInitialClientOffset()
            const mouseFinish = monitor.getClientOffset()
            const shipStart = monitor.getInitialSourceClientOffset()

            const diff = {
                x: mouseStart.x - shipStart.x,
                y: mouseStart.y - shipStart.y,
            }

            const rect = placeRef.current.getBoundingClientRect()

            const x = Math.floor((mouseFinish.x - rect.left - diff.x + cellSize / 2) / cellSize)
            const y = Math.floor((mouseFinish.y - rect.top - diff.y + cellSize / 2) / cellSize)

            onPlace(item.id, x, y)
        },
    }))

    placeDrop(placeRef)
    return (
        <div className={s['battlefieldConstructor']}>
            <Dock ref={dockDrop}>
                {dockedShips.map(ship => (
                    <DraggableShip
                        key={ship.id}
                        {...ship}
                        onClick={() => onRotate(ship.id)}
                    />
                ))}
            </Dock>
            <BattleField>
                <BattleFieldTable
                    columns={10}
                    rows={10}
                    signed={true}
                    axisX={n => n + 1}
                    axisY={n => 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'[n]}
                    hovered={false}
                    onClick={() => {}}
                    ref={placeRef} />

                {placedShips.map(ship => (
                    <DraggableShip
                        key={ship.id}
                        {...ship}
                        onClick={e =>
                            onRotate(ship.id, e.clientX, e.clientY, cellSize)
                        }
                    />
                ))}
            </BattleField>
        </div>
    );
};

export default BattleFieldEditor;
