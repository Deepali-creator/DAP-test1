'use strict';
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Order = require('dw/order/Order');
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var dwsystem = require('dw/system');
var Logger = require('dw/system/Logger');
var token;
var UUIDList = "";
var NameList = "";
var OrderStatus = "";
function placeSubscriptionOrder(temp) {
    Logger.warn('test');
    
    var d = Date.now();
    //var d1 = d.now();
    

   const today = new Date(d);
    var ordersList = []; 
    var orderList = OrderMgr.searchOrders("custom.CustomExported=null or custom.CustomExported='' and status =3 and confirmationStatus = 2 and creationDate = 2021-06-25",null);
    
    Transaction.wrap(function()
    {

        Logger.warn('test');
        Logger.warn('orderList '+orderList);
        while(orderList.hasNext())
       {
        var Order = orderList.next();
        Order.custom.CustomExported = "Exported";
         
         }

   });

   // return recurringOrderResult;
}
exports.placeSubscriptionOrder = placeSubscriptionOrder;


