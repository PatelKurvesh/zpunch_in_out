sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (
    Controller,
    JSONModel
) {
    "use strict";

    return Controller.extend("zpunchinout.controller.EmployeeDetail", {
        /**
         * @override
         */
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("EmployeeDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sEmployeeID = oEvent.getParameter("arguments").empId;
            this._loadPunchingData(sEmployeeID);
        },

        _loadPunchingData: function (sEmployeeID) {
            var oModel = this.getOwnerComponent().getModel();
            var that = this;
            var oFilter = new sap.ui.model.Filter("EMP_CODE_EMP_ID", sap.ui.model.FilterOperator.EQ, sEmployeeID)

            oModel.read("/PunchingDetails", {
                filters: [oFilter],
                urlParameters: { "$expand": "EMP_CODE" },
                success: function (oData) {
                    debugger;
                    var oJsonModel = this.getOwnerComponent().getModel("JSONModel");
                    oJsonModel.setProperty("/PunchinData", oData.results);
                    var aResults = oJsonModel.getProperty("/PunchinData");
                    aResults.map((entry) => {
                        var punchInTime = this._convertToDateTime(entry.PUNCH_DATE, entry.PUNCH_IN);
                        var punchOutTime = entry.PUNCH_OUT ? this._convertToDateTime(entry.PUNCH_DATE, entry.PUNCH_OUT) : null;
                        var duration = punchOutTime ? (punchOutTime - punchInTime) / (1000 * 60 * 60) : 0;
                        entry.Duration = parseFloat(duration.toFixed(2));
                    });
                    oJsonModel.refresh();
                    
                }.bind(this),
                error: function (oError) {
                    console.error("Failed to load Punching Data", oError);
                }
            });
        },

        _convertToDateTime: function (date, time) {
            var dateParts = date.split("-");
            var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

            return new Date(formattedDate + " " + time);
        }
    });
});