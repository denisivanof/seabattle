import { forwardRef } from 'react'
import s from '../styles/play.module.css'
import useSeaBattle from "../hooks/useSeaBattle";

const Dock = forwardRef(({children}, ref) => {
    const { cellSize } = useSeaBattle()
    return (
        <div
            ref={ref}
            className={s.dock}
            style={{
                width: `${cellSize * 10}px`,
                height: `${cellSize * 10}px`,
            }}
        >
            {children}
        </div>
    )
})

export default Dock
