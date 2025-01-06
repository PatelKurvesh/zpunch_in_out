sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ndc/BarcodeScanner"
], (Controller, BarcodeScanner) => {
    "use strict";

    return Controller.extend("zpunchinout.controller.View1", {
        onInit() {
        },

        onPunchInButtonPress : function(){
            BarcodeScanner.scan(
                function (result) {
                    if (result.cancelled) {
                        sap.m.MessageToast.show("Scanning cancelled.");
                    } else {
                        sap.m.MessageToast.show("Scanned Barcode: " + result.text);
                        // Handle the scanned result (e.g., send it to the backend or display it in the UI)
                        console.log("Scanned Result:", result.text);
                    }
                },
                function (error) {
                    sap.m.MessageToast.show("Scanning failed: " + error);
                    console.error("Barcode Scanning Error:", error);
                }
            );
        },
        onPunchOutButtonPress:function(){

        }
    });
});