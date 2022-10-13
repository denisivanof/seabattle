import React, {forwardRef, useMemo} from 'react';
import useSeaBattle from "../hooks/useSeaBattle";
import s from '../styles/play.module.css'
import classNames from "classnames";
const BattleFieldTable = forwardRef(({ columns, rows, signed, axisX, axisY, hovered, onClick }, ref) => {
    const { cellSize } = useSeaBattle()

    const matrix = useMemo(() => {
        const matrix = []

        for (let y = 0; y < rows; y++) {
            const row = []
            for (let x = 0; x < columns; x++) {
                const item = { x, y }
                row.push(item)
            }
            matrix.push(row)
        }
        return matrix
    }, [columns, rows])
    return (
        <table ref={ref} className={s['battlefieldTable']}>
            <tbody>
            {matrix.map((row, y) => (
                <tr key={y}>
                    {row.map((item, x) => {
                        let markerX = null
                        let markerY = null

                        if (signed) {
                            if (x === 0) {
                                markerX = (
                                    <span className={s.marker}
                                          style={{ left: `-${cellSize}px` }}
                                    >
                                        {axisX(y)}
										</span>
                                )
                            }

                            if (y === 0) {
                                markerY = (
                                    <span className={s.marker}
                                          style={{ top: `-${cellSize}px` }}
                                    >
											{axisY(x)}
										</span>
                                )
                            }
                        }

                        return (
                            <td key={x}
                                className={classNames({
                                    [s['battlefieldItem']]: true,
                                    [s['battlefieldItem__hovered']]:
                                    hovered,
                                })}
                                style={{
                                    width: `${cellSize}px`,
                                    height: `${cellSize}px`,
                                }}
                                onClick={() => {onClick(x, y)}}
                            >
                                {markerX}
                                {markerY}
                            </td>
                        )
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
});

export default BattleFieldTable;
