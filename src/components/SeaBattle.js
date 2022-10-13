import React, {createContext, useMemo} from 'react';

export const SeaBattleContext = createContext()

const SeaBattle = ({cellSize, children}) => {
    const val = useMemo(()=>({cellSize}), [cellSize])
    return (
        <SeaBattleContext.Provider value={val}>
            {children}
        </SeaBattleContext.Provider>
    );
};
export default SeaBattle;
