var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        Fees.calculateLateFee = function (daysLate) { return daysLate * 0.25; };
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    Utility.maxBooksAllowed = function (age) { return age < 12 ? 3 : 10; };
    var privateFunc = function () { return console.log('This is private function'); };
})(Utility || (Utility = {}));
