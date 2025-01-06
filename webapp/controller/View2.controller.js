sap.ui.define([
        "./App.controller",
        "../formatter/formatter"
], function(
	Controller,Formatter
) {
	"use strict";

	return Controller.extend("zpunchinout.controller.View2", {
        /**
         * @override
         */

        formatter: Formatter,
        onInit: function() {
            
            
        
        },
        onBackForward: function(){
                this.getRouter().navTo("RouteView1");
        },

        onCreateEmployee : function(){
                if(!this.Dialog){

                        this.frag = sap.ui.xmlfragment("zpunchinout.fragments.create",this);
                        this.getView().addDependent(this.frag);
                        this.frag.open();
                }else{
                        this.Dialog.open()
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
                if ( !oData.FIRST_NAME || !oData.EMAIL) {
                    MessageToast.show("Please fill in all required fields.");
                    return;
                }
    
                // Call the OData service to save the data
                const oModel = this.getOwnerComponent().getModel();
                oModel.create("/Employees", oData, {
                    success: function (odata) {
                        MessageToast.show("Employee created successfully!");
                    },
                    error: function (error) {
                        MessageToast.show("Error creating employee.");
                    }
                });
            }
	});
});