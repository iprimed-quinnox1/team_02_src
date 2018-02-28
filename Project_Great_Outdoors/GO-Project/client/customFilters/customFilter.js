app.filter("myFormat", function () {
    return function (x) {
        var temp = JSON.parse(x);
        var text = temp.Name + " " + temp.PhoneNumber + " " + temp.Address + " " + temp.City + " " + temp.State;
        return text;
    }
});