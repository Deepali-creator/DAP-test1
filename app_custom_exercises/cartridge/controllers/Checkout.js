'use strict'

var server = require('server');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var Logger = require('dw/system/Logger');
 var LineItem = require('dw/order/LineItem');
server.extend(module.superModule);

server.get(
    'Beginn',
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function (req, res, next) {
        var BasketMgr = require('dw/order/BasketMgr');
        var Transaction = require('dw/system/Transaction');
        var AccountModel = require('*/cartridge/models/account');
        var OrderModel = require('*/cartridge/models/order');
        var URLUtils = require('dw/web/URLUtils');
        var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
        var Locale = require('dw/util/Locale');
        var collections = require('*/cartridge/scripts/util/collections');
        var validationHelpers = require('*/cartridge/scripts/helpers/basketValidationHelpers');

        var currentBasket = BasketMgr.getCurrentBasket();
        Logger.warn('currentBasket ' +currentBasket);
        var validatedProducts = validationHelpers.validateProducts(currentBasket);
        if (!currentBasket || validatedProducts.error) {
            res.redirect(URLUtils.url('Cart-Show'));
            return next();
        }
        
        var currentStage = req.querystring.stage ? req.querystring.stage : 'shipping';

        var billingAddress = currentBasket.billingAddress;

        var currentCustomer = req.currentCustomer.raw;
        var currentLocale = Locale.getLocale(req.locale.id);
        var preferredAddress;

        // only true if customer is registered
        if (req.currentCustomer.addressBook && req.currentCustomer.addressBook.preferredAddress) {
            var shipments = currentBasket.shipments;
            preferredAddress = req.currentCustomer.addressBook.preferredAddress;
            Logger.warn('shippments '+shipments);

            collections.forEach(shipments, function (shipment) {
                if (!shipment.shippingAddress) {
                    COHelpers.copyCustomerAddressToShipment(preferredAddress, shipment);
                }
            });

            if (!billingAddress) {
                COHelpers.copyCustomerAddressToBilling(preferredAddress);
            }
        }

        // Calculate the basket
        Transaction.wrap(function () {
            COHelpers.ensureNoEmptyShipments(req);
        });

        if (currentBasket.shipments.length <= 1) {
            req.session.privacyCache.set('usingMultiShipping', false);
        }

        if (currentBasket.currencyCode !== req.session.currency.currencyCode) {
            Transaction.wrap(function () {
                currentBasket.updateCurrency();
            });
        }

        COHelpers.recalculateBasket(currentBasket);

        var shippingForm = COHelpers.prepareShippingForm(currentBasket);
        var billingForm = COHelpers.prepareBillingForm(currentBasket);
        var usingMultiShipping = req.session.privacyCache.get('usingMultiShipping');

        if (preferredAddress) {
            shippingForm.copyFrom(preferredAddress);
            billingForm.copyFrom(preferredAddress);
        }

        // Loop through all shipments and make sure all are valid
        var allValid = COHelpers.ensureValidShipments(currentBasket);

        var orderModel = new OrderModel(
            currentBasket,
            {
                customer: currentCustomer,
                usingMultiShipping: usingMultiShipping,
                shippable: allValid,
                countryCode: currentLocale.country,
                containerView: 'basket'
            }
        );

      
       
        // Get rid of this from top-level ... should be part of OrderModel???
        var currentYear = new Date().getFullYear();
        var creditCardExpirationYears = [];

        for (var j = 0; j < 10; j++) {
            creditCardExpirationYears.push(currentYear + j);
        }

        var accountModel = new AccountModel(req.currentCustomer);

        var reportingURLs;
        reportingURLs = reportingUrlsHelper.getCheckoutReportingURLs(
            currentBasket.UUID,
            2,
            'Shipping'
        );

        res.render('abcd/defaultpage', {
            order: orderModel,
            customer: accountModel,
            forms: {
                shippingForm: shippingForm,
                billingForm: billingForm
            },
            expirationYears: creditCardExpirationYears,
            currentStage: currentStage,
            reportingURLs: reportingURLs
        });
         Logger.warn('orderModel' +orderModel.shipping.LineItem);
        return next();
    }
);

module.exports = server.exports();