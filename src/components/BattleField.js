import s from '../styles/play.module.css'

const BattleField = ({children}) => {
    return (
        <div className={s.battlefield} style={s}>
            {children}
        </div>
    );
};
export default BattleField;
