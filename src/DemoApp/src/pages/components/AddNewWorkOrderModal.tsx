import * as React from "react";
import * as ReactDOM from "react-dom";
import AddNewWorkOrderForm from "./AddNewWorkOrderForm";
import {connect} from "react-redux";

interface IAddNewWorkorderModal {
    onNewWorkOrder: () => void;
    open: boolean;
}

class AddNewWorkorderModal extends React.Component<IAddNewWorkorderModal, {}> {
    modalElement;
    state = {
        productsDropdownData: []
    };
    open = () => {
        $(this.modalElement).modal("show");
    };

    close = () => {
        $(this.modalElement).modal("hide");
    };

    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error: any = new Error(response.statusText);
            error.response = response;
            throw error
        }
    };


    addWorkOrder = (request) => {
        return fetch("/WorkOrders/Save",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            .then(this.checkStatus)
            .then(() => {
                this.close();
                this.props.onNewWorkOrder();
            });
    };


    render() {
        if (this.props.open) {
            this.open();
        }
        else {
            this.close();
            $('.modal-backdrop').remove();
        }

        return (
            <div className="modal fade" id="add-new-workorder-modal" role="dialog" ref={(elm) => this.modalElement = elm
            }>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close white-color" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add WorkOrder</h4>
                        </div>
                        <div className="modal-body">
                            <AddNewWorkOrderForm onSubmit={this.addWorkOrder}/>
                            {/*
                             <div className="form-group">
                             <label className="control-label col-sm-2" htmlFor="orderQty">Order Quantity: </
                             label>
                             <div className="col-sm-10">
                             <input type="text" className="form-control" id="orderQty" name="orderQty"
                             placeholder=
                             "Enter order quantity"/>
                             </div>
                             </div>
                             */}
                            {/*
                             <div className="form-group">
                             <label className="control-label col-sm-2" htmlFor="product">Product: </label>
                             <div className="col-sm-10">
                             <select id="product" className="chosen-select" data-placeholder=
                             "Select a product" name="productId">
                             <option value=""></option>
                             {this.state.productsDropdownData
                             .map(t => <option key={t.value} value={t.value}>{t.text}</option>)}
                             </select>

                             </div>
                             </div>
                             */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => ({
    onNewWorkOrder: ownProps.onNewWorkOrder
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AddNewWorkorderModal);