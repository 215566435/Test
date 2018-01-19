const data = require('./message.json');

const res = (pro = null, string = null) => {

    return { pro, string }
}

const str = {
    pro: function (string) {
        for (var key in data) {
            if (key === 'c') continue;
            const index = string.indexOf(key);

            if (index >= 0 && index < 5) {
                const len = key.length;
                return res(key, string.substring(len));
            }
        }
        return res(null, string);
    },
    city: function (province, string) {

        if (province === null) {
            for (var pros in data) {
                if (pros === 'c') continue;
                for (var cty in data[pros]) {
                    if (cty === 'c') continue;
                    var index = string.indexOf(cty);
                    if (index >= 0) {
                        const len = cty.length + index;
                        return {
                            ...res(cty, string.substring(len)),
                            province: pros
                        }
                    }
                }
            }
        }

        for (var key in data[province]) {
            if (key === 'c') continue;
            var index = string.indexOf(key);
            if (index >= 0) {
                const len = key.length + index;
                return res(key, string.substring(len));
            }
        }
        return res(null, string);
    },
    direct: function (province, city, string) {
        if (city === null) {
            city = '市辖区';
        }
        var area = data[province][city];
        if (area === void 666) {
            area = data[province]['自治区直辖县级行政区划']
        }

        for (var key in area) {
            if (key === 'c') continue;
            var index = string.indexOf(key);
            if (index >= 0) {
                const len = key.length + index;
                return res(key, string.substring(len));
            }
        }
        if (province === '重庆') {
            area = data[province]['县']
            if (area) {
                for (var key in area) {
                    if (key === 'c') continue;
                    var index = string.indexOf(key);
                    if (index >= 0) {
                        const len = key.length + index;
                        return res(key, string.substring(len));
                    }
                }
            }
        }

        for (var cty in data[province]) {
            if (cty === 'c') continue;
            for (var dir in data[province][cty]) {
                var index = string.indexOf(dir);
                if (index >= 0) {
                    const len = dir.length + index;
                    return {
                        city: cty,
                        ...res(dir, string.substring(len))
                    }
                }
            }
        }

        return res(null, string);
    }
}

exports.data = data;

exports.parseAddress = function parseAddress(string) {
    const addr = {};
    var leftString = '';

    try {
        const province = str.pro(string);

        addr.pro = province.pro;
        leftString = province.string;

        const city = str.city(province.pro, leftString);
        addr.city = city.pro;
        leftString = city.string;

        if (addr.pro === null) {
            addr.pro = city.province;
        }

        const area = str.direct(addr.pro, city.pro, leftString);
        addr.area = area.pro;
        if (area.city) {
            addr.city = area.city;
        }
    } catch (e) {

    }

    return addr;
}
