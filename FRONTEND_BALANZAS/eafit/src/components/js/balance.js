import axios from 'axios'
import { balance } from './globals'


var infobalance = {
    getinfobalance: function(info){
        return axios.post(balance + 'get-info-scale', info)
    }
}

export {infobalance}
