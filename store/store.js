import { configureStore } from "@reduxjs/toolkit";
import createTheme from "./features/creatClice.js";

 export const store = configureStore({
   reducer: {
     them: createTheme,
   },
 });

