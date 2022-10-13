import s from "../styles/play.module.css"
import classNames from 'classnames'
import { useMemo } from "react"
import useSeaBattle from "../hooks/useSeaBattle";

const Shot = ({ x, y, status}) => {
    const { cellSize } = useSeaBattle()
    const style = useMemo(() => {
        const style = {
            width: `${cellSize}px`,
            height: `${cellSize}px`,
        }
        const offsetX = x * (cellSize + 1)
        const offsetY = y * (cellSize + 1)
        style.left = `${offsetX}px`
        style.top = `${offsetY}px`

        return style
    }, [cellSize, x, y])

    return (
        <div
            style={style}
            className={classNames({
                [s.shot]: true,
                [s['shotMissed']]: status === 'missed',
                [s['shotHitted']]: status === 'hitted',
            })}
        />
    )
}
export default Shot
