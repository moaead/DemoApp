import * as React from "react";
import * as ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import App from "./App";
import { AppContainer } from 'react-hot-loader';

const store = configureStore();
//store.runSaga(rootSaga);
require("jquery/dist/jquery.min");

require("bootstrap/dist/css/bootstrap.min.css");
require("datatables.net-bs/css/dataTables.bootstrap.css");
require("datatables.net-buttons-bs/css/buttons.bootstrap.css");

require("bootstrap/dist/js/bootstrap.min.js");

require("datatables.net/js/jquery.dataTables.js");

require("datatables.net-bs/js/dataTables.bootstrap.js");

require("datatables.net-buttons/js/dataTables.buttons.js");
require("datatables.net-buttons-bs/js/buttons.bootstrap.js");

require('datatables.net-buttons/js/buttons.colVis.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.print.js');

require("chosen-js/chosen.jquery.js");
require("bootstrap-chosen/bootstrap-chosen.css");

require("./styles/main.scss");


/*
 ReactDOM.render(<Provider store={store}>
 <WorkOrderPage/>
 </Provider>,
 document.getElementById("app"));
 */

/*ReactDOM.render(<Provider store={store}>
 <WorkOrderPage/>
 </Provider>,
 document.getElementById("app"));*/

const rootEl = document.getElementById('app');
ReactDOM.render(
    <AppContainer>
        <App store={store}/>
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp store={store} />
            </AppContainer>,
            rootEl
        );
    });
}
