sap.ui.define([
        "./App.controller",
        "../formatter/formatter",
        "sap/m/MessageToast"
], function (
        Controller, Formatter, MessageToast
) {
        "use strict";

        return Controller.extend("zpunchinout.controller.View2", {
                /**
                 * @override
                 */

                formatter: Formatter,
                onInit: function () {
                        this._getCount();
                },

                _getCount: function () {
                        var oModel = this.getOwnerComponent().getModel();
                        oModel.read("/EmployeePunchingDetails/$count", {
                                success: function (odata) {
                                        debugger;
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

                onAddNewEmp: function () {
                        // Retrieve the form input values
                        const oData = {
                                FIRST_NAME: sap.ui.getCore().byId("firstName").getValue(),
                                LAST_NAME: sap.ui.getCore().byId("lastName").getValue(),
                                EMAIL: sap.ui.getCore().byId("email").getValue(),
                                GENDER: sap.ui.getCore().byId("gender").getValue(),
                                PHONE_NO: sap.ui.getCore().byId("phoneNo").getValue(),
                        };

                        // Validation (example: ensure required fields are not empty)
                        if (!oData.FIRST_NAME || !oData.EMAIL) {
                                MessageToast.show("Please fill in all required fields.");
                                return;
                        }


                        // Call the OData service to save the data
                        const oModel = this.getOwnerComponent().getModel();
                        oModel.create("/Employees", oData, {
                                success: function (odata) {
                                        sap.m.MessageToast.show("Employee created successfully!");
                                        this.onCancelDialog();
                                }.bind(this),
                                error: function (error) {
                                        sap.m.MessageToast.show("Error creating employee.");
                                }
                        });
                },


                onCancelDialog: function () {
                        this._frag.close();
                        if (this._frag) {
                                this._frag.destroy();
                                this._frag = null;
                        }
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
                }
        });
});