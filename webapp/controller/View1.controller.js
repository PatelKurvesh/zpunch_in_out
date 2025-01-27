sap.ui.define([
    "./App.controller",
    "sap/ndc/BarcodeScanner",
    "sap/m/MessageBox"
], (AppController,
    BarcodeScanner, MessageBox) => {
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
                        var empId = sText.split(":")[0];
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
                        var empId = sText.split(":")[0];
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
            oCelebrationImage.setSrc(sGifPath);


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
            if (!this._frag) {

                this._frag = sap.ui.xmlfragment("zpunchinout.fragments.LeaveRequest", this);
                this.getView().addDependent(this._frag);
                this._frag.open();
            } else {
                this._frag.open()
            }
        },



        onSendButtonPress: function (oEvent) {
            var oDate = sap.ui.getCore().byId("idDateRangeSelection").getValue();

            var oLeaveReq = {
                APPLIED_BY_EMP_ID: sap.ui.getCore().byId("idEmployeeInput").getValue(),
                FROM_DATE: oDate.split("-")[0].trim(),
                TO_DATE: oDate.split("-")[1].trim(),
                PRIORITY: sap.ui.getCore().byId("idLeavePrioritySelect").getSelectedKey(),
                TYPE: sap.ui.getCore().byId("idLeaveTypeSelect").getSelectedKey(),
                REASON: sap.ui.getCore().byId("idDescriptionTextArea").getValue()
            }
            var oModel = this.getOwnerComponent().getModel();
            oModel.create("/LeaveRequests", oLeaveReq, {
                success: function (odata) {
                    MessageBox.success("Leave Request Sended Successfully");
                }.bind(this),
                error: function (err) {
                    MessageBox.warning("You don't have that much available leave!!! ")
                }
            })
        },




    });
});