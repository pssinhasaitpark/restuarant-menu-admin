import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import restaurantReducer from './slices/restaurantSlice';
import customerReducer from './slices/customerDetailsSlice';
import profileReducer from './slices/profileSlice';
import createtableReducer from './slices/createtableSlice';
import createmenuReducer from './slices/createmenuSlice';
import supportReducer from './slices/supportSlice';
import staffReducer from './slices/staffSlice';
import userReducer from './slices/userSlice';
import reviewReducer from './slices/reviewSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    customers: customerReducer,
    profile: profileReducer,
    createtable: createtableReducer,
    createmenu: createmenuReducer,
    support: supportReducer,
    staff: staffReducer,
    user: userReducer,
    reviews : reviewReducer,
  },
});

export default store;
