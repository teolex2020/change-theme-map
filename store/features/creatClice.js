import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  them: 0,
};


export const createTheme = createSlice({
  name: "theme",
  initialState,
reducers:{
changeTheme:(state, action)=>{
state.them=action.payload
console.log(action.payload);

}

}

})

export const {changeTheme}=createTheme.actions
export default createTheme.reducer