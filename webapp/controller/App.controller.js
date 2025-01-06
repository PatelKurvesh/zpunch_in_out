sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("zpunchinout.controller.App", {
    onInit() {
    },
    getModel: function (sName) {
      return sName === "" ? this.getOwnerComponent().getModel() : this.getOwnerComponent().getModel(sName);
    },
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },
  });
});