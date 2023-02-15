// let host = '127.0.0.1:8080'
// let host = '10.50.0.134'
// let host = '10.1.1.11'
// let host = '192.168.25.51'

// let host = '10.0.0.23'


import { InfoConfig,protocolo } from './conn';

let host = InfoConfig.host()


///Colanta 16
///EAFIT 14
///FB 15

// let company_code = InfoConfig.company_code() // "15"
// "datacontroller": "http://192.168.115.130:1900/",
// "apicontroller": "http://192.168.115.130:2200/",
// "apiconnection": "http://192.168.115.130:1800/"

// let apiconnection = 'http://' + host + ':1800/'
// let apirealtime = 'http://' + host + ':2200/'

// let sysconfig = 'http://' + "127.0.0.1" + ':2900/'
// let master = 'http://' + "127.0.0.1" + ':3000/'
// let config = 'http://' + "127.0.0.1" + ':3100/'
// let production = 'http://'  + "127.0.0.1" +':3400/'
// let planning = 'http://' + "127.0.0.1" + ':3500/'

// let inventory = 'http://127.0.0.1:7200/'
// let traza = 'http://127.0.0.1:7300/'
// let mainten = 'http://127.0.0.1:7820/'
// let trade = 'http://127.0.0.1:3300/'


// let xrundb = 'http://127.0.0.1:2150/'
// let reports = 'http://127.0.0.1:2850'
// let notify = 'http://127.0.0.1:1700/'

// let costs = 'http://127.0.0.1:3900/'
// let demand = 'http://127.0.0.1:6300/'

let costs = protocolo+'://'+host+'/costs'
let wscosts = 'ws://'+host+':5000'
let sysconfig = protocolo+'://'+host+'/sysconfig'
let master = protocolo+'://'+host+'/master'
let config = protocolo+'://'+host+'/config'
let production = protocolo+'://'+host+'/production'
let planning = protocolo+'://'+host+'/planning'
let inventory = protocolo+'://'+host+'/apiinventory'
let traza =  protocolo+'://'+host+'/traza'
let mainten = protocolo+'://'+host+'/mainten'
let trade = protocolo+'://'+host+'/trade'
let pdfconn = protocolo+'://'+host+'/pdfconn'

let notify = protocolo+'://'+host+'/notify'


let xrundb = protocolo+'://'+host+'/apirundb'
let reports = protocolo+'://'+host+'/reports'

let apiconnection = protocolo+'://'+host+'/apiconnection'
let apirealtime = protocolo+'://'+host+'/apirealtime'
let time_series = protocolo+'://'+host+'/timeseries'
let users = protocolo+'://'+host+'/datacontroller'
let services = protocolo+'://'+host+'/services'
let embebbed = protocolo+'://'+host+'/embebbed'
let demand = protocolo+'://'+host+'/demand'


// let apiconnection = 'https://metricas.syncbox.cloud/apiconnection'
// let apirealtime = 'https://metricas.syncbox.cloud/apirealtime'
// let sysconfig = 'https://metricas.syncbox.cloud/sysconfig'
// let master = 'https://metricas.syncbox.cloud/master'
// let config = 'https://metricas.syncbox.cloud/config'
// let trade = 'https://metricas.syncbox.cloud/trade'
// let production = 'https://metricas.syncbox.cloud/production'
// let planning = 'https://metricas.syncbox.cloud/planning'

// let apiconnection = 'https://sw.syncbox.cloud/apiconnection'
// let apirealtime = 'https://sw.syncbox.cloud/apirealtime'
// let sysconfig = 'https://sw.syncbox.cloud/sysconfig'
// let master = 'https://sw.syncbox.cloud/master'
// let config = 'https://sw.syncbox.cloud/config'
// let trade = 'https://sw.syncbox.cloud/trade'
// let production = 'https://sw.syncbox.cloud/production'
// let planning = 'https://sw.syncbox.cloud/planning'
// let time_series = 'http://'+host+'/timeseries'

// let datacontroller = process.env.ROOT_API_CONTROLLER
// let apiconnection = process.env.ROOT_API_INSIDE
// let apicontroller = process.env.ROOT_API_REALTIME

export {
    costs, 
    wscosts,
    notify, 
    embebbed, 
    mainten,
    xrundb, 
    traza, 
    master, 
    config, 
    apirealtime, 
    apiconnection, 
    sysconfig, 
    trade, 
    production,
    planning,
    time_series,
    users, 
    services,
    reports, 
    inventory,
    pdfconn,
    demand}

