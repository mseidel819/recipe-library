// import { compose, createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipes/recipes.slice";
import { logger } from "redux-logger";

// export type RootState = ReturnType<typeof recipeReducer>;

// const persistConfig: ExtendedPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["recipes"],
// };

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWares),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
