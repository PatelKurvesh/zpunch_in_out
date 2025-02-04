sap.ui.define([
        "./App.controller",
        "../formatter/formatter",
        "sap/m/MessageToast",
        "sap/m/MessageBox"
], function (
        AppController,
        formatter,
        MessageToast,
        MessageBox
) {
        "use strict";

        return AppController.extend("zpunchinout.controller.View2", {
                /**
                 * @override
                 */

                formatter: formatter,
                onInit: function () {
                        this._getCount();
                },

                _getCount: function () {
                        var oModel = this.getOwnerComponent().getModel();
                        oModel.read("/EmployeeSet/$count", {
                                success: function (odata) {

                                        var jsonModel = new sap.ui.model.json.JSONModel();
                                        jsonModel.setProperty("/count", odata);
                                        this.getView().setModel(jsonModel, "jsonModel");
                                }.bind(this),
                                error: function (error) {
                                        MessageToast.show("Error creating employee.");
                                }
                        });
                },


                onCreateEmployeeButtonPress: function () {
                        if (!this._frag) {

                                this._frag = sap.ui.xmlfragment("zpunchinout.fragments.create", this);
                                this.getView().addDependent(this._frag);
                                this._frag.open();
                        } else {
                                this._frag.open()
                        }
                },

                onSaveEmployeeButtonPress: function () {
                        // Retrieve the form input values
                        const oData = {
                                FIRST_NAME: sap.ui.getCore().byId("firstName").getValue(),
                                LAST_NAME: sap.ui.getCore().byId("lastName").getValue(),
                                EMAIL: sap.ui.getCore().byId("email").getValue(),
                                GENDER: sap.ui.getCore().byId("gender").getValue(),
                                PHONE_NO: sap.ui.getCore().byId("phoneNo").getValue(),
                                DESIGNATION: sap.ui.getCore().byId("designation").getValue(),
                                EXPERIENCE: sap.ui.getCore().byId("experience").getValue(),
                                MODULE: sap.ui.getCore().byId("module").getValue(),
                                MODULE_TYPE: sap.ui.getCore().byId("moduleType").getValue(),

                                LAUNCHPAD_USER: ""
                        };

                        // Validation (example: ensure required fields are not empty)
                        if (!oData.FIRST_NAME || !oData.EMAIL) {
                                MessageToast.show("Please fill in all required fields.");
                                return;
                        }


                        // Call the OData service to save the data
                        const oModel = this.getOwnerComponent().getModel();
                        oModel.create("/EmployeeSet", oData, {
                                success: function (odata) {
                                        MessageBox.success("Employee created successfully!");
                                        this.onCancelButtonPress();
                                }.bind(this),
                                error: function (error) {
                                        MessageBox.error("Error creating employee.");
                                }
                        });
                },




                onPageNavButtonPress: function (oEvent) {
                        this.getRouter().navTo("RouteView1");
                },

                onButtonPressEmployee: function () {
                        this.getRouter().navTo("EmployeeDetail")
                },

                formatCustomDate: function (sDate) {
                        if (!sDate) {
                                return "";
                        }

                        // Parse the input date string "01/01/2025"
                        var aParts = sDate.split("/");
                        var oDate = new Date(`${aParts[2]}-${aParts[1]}-${aParts[0]}`); // Converts to "2025-01-01"

                        // Format to "6-Jan-2025"
                        var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "d-MMM-yyyy" });
                        return oDateFormat.format(oDate);
                },

                

                onEmployeeSetTableItemPress: function (oEvent) {
                        var oSelectedItem = oEvent.getParameter("listItem");
                        var oContext = oSelectedItem.getBindingContext();
                        var sEmployeeID = oContext.sPath.split("'")[1].trim();
                        // Navigate to View3 with Employee ID
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("EmployeeDetail", { empId: sEmployeeID });
                },

                onButton2Press: function (oEvent) {
                        this.getRouter().navTo("EmployeeDetail");
                },


        });
});