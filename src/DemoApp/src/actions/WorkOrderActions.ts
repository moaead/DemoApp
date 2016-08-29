import {IWorkOrder as WorkOrder} from "../models/WorkOrder";
import * as constants from "../constants/WorkOrderConstants";

export function addWorkOrder(workOrder: WorkOrder) {
    return {
        workOrder,
        type: constants.addWorkOrder
    };
}

export function editWorkOrder(workOrder: WorkOrder, newWorkOrder: WorkOrder) {
    return {
        workOrder,
        newWorkOrder,
        type: constants.editWorkOrder
    };
}

export function deleteWorkOrder(workOrder: WorkOrder) {
    return {
        workOrder,
        type: constants.deleteWorkOrder
    };
}