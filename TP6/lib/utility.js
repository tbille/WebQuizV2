
module.exports = {
    unique: function(list) {
        var result = [];
        for (i = 0; i < list.length; i++) {
            if (!result.inArray(list[i])) {
                result.push(list[i]);
            }
        }
        return result;
    }
}