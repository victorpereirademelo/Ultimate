angular.module("fornecedores").filter("ellipsis", function () {
    return function (value, size) {
        if (value.length <= size) {
            return value;
        }
        const output = value.substring(0, size) + "...";
        return output;
    };
});