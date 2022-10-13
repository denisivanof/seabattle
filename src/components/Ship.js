import React, {forwardRef, useMemo} from 'react';
import s from '../styles/play.module.css'
import classNames from "classnames";
import useSeaBattle from "../hooks/useSeaBattle";

const Ship = forwardRef(({x, y, length, direction, killed, onClick}, ref) => {
    const { cellSize } = useSeaBattle()

    const style = useMemo(() => {
        const style = {}
        const along = length * cellSize + length - 1
        const across = cellSize

        if (direction === 'row') {
            style.width = `${along}px`
            style.height = `${across}px`
        } else {
            style.width = `${across}px`
            style.height = `${along}px`
        }
        const offsetX = x * (cellSize + 1)
        const offsetY = y * (cellSize + 1)

        style.left = `${offsetX}px`
        style.top = `${offsetY}px`

        return style
    }, [cellSize, direction, length, x, y])
    return (
        <div
            onClick={onClick}
            ref={ref}
            className={classNames(s.ship, {[s['shipKilled']]: killed,})}
            style={style}
        />
    );
});

export default Ship;
