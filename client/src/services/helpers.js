import { firebase } from "firebase-folder";
let helpers = {}

helpers.propTypeDependOnPropExist = (propDependency) => (props, propName, componentName) => {
    if (props[propDependency] && !props[propName])
        return new Error(`${propName} é obrigatório quando existir a propriedade ${propDependency} em ${componentName}`);
}

helpers.propTypeDependOnPropNoExist = (propDependency) => (props, propName, componentName) => {
    if (!props[propDependency] && !props[propName])
        return new Error(`${propName} é obrigatório quando não exitir a propriedade ${propDependency} em ${componentName}`);
}

helpers.newDate = (date = '', separador = '/', inverted) => {
    try {
        let arr = date.split(separador);
        if (arr.length < 3) {
            console.error('helpers.NewDate precisa receber uma data valida de acordo com o sepador exemplo helpers.NewDate("2010/01/01", "/", true) ou helpers.NewDate("01/01/2020", "/")');
            return new Date();
        }
        if (inverted)
            return new Date(arr[0], parseInt(arr[1]) - 1, arr[2]);
        return new Date(arr[2], parseInt(arr[1]) - 1, arr[0]);
    }
    catch (err) {
        console.error(err)
        return null
    }
}


helpers.brDate = date => {
    let d = new Date(1900, 0, 1);
    if (date === null || typeof date === 'string' || (typeof date === 'object' && date.getTime))
        d = new Date(date);

    return d.toLocaleDateString("pt-BR");
}

helpers.isoDate = date => {
    if (!typeof date === 'object' || !typeof date.getTime === 'function') {
        console.error('Necessário enviar formato de data, informado', date);
        return (new Date(1900, 0, 1)).toISOString().substr(0, 10);
    }
    return date.toISOString().substr(0, 10);
}

helpers.addDays = function (date = new Date(), days) {
    date.setDate(date.getDate() + days);
    return date;
}

helpers.adjustDateField = date => date && date.getTime ? date.toISOString().substr(0, 10) : date;

function manipulateJsonByNotationString(obj, is, value) {
    if (typeof is === 'string')
        return manipulateJsonByNotationString(obj, is.split('.'), value);
    else if (is.length === 1 && value !== undefined)
        return obj[is[0]] = value;
    else if (is.length === 0)
        return obj;
    else if (!obj)
        return undefined
    else
        return manipulateJsonByNotationString(obj[is[0]], is.slice(1), value);
}

helpers._get = (obj, string) => manipulateJsonByNotationString(obj, string)
helpers._set = (obj, string, value) => manipulateJsonByNotationString(obj, string, value)

helpers.maskedPhone = (phone) => {
    if (!phone || typeof(phone) !== "string" || phone.length < 8)
        return phone || '';
    let arr = phone.split("");
    let ddd = '';
    let last = arr.splice(arr.length - 4, arr.length)

    if (arr.length > 5) {
        ddd = `(${arr.splice(0, 2).join('')}) `;
    }

    return `${ddd}${arr.join('')}-${last.join('')}`;
}

helpers.maskedMoney = (text) => {
    if (!text || text === null) return "R$ 0,00";
    let num = (Math.round(text * 100) / 100).toFixed(2).split(".");
    num[0] = parseInt(num[0]).toLocaleString('pt-BR');
    return `R$ ${num.join(",")}`
}


helpers.convertInNumber = (field = 0) => {
    if (typeof field === 'string')
        return parseFloat(field);
    return field
}

helpers.validateSchema = (schema, props, setDefault, setTimeStamps = true) => {
    let newObject = {};
    let serverTime = firebase.serverTimestamp();
    let fullSchema = {
        deleted: { type: "boolean", default: false },
        createdBy: { type: "string", default: '' },
        ...schema
    };
    Object.keys(fullSchema).forEach(k => {
        if (props[k] !== undefined && props[k] !== null) {
            switch (fullSchema[k].type) {
                case 'number':
                    newObject[k] = helpers.convertInNumber(props[k]);
                    break;
                default:
                    newObject[k] = props[k];
            }
        }
        else if (setDefault) {
            newObject[k] = fullSchema[k].default
        }
    })
    
    newObject.updatedAt = serverTime;
    if (setTimeStamps) {
        if (props.createdAt !== undefined && props.createdAt !== null)
            newObject.createdAt = props.createdAt;
        else
            newObject.createdAt = serverTime;
    }

    return newObject;
}

helpers.convertFirebaseDateToDate = (field, def = new Date(1900, 0, 1)) => {
    if (!field)
        return def;
    if (typeof field.toDate === 'function')
        return field.toDate();
    if (field.seconds)
        return new Date(field.seconds * 1000)
    return def;
}

helpers.convertFromFirebaseDate = (seconds) => {
    return new Date(seconds * 1000);
}

helpers.sortByViewOrders = (data) => {
    if (!Array.isArray(data)) return data;
    return data.sort((a, b) => (a.viewOrder || 0) - (b.viewOrder || 0))
}

helpers.formatDecimal = (num, prc = 2) => {
    let pow = Math.pow(10, prc);
    return (Math.round(num * pow) / pow).toFixed(prc);
}

helpers.roundDecimal = (num, prc = 2) => {
    let pow = Math.pow(10, prc);
    return Math.round(num * pow) / pow
}

helpers.generateId = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

helpers.dateDiff = (d1, d2, type = 'days', resultInInt = true) => {
    const types = {
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24,
        months: 1000 * 60 * 60 * 24 * 30,
        years: 1000 * 60 * 60 * 24 * 30 * 365,
    }
    let diffTime = Math.abs(d2.getTime() - d1.getTime());
    let diffInType = diffTime / types[type];

    if (resultInInt) return Math.ceil(diffInType);
    return diffInType;
}

helpers.acronym = str => str.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');

helpers.copyTable = element => {
    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(element);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(element);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(element);
        range.select();
    }
    document.execCommand("copy");
}

helpers.tableToCSV = (separador = ";") => {
    let csv = [];
    let rows = document.querySelectorAll("table tr");
    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
        csv.push(row.join(separador));
    }
    return csv
}

helpers.downloadCsvFile = (csv, filename) => {
    let csvFile;
    let downloadLink;
    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });
    //Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
    // Remove link from DOM
    document.body.removeChild(downloadLink);
}

export default helpers;