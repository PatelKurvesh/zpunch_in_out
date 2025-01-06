sap.ui.define([
    "./App.controller",
    "sap/ndc/BarcodeScanner"
], (AppController,
	BarcodeScanner) => {
    "use strict";

    return AppController.extend("zpunchinout.controller.View1", {
        onInit() {
            this.getModel("").setUseBatch(false);
        },

        onPunchInButtonPress: function () {
            BarcodeScanner.scan(
                function (result) {
                    if (result.cancelled) {
                        sap.m.MessageToast.show("Scanning cancelled.");
                    } else {
                        var sText = result.text;
                        var empId = parseInt(sText.split(":")[0])
                        var oModel = this.getModel("");
                        oModel.callFunction("/Punch", {
                            urlParameters: {
                                "Action": "IN",
                                "EmpId": empId
                            },
                            method: "POST",
                            success: function (odata) {
                               
                               sap.m.MessageToast.show(odata.Punch.sResponsMsg)
                            }.bind(this),
                            error: function (error) {
                                sap.m.MessageBox.warning(JSON.parse(error.responseText).error.message.value)
                            }
                        })
                        console.log("Scanned Result:", result.text);
                    }
                }.bind(this),
                function (error) {
                    sap.m.MessageToast.show("Scanning failed: " + error);
                    console.error("Barcode Scanning Error:", error);
                }
            );
        },
        onPunchOutButtonPress: function () {
            BarcodeScanner.scan(
                function (result) {
                    if (result.cancelled) {
                        sap.m.MessageToast.show("Scanning cancelled.");
                    } else {
                        var sText = result.text;
                        var empId = parseInt(sText.split(":")[0])
                        var oModel = this.getModel("");
                        oModel.callFunction("/Punch", {
                            urlParameters: {
                                "Action": "OUT",
                                "EmpId": empId
                            },
                            method: "POST",
                            success: function (odata) {
                               
                                sap.m.MessageToast.show(odata.Punch.sResponsMsg)
                            }.bind(this),
                            error: function (error) {
                                sap.m.MessageBox.warning(JSON.parse(error.responseText).error.message.value)
                            }
                        })
                        console.log("Scanned Result:", result.text);
                    }
                }.bind(this),
                function (error) {
                    sap.m.MessageToast.show("Scanning failed: " + error);
                    console.error("Barcode Scanning Error:", error);
                }
            );
        },


        onViewButtonPress: function(){
            this.getRouter().navTo("PunchingDetails");
        }
    });
});