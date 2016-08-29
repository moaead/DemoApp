import {combineReducers} from "redux";
import WorkOrderReducer from "./WorkOrderRecuder";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    WorkOrderReducer,
    form: formReducer
});

export default rootReducer;