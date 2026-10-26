import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
