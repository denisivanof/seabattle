import { configureStore } from '@reduxjs/toolkit'

import main from './main'
import bot from './bot'
import editor from "./editor";
export const store = configureStore({
    reducer: {
        main,
        bot,
        editor,
    },
})
