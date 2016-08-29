import * as constants from "../constants/WorkOrderConstants";


const initialState = [
];


export default function workOrderReducer(state = initialState, action) {
    switch (action.type) {
    case constants.addWorkOrder:
        return [...state, action.workOrder];

    case constants.editWorkOrder:
        return state.map(workOrder => workOrder.id === action.workOrder.id
            ? Object.assign({}, workOrder, action.newWorkOrder)
            : action.workOrder);

    case constants.deleteWorkOrder:
        return state.filter(workOrder => workOrder.id !== action.workOrder.id);

    default:
        return state;
    }
}