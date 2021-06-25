'use strict';

var server = require('server');
var OrderMgr = require('dw/order/OrderMgr');
var Logger = require('dw/system/Logger');
var Transaction = require('dw/system/Transaction');
var job = require( 'dw/job' );



function update()
{
 
    
//var orderList = OrderMgr.queryOrders("custom.Status = '' or custom.Status = NULL",null,OrderMgr);
Logger.warn('kkk');
// Transaction.wrap(function()
//     {4

    
//         while(orderList.hasNext())
//         {
//             var Order = orderList.next();
//             Order.custom.Status = "Exported";
         
//         }

//     });


}

module.exports.update = update;
