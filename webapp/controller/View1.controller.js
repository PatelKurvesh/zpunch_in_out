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
                                this._showCelebrationGif("/image/punchin.gif");
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
                                this._showCelebrationGif("/image/punchout.gif");
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

        _showCelebrationGif: function (sGifPath) {
            var oVBox = this.byId("idpunchVBox");
            var oCelebrationImage = this.byId("idcelebrationImage");
            var oCelebrationVBox = this.byId("idcelebrationVBox");

            // Update the GIF source dynamically
            var oURI = new sap.ui.core.URI(sGifPath);
            oCelebrationImage.setSrc(oURI);
            

            // Hide the punch-in/out interface and show the celebration
            oVBox.setVisible(false);
            oCelebrationVBox.setVisible(true);

            // Set a timeout to revert back after 3-5 seconds
            setTimeout(function () {
                oVBox.setVisible(true);
                oCelebrationVBox.setVisible(false);
            }, 3000); // 3 seconds
        },



        onButtonPress: function (oEvent) {
            this.getRouter().navTo("PunchingDetails");
        },

        onLeaveRequestButtonPress: function (oEvent) {

        }
    });
});