import * as React from "react";
import {connect} from "react-redux";
import * as $ from "jquery";
import AddNewWorkorderModal from "./components/AddNewWorkOrderModal";

class WorkOrderPage extends React.Component<{}, {}> {
    state = {
        isModalOpen: false
    };
    openCreateWorkOrderModal = () => {
        this.setState({isModalOpen: true});
    };
    reloadTable = () => {
        $("#workOrderTable").DataTable().ajax.reload();
    };

    format = (d) => {
        return `<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="table table-striped table-bordered"><tr><td>Product Name:</td><td>${d.product.name}</td></tr><tr><td>Prouct Color:</td><td>${d.product.color}</td></tr></table>`;
    };

    render() {
        return (
            <div className="container-fluid" style={{ marginTop: "40px" }}>
                <AddNewWorkorderModal onNewWorkOrder={this.reloadTable} open={this.state.isModalOpen}/>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1 text-right">
                        <button className="btn btn-primary" onClick={this.openCreateWorkOrderModal}>
                            Create WorkOrder
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1" style={{ marginTop: "20px" }}>
                        <table id="workOrderTable" className="table table-striped table-bordered" width="100%">
                            <thead>
                            <tr>
                                <th />
                                <th>Id</th>
                                <th>Product Id</th>
                                <th>Order Quantity</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        );
    }


    componentDidMount() {
        $('#add-new-workorder-modal').on('hidden.bs.modal', () => {
            this.setState({isModalOpen: false});
        });
        var tableDom = $("#workOrderTable");
        var table = tableDom
            .DataTable({
                order: [[1, "asc"]],
                lengthChange: false,
                buttons: [
                    "copy", "csv", "excel", "pdf", "print",
                    {
                        extend: "colvis",
                        postfixButtons: ["colvisRestore"]
                    }
                ],
                "columns": [
                    {
                        "className": "details-control",
                        "orderable": false,
                        searchable: false,
                        "data": null,
                        "defaultContent": ""
                    },
                    {"data": "workOrderId"},
                    {"data": "productId"},
                    {"data": "orderQty"},
                    {
                        "data": "product.name",
                        visible: false
                    },
                    {
                        "data": "product.color",
                        visible: false,
                        "defaultContent": "",
                        "orderable": false
                    }
                ],
                processing: true,
                serverSide: true,
                ajax: {
                    "url": "/WorkOrders",
                    "type": "POST"
                },
                initComplete() {
                    table && table.buttons()
                        .container()
                        .appendTo("#workOrderTable_wrapper .col-sm-6:eq(0)");
                }
            });
        var self = this;
        tableDom.find("tbody")
            .on("click",
                "td.details-control",
                function () {
                    const tr = $(this).closest("tr");
                    const row = table.row(tr);

                    if (row.child.isShown()) {
                        row.child.hide();
                        tr.removeClass("shown");
                    } else {
                        // Open this row
                        row.child(self.format(row.data())).show();
                        tr.addClass("shown");
                    }
                });
    };
}


const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderPage);