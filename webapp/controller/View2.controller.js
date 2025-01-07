sap.ui.define([
        "./App.controller",
        "../formatter/formatter"
], function (
        Controller, Formatter
) {
        "use strict";

        return Controller.extend("zpunchinout.controller.View2", {
                /**
                 * @override
                 */

                formatter: Formatter,
                onInit: function () {
                        this.getCount();
                },

                getCount: function () {
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
                        if (!this.frag) {

                                this.frag = sap.ui.xmlfragment("zpunchinout.fragments.create", this);
                                this.getView().addDependent(this.frag);
                                this.frag.open();
                        } else {
                                this.frag.open()
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
                                        this.frag.close();
                                        if (this.frag) {
                                                this.frag.destroy();
                                                this.frag = null;
                                        }
                                },
                                error: function (error) {
                                        sap.m.MessageToast.show("Error creating employee.");
                                }
                        });
                },

                onCancelDialog: function () {
                        this.frag.close();
                        if (this.frag) {
                                this.frag.destroy();
                                this.frag = null;
                        }
                },

                onPageNavButtonPress: function (oEvent) {
                        this.getRouter().navTo("RouteView1");
                }
        });
});