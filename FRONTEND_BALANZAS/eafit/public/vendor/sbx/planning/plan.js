/*!
 * plan.js
 *
 * Copyright © 2019 Jorge M. Peláez
 * http://j-pel.github.io/dynamize
 *
 * UNDER DEVELOPMENT:
 * Not recommended for production
 *
 */

/*!
 * planning.getTree(item)
 * Gets a recursive hyerarchical tree for a generic product
 * description. Item is the internal code of the design.
 *
 * @api public
 * 
 * planning.priorize(tree,start)
 * Starts walking the tree recursively considering start as
 * the baseline date.
 *
 * @param {start} date as string formatted as "yyyy-mm-dd"
 * 
 */


(function(exports){

  var log = function(msg) {}

  var plan = {}
  var machine_codes = []
  var loaded = ""
  var viewport
  var float
  var g1
  var product_colors = {}

  var slotDB = new Worker('/vendor/sbx/planning/slots.js')

  slotDB.postMessage(`{"task":"initialize"}`)

  /* Public API calls */

  var display = exports.display = function (obj1,obj2,product) {
    viewport = obj1
    float = obj2
    viewport.innerHTML = ""
    viewport.ondblclick = function (e) {
      mount(this,product)
    }
    g1 = Gantting(viewport)
    if (loaded != product) {
      slotDB.postMessage(`{
        "task":"getOptimal",
        "production_order_id":"`+ product + `"
      }`)
    }
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  var mount = exports.mount = function (obj, order_id) {
    viewport = obj
    viewport.innerHTML = ""
    viewport.ondblclick = function (e) {
      plant(this)
    }
    g1 = Gantting(viewport)
    slotDB.postMessage(`{
      "task":"mountProduct",
      "base":"${formatDate(new Date())}T00:00:00",
      "order_id":${order_id}
    }`)
  }

  var plant = exports.plant = function (obj) {
    viewport = obj
    viewport.ondblclick = function (e) {
      console.log
      program(this)
    }
    viewport.innerHTML = ""
    drawPlant(viewport)
  }

  var program = exports.program = function (obj, order_id) {
    viewport = obj
    viewport.innerHTML = ""
    slotDB.postMessage(`{
      "task":"approveProgram",
      "order_id":${order_id}
    }`)
  }

  var machine = exports.machine = function(id,top,left){
    //float = document.getElementById("selectionInfo")
    float.style.top = top+"px"
    float.style.left = left+"px"
    //showMachine(float,{})
    slotDB.postMessage('{"task":"getMachine","workstation_id":"'+id+'"}')
  }

  /* Private helpers */

  slotDB.onmessage = function (evt) {
    var response = JSON.parse(evt.data)
    if (response.ok) {
      switch (response.ok) {
        case "initialized":
          resources = response.resources
          machine_codes = response.machine_codes
          break
        case "consolidated":
          drawMachines(viewport)
          break
        case "machine":
          showMachine(float, response.machine)
          break
        case "machines":
          prepareScene(viewport, response.machines)
          break
        case "mounted":
          viewport.innerHTML = ""
          g1 = Gantting(viewport)
          drawTasks(response.tasks, false)
          break
        case "task":
          response.task[0] = new Date(response.task[0])
          g1.addTask.apply(false, response.task)
          g1.paint()
          break
        case "optimal":
          drawTasks(response.tasks, true)
          break
        case "product_tree":
          plan.tree = response.result
          loaded = plan.tree.production_order_id
          mount()
          //          drawIdeal(viewport)
          break
        default:
          console.log(response)
      }
    }
  }

  function myLog(msg) {
    document.getElementById("workspace").innerHTML += msg
  }

  function drawPlant(viewport) {
    var float = document.createElement("div")
    float.classList.add("float")
    float.id = "selectionInfo"
    require("/static/three/three.js").then(function (data) {
      require("/static/three/DragControls.js").then(function (data) {
        require("/static/three/TrackballControls.js").then(function (data) {
          slotDB.postMessage(`{
            "task":"getMachines"
          }`)
        })
      })
    })
  }

  function prepareScene(viewport, machines) {
    var camera, controls, scene, renderer, font;
    var objects = [];
    var loader = new THREE.FontLoader();
    //if (!plan.tree.required_activities) var orders = priorize(plan.tree,"2019-06-27T00:00:00")
    //program(plan.tree,plan.machines)
    loader.load('/static/three/helvetiker_regular.typeface.json', function (f) {
      font = f
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
      camera.position.x = 256; //256
      camera.position.y = 134; //134
      camera.position.z = 236; //236
      controls = new THREE.TrackballControls(camera);
      controls.rotateSpeed = 2.0;
      controls.zoomSpeed = 2.0;
      controls.panSpeed = 1.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.3;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      scene.add(new THREE.AmbientLight(0x505050));
      var light = new THREE.SpotLight(0xffffff, 1.5);
      light.position.set(-400, 500, -400);
      light.angle = Math.PI / 4;
      light.castShadow = true;
      light.shadow.camera.near = 1000;
      light.shadow.camera.far = 2000;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      scene.add(light);
      var light = new THREE.SpotLight(0xffffff, 1.5);
      light.position.set(400, 500, 400);
      scene.add(light);

      //machinesArray(machines)
      machinesCircle(machines)


      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      viewport.appendChild(renderer.domElement);
      //*
      var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
      dragControls.addEventListener('dragstart', function () {
        controls.enabled = false;
      });
      dragControls.addEventListener('dragend', function () {
        controls.enabled = true;
      });
      //*/
      window.addEventListener('resize', onWindowResize, false);

      animate();

    }); //end load function
    //
    function animate() {
      requestAnimationFrame(animate);
      render();
    }
    function render() {
      controls.update();
      renderer.render(scene, camera);
    }
    function onWindowResize() {
      console.log("resizing")
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function formatHours(hour) {
      var hh = Math.trunc(hour)
      var mm = Math.ceil(60 * (hour - hh))
      return (hh.pad(2) + ":" + mm.pad(2))
    }

    function paintMachine(m, machine) {
      var xMid, text;
      var color = 0x004477;
      var matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });
      var matUnavailable = new THREE.MeshLambertMaterial({
        color: 0xc0c0c0,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      var group = new THREE.Group()
      var ws = machine_codes[m]
      if (!ws) ws = "Maq(" + m + ")"
      //var message = m + ". " + ws;
      var message = ws;
      var shapes = font.generateShapes(message, 8);
      var geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();
      xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);
      // make shape ( N.B. edge view not visible )
      text = new THREE.Mesh(geometry, matLite);
      text.position.x = 15
      text.position.y = -2
      text.rotation.y = 1.57
      text.position.z = 0;
      group.add(text);
      var d = 0
      for (var day in machine) {
        if (machine[day].length < 1) newBlock(0, 24 * 60, d, matUnavailable)
        else {
          var mins = 0
          if (machine[day][0][0] > 0) newBlock(0, machine[day][0][0], d, matUnavailable)
          for (var slot in machine[day]) {
            if (machine[day][slot][2] != 0) {
              if (!product_colors[machine[day][slot][2]]) product_colors[machine[day][slot][2]] = Math.floor(Math.random() * 0xffffff)
              var slotbox = newBlock(machine[day][slot][0], machine[day][slot][1], d, new THREE.MeshLambertMaterial({ color: product_colors[machine[day][slot][2]] }))
              slotbox.userData = {
                workstation_id:m,
                production_order_id:machine[day][slot][2],
                start:machine[day][slot][0],
                size:machine[day][slot][1]
              }
            }
            var mins = machine[day][slot][0] + machine[day][slot][1]
          }
        }
        if (mins < 1440) newBlock(mins, (1440 - mins), d, matUnavailable)
        d++
      }
      return (group)

      function newBlock(start, size, day, type) {
        var geometry = new THREE.BoxBufferGeometry(10, 6, size / 20);
        var object = new THREE.Mesh(geometry, type);
        object.position.x = 0;
        object.position.y = 7 * day;
        object.position.z = (start + size / 2) / 20 - 36
        object.castShadow = true;
        object.receiveShadow = true;
        group.add(object)
        objects.push(object);
        return object
      }

    }

    function machinesArray(list) {
      var gridHelper = new THREE.GridHelper(600, 60, 0xc0c0ff, 0xc0c0c0);
      gridHelper.position.y = -5;
      gridHelper.position.x = 0;
      scene.add(gridHelper);
      var col = -240
      var row = -240
      var i = 0
      for (var m in list) {
        var obj = paintMachine(m, list[m])
        obj.position.x = col
        obj.position.z = row
        scene.add(obj)
        col += 40
        if (col >= 260) {
          col = -240
          row += 100
        }
        i++
      }
    }

    function machinesCircle(list) {
      var gridHelper = new THREE.GridHelper(600, 60, 0xc0c0ff, 0xc0c0c0);
      gridHelper.position.y = -5;
      gridHelper.position.x = 0;
      scene.add(gridHelper);

      var pos = [1, 0.97, 0.86, 0.7, 0.5, 0.26, 0]
      var center = []
      var radius = 280
      var angle = 0
      for (i = 0; i < 7; i++) {
        center.push({ x: -pos[i], y: -pos[6 - i] })
      }
      for (i = 1; i < 7; i++) {
        center.push({ x: pos[6 - i], y: -pos[i] })
      }
      for (i = 0; i < 7; i++) {
        center.push({ x: pos[i], y: pos[6 - i] })
      }
      for (i = 1; i < 7; i++) {
        center.push({ x: -pos[6 - i], y: pos[i] })
      }
      var i = 0
      for (var m in list) {
        var obj = paintMachine(m, list[m])
        obj.position.x = center[i].x * radius
        obj.rotation.y = angle
        obj.position.z = center[i].y * radius
        scene.add(obj)
        i++
        angle -= Math.PI / 13
        radius -= 2
        if (i > 24) {
          i = 0
        }
      }
    }
  }

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  async function drawTasks(tasks, movable) {
    for (var t in tasks) {
      g1.addTask.apply(null, tasks[t])
    }
    g1.paint()
    if (movable) g1.initMove(function (data) {
       //console.log(data) 
    })
    else g1.initFix()
    return 0
  }

  function showMachine(float,machine) {
    var scale = 0.3
    //machine = JSON.parse('{"2019-07-29":[[360,252,0],[612,252,89941],[864,48,89939],[912,408,0]],"2019-07-30":[[360,960,0]],"2019-07-31":[[360,624,0],[984,168,89939],[1152,168,0]],"2019-08-01":[[360,780,0],[1140,72,89940],[1212,108,0]],"2019-08-02":[[360,960,0]],"2019-08-03":[[360,960,0]],"2019-08-04":[]}')
    float.innerHTML = '<div class="title" onclick=\'this.offsetParent.style.display="none"\'>Máquina </div>'
    float.style.width = "540px"
    float.style.height = "160px"
    for (var h = 0;h<25;h+=6) {
      var span = document.createElement("span")
      span.appendChild(document.createTextNode(h+":00"))
      span.classList.add("slot")
      span.classList.add("hour")
      float.appendChild(span)
      span.style.height = "16px"
      span.style.width = (scale*360-16) + "px"
    }
    float.appendChild(document.createElement("br"))
    var row = 26
    var days = Object.keys(machine).sort()
    for (var d in days) {
      var elapsed = 0
      var span = document.createElement("span")
      span.appendChild(document.createTextNode(days[d]))
      span.classList.add("slot")
      float.appendChild(span)
      span.style.height = "16px"
      span.style.width = "76px"
      row += 16
      if (!machine[days[d]][0]) {
        var span = document.createElement("span")
        span.classList.add("slot")
        span.classList.add("inactive")
        span.style.width = scale*1440+"px"
        span.style.height = "16px"
        float.appendChild(span)
      } else {
        if (machine[days[d]][0] && machine[days[d]][0][0]>0) {
          var span = document.createElement("span")
          span.classList.add("slot")
          span.classList.add("inactive")
          span.style.width = scale*machine[days[d]][0][0]+"px"
          span.style.height = "16px"
          float.appendChild(span)
          elapsed += machine[days[d]][0][0]
        }
        for (var s in machine[days[d]]){
          var span = document.createElement("span")
          span.classList.add("slot")
          //span.style.top = row+"px"
          //span.style.left = scale*machine[days[d]][s][0]+"px"
          span.style.width = scale*machine[days[d]][s][1]+"px"
          span.style.height = "16px"
          var text = machine[days[d]][s][2]
          if (text==0) span.classList.add("empty")
          else {
            span.classList.add("programmed")
            span.appendChild(document.createTextNode(text))
          } 
          float.appendChild(span)
          elapsed += machine[days[d]][s][1]
        }
        if (elapsed<1440) {
          var span = document.createElement("span")
          span.classList.add("slot")
          span.classList.add("inactive")
          span.style.width = scale*(1440-elapsed)+"px"
          span.style.height = "16px"
          float.appendChild(span)
        }
      }
      float.appendChild(document.createElement("br"))
    }
    float.style.display = "block"
  }

  function drawMachines(viewport, machines) {
    // var scale = 0.4
    // var selectedMachine = 0
    // var sel = document.createElement("select")
    // viewport.appendChild(sel)
    // var tbl = document.createElement("div")
    // viewport.appendChild(tbl)
    // sel.onchange = function (evt) {
    //   onMachineChange(evt.target.value)
    // }
    // for (var m in machines) {
    //   var opt = document.createElement("option")
    //   sel.appendChild(opt)
    //   opt.appendChild(document.createTextNode(m))
    //   opt.value = m
    //   if (selectedMachine == m) opt.selected = true
    // }
    // onMachineChange(selectedMachine)

    // function onMachineChange(code) {
    //   tbl.innerHTML = ""
    //   var line = document.createElement("div")
    //   line.appendChild(document.createTextNode("MÁQUINA " + code))
    //   tbl.appendChild(line)
    //   drawMachine(plan.machines[code])
    // }

    // function drawMachine(slots) {
    //   for (var s in slots) {
    //     var line = document.createElement("div")
    //     tbl.appendChild(document.createElement("br"))
    //     line.appendChild(document.createTextNode(s))
    //     line.classList.add("date")
    //     tbl.appendChild(line)
    //     var cursor = 0
    //     for (var sm in slots[s]) {
    //       if (cursor < sm) {
    //         var slot = document.createElement("div")
    //         var size = (sm - cursor)
    //         tbl.appendChild(slot)
    //         slot.classList.add("slot")
    //         slot.classList.add("inactive")
    //         slot.style.width = scale * size + "px"
    //         //slot.appendChild(document.createTextNode(size))
    //         slot.appendChild(document.createTextNode("·"))
    //         cursor += size
    //       }
    //       var slot = document.createElement("div")
    //       var size = slots[s][sm].minutes_programmed
    //       tbl.appendChild(slot)
    //       slot.classList.add("slot")
    //       slot.style.width = scale * size + "px"
    //       if (size < 0) {
    //         slot.classList.add("error")
    //         size = -size
    //       }
    //       if (slots[s][sm].production_order_id != 0) {
    //         slot.classList.add("programmed")
    //         //slot.appendChild(document.createTextNode(size))
    //         slot.appendChild(document.createTextNode("·"))
    //         slot.appendChild(document.createTextNode(slots[s][sm].activity_description))
    //         slot.appendChild(document.createTextNode("(" + slots[s][sm].production_order_id + ")"))
    //         slot.title = slots[s][sm].activity_description + " (" + slots[s][sm].production_order_id + ")"
    //       } else {
    //         slot.classList.add("empty")
    //         slot.appendChild(document.createTextNode("·"))
    //         //slot.appendChild(document.createTextNode(size))
    //       }
    //       cursor += size
    //     }
    //     if (cursor < 1440) {
    //       var slot = document.createElement("div")
    //       var size = (1440 - cursor)
    //       tbl.appendChild(slot)
    //       slot.classList.add("slot")
    //       slot.classList.add("inactive")
    //       slot.style.width = scale * size + "px"
    //       slot.appendChild(document.createTextNode("·"))
    //       //slot.appendChild(document.createTextNode(size))
    //       cursor += size
    //     }
    //   }
    // }
  }

})(typeof exports === 'undefined' ? this['planning'] = {} : exports)

function onBoxSelected(obj) {
  if (!obj.workstation_id) return 0

  var float = document.getElementById("selectionInfo")
  float.innerHTML = ""
  //float.style.borderColor=obj.color.toString(16)
  //var endTime = obj.start+(obj.size/60)

  float.appendChild(document.createTextNode("Orden: " + obj.production_order_id))
  float.appendChild(document.createElement("br"))
  float.appendChild(document.createTextNode("Producto: " + obj.production_order_id))
  float.appendChild(document.createElement("br"))
  float.appendChild(document.createTextNode("Actividad: " + obj.activity_description))
  float.appendChild(document.createElement("br"))
  float.appendChild(document.createTextNode("De: " + (obj.start_date)))
  //float.appendChild(document.createTextNode(" a: "+formatHours(endTime)))
  float.appendChild(document.createElement("br"))
  float.appendChild(document.createTextNode("Duración: " + obj.minutes_programmed + " min"))
  float.style.display = "block"
}

function onTaskSelected(e,obj) {
  //var info = obj.userData.split(" en ")
  var workstation_id = obj.userData
  if (workstation_id>0) planning.machine(workstation_id,e.y,e.x)
}