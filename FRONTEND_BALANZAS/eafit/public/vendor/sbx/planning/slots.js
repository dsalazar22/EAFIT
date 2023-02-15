importScripts('./utils.js')

var resources = {}
var machine_codes = []
var machines = []
var slots = []
var modified_slots = []
var tree = {}
var loaded = false
var list_result = []
// var api_ip = "http ://10 .50 .0.134/planning"
// var api_ip = "http://10.1.1.11/planning"
// var api_ip = "http://10.1.1.10:3500/"
var api_ip = "http://127.0.0.1:3500/"
// var api_ip = "http://192.168.115.48:3500/"
// var api_ip = "http://"+self.location.hostname+"/planning"

self.onmessage = function (e) {
  var cmd = JSON.parse(e.data)
  var req = indexedDB.open('slots', 1);

  req.onsuccess = async function (e) {
    var db = e.target.result
    let ans
    switch (cmd.task) {
      case "approveProgram":
        ans = await consolidate(cmd)
        self.postMessage('{"ok":"consolidated","machines":' + JSON.stringify(ans) + '}')
        break
      case "initialize":
        ans = await initialize()
        self.postMessage('{"ok":"initialized","resources":' + JSON.stringify(resources) + ',"machine_codes":' + JSON.stringify(machine_codes) + '}')
        break
      case "list":
        //indexedDB.databases().then(function (data) {
        //})
        break
      case "delete":
        //indexedDB.deleteDatabase('slots')
        break
      case "getMachine":
        ans = getMachine(cmd.workstation_id)
        self.postMessage('{"ok":"machine","machine":' + JSON.stringify(ans) + '}')
        break
      case "getMachines":
        ans = getMachines()
        self.postMessage('{"ok":"machines","machines":' + JSON.stringify(ans) + '}')
        // db.transaction("machines").objectStore("machines").get(79).onsuccess = function (e) {
        //   self.postMessage('{"ok","result":' + JSON.stringify(e.target.result) + '}')
        // }
        break
      case "getOptimal":
        ans = await getOptimal(cmd)
        self.postMessage('{"ok":"optimal","tasks":' + JSON.stringify(ans) + '}')
        break
      case "mountProduct":
        ans = await mountProduct(cmd)
        self.postMessage('{"ok":"mounted","tasks":' + JSON.stringify(ans) + '}')
        break
      case "reserveSpace":
        ans = await reserveSpace(cmd)
        self.postMessage('{"ok":"reserved","result":' + JSON.stringify(ans) + '}')
        break
      case "storeMachines":
        var store = db.transaction("machines", "readwrite").objectStore("machines")
        storeMachines(store, cmd.machines)
        break
      default:
        self.postMessage('Unknown task')
    }
  }

  req.onupgradeneeded = function (e) {
    var db = e.target.result
    /*
      var store = db.createObjectStore("machines",{keyPath: "workstation_id"})
      store.createIndex("workstation_id","workstation_id", {unique: true})
      store.createIndex("workstation_type","workstation_type", {unique: false})
      store.createIndex("workstation_code","workstation_code", {unique: true})
      self.postMessage('successfully upgraded db');
    */
    // var store = db.createObjectStore("slots", { keyPath: "slot_id" })
    // store.createIndex("workstation_id", "workstation_id", { unique: false })
    // store.createIndex("production_order_id", "production_order_id", { unique: false })
    // store.createIndex("start_date", "start_date", { unique: false })
    // store.createIndex("minutes_to_deadline", "minutes_to_deadline", { unique: false })
    // self.postMessage('{"ok":"upgraded","result":"Database upgraded"}')
  }

  function storeMachines(store, obj) {
    obj.forEach(function (item) {
      var req = store.add(item)
      req.onsuccess = function (e) {
      }
    })
  }

  // db.transaction("slots").objectStore("slots").get(79).onsuccess = function (e){
  //   self.postMessage('{"ok","result":'+JSON.stringify(e.target.result)+'}')
  // }

  req.onerror = function (e) {
    self.postMessage('error', e);
  }

}

async function initialize() {
  // if (loaded) return true
  //const ans = await asyncText('GET', "resources01.json")
  // const ans = await asyncText('GET', api_ip + "getinforesources/resources-available")
  // loaded = true
  // try {
  //   resources = JSON.parse(ans)
  // } catch (error) {
  //   console.error(error, ans)
  //   return false
  // }

  // for (var plant in resources) {
  //   for (var group in resources[plant].groups) {
  //     for (var w in resources[plant].groups[group].workstations) {
  //       machine_codes[resources[plant].groups[group].workstations[w].workstation_id] = resources[plant].groups[group].workstations[w].code
  //       machines[[resources[plant].groups[group].workstations[w].workstation_id]] = {}
  //     }
  //   }
  // }
  /*
  ready = await asyncText('GET', "machines01.json")
  machines = JSON.parse(ready)
  ready = await asyncText('GET', "slots01.json")
  slots = JSON.parse(ready)
  //*/
  return true
}



async function getOptimal(options) {
  const ans = await asyncText('GET', api_ip + "getoptimal/" + options.production_order_id)

  try {
    tree = JSON.parse(ans)
  } catch (error) {
    console.error(error, ans)
    return []
  }

  tree.sort(function(a, b) {
    return a.ProductIndex - b.ProductIndex;
  });

  var list = []

  for(var i in tree){
    list.push([tree[i].Start, tree[i].OptimalMinute, tree[i].GanttStructureIndex[0].Gantt.p + ": " + tree[i].GanttStructureIndex[0].Gantt.Description, 'rgba(240,220,240,1)'])

    for(ix in tree[i].GanttStructureIndex){
      list.push([tree[i].GanttStructureIndex[ix].Gantt.start, tree[i].GanttStructureIndex[ix].Gantt.size, tree[i].GanttStructureIndex[ix].Gantt.a, 'rgba(200,220,250,1)'])
    }
  }

  return list
}

function machinesList(available) {
  var list = {}
  for (w in available) {
    list[available[w].workstation_id] = [w, machine_codes[available[w].workstation_id]]
  }
  return list
}

async function getOccupation(workstation_id, from) {
  
  return true
}

async function consolidate(options) {
  var res = []
  for (var s in modified_slots) {
    res.push(modified_slots[s])
  }
  
  var ans = await asyncText('POST', api_ip + "operationslots/" + options.order_id, res)
  var ans = await asyncText('POST', api_ip + "savemapplanning/" + options.order_id + "/" + list_result.partial, list_result)

  // if(ans == "OK")
  //   window.location.reload()

  return ans
}

function getMachines() {
  var res = {}
  for (var s in modified_slots) {
    res[slots[modified_slots[s]].workstation_id] = {}
  }
  for (var m in res) {
    res[m] = getMachine(m)
  }
  return res
}

function getMachine(id) {
  var res = {}
  for (var d in machines[id]) {
    res[d] = []
    for (var s in machines[id][d]) {
      res[d].push([
        parseInt(s),
        //slots[machines[id][d][s]].start_date,
        slots[machines[id][d][s]].minutes_programmed,
        slots[machines[id][d][s]].production_order_id
      ])
    }
  }
  return res
}

async function activateMachines(active) {
  if (!active) return 0
  for (var w in active) {
    var p = active[w][0].p
    var a = active[w][0].a
    if (p == 0) var item = tree
    else var item = tree.children(p)
    if (!item.activity_content[a].active_workstations) item.activity_content[a].active_workstations = []
    item.activity_content[a].active_workstations.push(active[w][1])
  }
  return 0
}

async function mountProduct(options) {
  var result = await asyncText('POST', api_ip + "mount/"+options.order_id, tree)

  let ans_result = JSON.parse(result)
  ans = ans_result["ResultSlots"]
  modified_slots =  ans_result["ModifiedSlots"]
  
  var list = []
  var valor_x = []
  var partial = false

  for (var i in ans) {
    list.push([ans[i].start, ans[i].size, ans[i].product_code + ": " + ans[i].description, 'rgba(240,220,240,1)'])
    for (var s in ans[i].slots){
      list.push([ans[i].slots[s].start_date, ans[i].slots[s].minutes_programmed, 
        ans[i].slots[s].activity_description +  ' ' + ans[i].slots[s].consecutive_order + " en " + ans[i].slots[s].workstation_code  , 'rgba(200,220,250,1)'])
        
        valor_x.push({
          order_production_process_id: ans[i].slots[s].order_production_process_id,
          workstation_id: ans[i].slots[s].workstation_id,
        })

        if(ans[i].slots[s].confirmed == false)
          partial = true
        //var start = parseInt(slots[ans.slots[s]].start_date.slice(11,13))*60
        //start += parseInt(slots[ans.slots[s]].start_date.slice(14,16))
        // self.postMessage('{"ok":"task","task":["' + ans[i].slots[s].start_date
        //   + '",' + ans[i].slots[s].minutes_programmed + ',"'
        //   + ans[i].slots[s].activity_description + ' '
        //   + ans[i].slots[s].production_order_id + " en " + ans[i].slots[s].workstation_id + '"]}')
      }
  }

  list_result = {
    index: valor_x,
    list: list,
    partial: partial
  }
  
  return list
}


async function reserveSpace(req) {

}

function allocateSlot(req, slot_start, workstation, day) {
}

function nextDay(base) {
  return new Date(base.addDays(1).toYMD() + "T00:00:00")
}

function min2date(base, minutes) {
  const day = base.substring(0, 11)
  const hr = Math.floor(minutes / 60)
  const mi = minutes - (hr * 60)
  return day + hr.pad(2) + ":" + mi.pad(2) + ":00"
}

function addMin(base, minutes) {
  var res = base.getTime()
  res += (minutes * 60000)
  return base.setTime(res)
}