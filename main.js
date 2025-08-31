// initialize main variables
let shownLayers = 1;
const pageContainer = document.getElementById("page-container");
const grayContainer = document.getElementById("gray-container");
const grayElements = grayContainer.querySelectorAll(".z");
const logo = document.getElementById("logo")

// initialize Leaflet map and its elements
const map = L.map('map', {zoomControl: false}).setView([14.199962369320243, 120.88165030538508], 17);

const mLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: 17,
                maxZoom: 20,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                })

var mLayerTwo = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 22,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var darkMode = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

const white = L.maptilerLayer({
            apiKey: 'eCwvi5eqVtXNab5U5pNc',
            style: L.MaptilerStyle.DATAVIZ.LIGHT,
        })

mLayer.addTo(map)


const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
    });

let mapElements = [];

// define coordinates
const walkingNodes = {
    admin: [14.198965, 120.880841],
    agriEco: [14.201036, 120.882830],
    ansci: [14.202856, 120.881910],
    biosci: [14.200502, 120.882231],
    cafenr: [14.199138, 120.882668],
    cafsev: [14.199521, 120.882397],
    cashier: [14.198816, 120.881105],
    cas: [14.199856, 120.881997],
    cdc: [14.199087, 120.880100],
    ccj: [14.198036, 120.879907],
    ced: [14.198828, 120.880287],
    ceit: [14.199442, 120.880655],
    chapel: [14.198582, 120.879643],
    con: [14.200631, 120.881803],
    cspear: [14.197177, 120.882328],
    cthm: [14.198547, 120.880336],
    cvmbs: [14.202774, 120.881579],
    dcee: [14.200207, 120.879949],
    diet: [14.199815, 120.880375],
    dit: [14.199548, 120.880424],
    gate1: [14.196488, 120.881001],
    gate2: [14.199015, 120.879813],
    gate3: [14.196344, 120.882222],
    grandstand: [14.197752, 120.880970],
    gym: [14.197177, 120.882328],
    hostel: [14.200927, 120.882589],
    icc: [14.201518, 120.881886],
    ih1: [14.200087, 120.882618],
    ih2: [14.196516, 120.881663],
    infirmary: [14.197581, 120.880070],
    landbank: [14.198965, 120.880841],
    library: [14.199521, 120.882397],
    lshs: [14.197518, 120.880651],
    men: [14.196676, 120.882660],
    ncrdec: [14.197574, 120.883468],
    newCemds: [14.199221, 120.882865],
    oldCemds: [14.199977, 120.881368],
    osas: [14.197650, 120.882231],
    physci: [14.200181, 120.881552],
    quad: [14.198353, 120.880295],
    resCenter: [14.199626, 120.882696],
    rolle: [14.201350, 120.881706],
    saka: [14.205139, 120.880999],
    saluysoy: [14.201488, 120.882264],
    shs: [14.197902, 120.880705],
    sprint: [14.198790, 120.882071],
    tdf: [14.198581, 120.885829],
    umall: [14.196090, 120.882309],
    women: [14.196774, 120.883061],
    n1: [14.196310, 120.880413],
    n2: [14.196323, 120.880476],
    n3: [14.196404, 120.880963],
    n4: [14.196604, 120.881052],
    n5: [14.196629, 120.881135],
    n6: [14.196601, 120.881154],
    n7: [14.196592, 120.881191],
    n8: [14.197495, 120.880901],
    n9: [14.197560, 120.880793],
    n10: [14.197527, 120.881028],
    n11: [14.197930, 120.880785],
    n12: [14.197999, 120.880766],
    n13: [14.198031, 120.880899],
    n14: [14.198470, 120.880642],
    n15: [14.198397, 120.880379],
    n16: [14.198578, 120.880608],
    n17: [14.198707, 120.881102],
    n18: [14.198739, 120.881163],
    n19: [14.198764, 120.881270],
    n20: [14.198909, 120.881179],
    n21: [14.198761, 120.881402],
    n22: [14.198740, 120.881505],
    n23: [14.198690, 120.881617],
    n24: [14.198543, 120.881766],
    n25: [14.198009, 120.882042],
    n26: [14.197595, 120.882149],
    n27: [14.197163, 120.882252],
    n28: [14.196865, 120.882317],
    n29: [14.196757, 120.882341],
    n30: [14.196603, 120.882164],
    n31: [14.196692, 120.881607],
    n32: [14.197012, 120.882982],
    n33: [14.197043, 120.883110],
    n34: [14.197102, 120.883226],
    n35: [14.197374, 120.883406],
    n36: [14.197505, 120.883458],
    n37: [14.198034, 120.883267],
    n38: [14.198341, 120.884346],
    n39: [14.198377, 120.884783],
    n40: [14.198905, 120.882863],
    n41: [14.198632, 120.882380],
    n42: [14.199168, 120.882729],
    n43: [14.199579, 120.882547],
    n44: [14.199794, 120.882452],
    n45: [14.199755, 120.882369],
    n46: [14.199942, 120.882421],
    n47: [14.199847, 120.882319],
    n48: [14.199737, 120.882054],
    n49: [14.199874, 120.882221],
    n50: [14.199994, 120.882295],
    n51: [14.200139, 120.882351],
    n52: [14.200272, 120.882359],
    n53: [14.200517, 120.882293],
    n54: [14.200838, 120.882190],
    n55: [14.200939, 120.882284],
    n56: [14.201005, 120.882560],
    n57: [14.201252, 120.882206],
    n58: [14.201413, 120.882264],
    n59: [14.201460, 120.882186],
    n60: [14.201424, 120.882076],
    n61: [14.201548, 120.882038],
    n62: [14.201914, 120.882086],
    n63: [14.202833, 120.881725],
    n64: [14.200740, 120.881776],
    n65: [14.200612, 120.881273],
    n66: [14.200214, 120.881369],
    n67: [14.199998, 120.881421],
    n68: [14.199510, 120.881529],
    n69: [14.199401, 120.881618],
    n70: [14.199379, 120.881255],
    n71: [14.199323, 120.881020],
    n72: [14.199300, 120.880919],
    n73: [14.199405, 120.880808],
    n74: [14.199210, 120.881058],
    n75: [14.199141, 120.880809],
    n76: [14.198995, 120.880661],
    n77: [14.198824, 120.880533],
    n78: [14.198744, 120.880458],
    n79: [14.198712, 120.880317],
    n80: [14.198695, 120.880205],
    n81: [14.198868, 120.880160],
    n82: [14.199033, 120.880113],
    n83: [14.199094, 120.880368],
    n84: [14.199109, 120.880454],
    n85: [14.199179, 120.880449],
    n86: [14.199344, 120.880512],
    n87: [14.199533, 120.880364],
    n88: [14.199792, 120.880301],
    n89: [14.200341, 120.880173],
    n90: [14.199401, 120.880296],
    n91: [14.199149, 120.880358],
    n92: [14.198962, 120.879814],
    n93: [14.198946, 120.879758],
    n94: [14.198925, 120.879671],
    n95: [14.198603, 120.879739],
    n96: [14.197869, 120.879977],
    n97: [14.197881, 120.880042],
    n98: [14.197594, 120.880113],
    n99: [14.197398, 120.880159],
    n00: [14.197414, 120.880218]
};

const drivingNodes = {
    admin: [14.198895, 120.881006],
    agriEco: [14.201036, 120.882830],
    ansci: [14.202901, 120.882016],
    biosci: [14.200460, 120.882151],
    cafenr: [14.199113, 120.882564],
    cafsev: [14.199544, 120.882293],
    cashier: [14.198895, 120.881006],
    cas: [14.199955, 120.881974],
    cdc: [14.199307, 120.880050],
    ccj: [14.198013, 120.879820],
    ced: [14.198871, 120.880364],
    ceit: [14.199498, 120.880646],
    chapel: [14.198551, 120.879501],
    con: [14.200527, 120.881832],
    cspear: [14.197251, 120.882554],
    cthm: [14.198565, 120.880398],
    cvmbs: [14.202774, 120.881579],
    dcee: [14.200179, 120.879855],
    diet: [14.200044, 120.880402],
    dit: [14.199638, 120.880608],
    gate1: [14.196501, 120.881045],
    gate2: [14.198992, 120.879820],
    gate3: [14.196344, 120.882222],
    grandstand: [14.197758, 120.880886],
    gym: [14.197251, 120.882554],
    hostel: [14.200787, 120.882634],
    icc: [14.201747, 120.881831],
    ih1: [14.200127, 120.882739],
    ih2: [14.196409, 120.881736],
    infirmary: [14.197553, 120.879974],
    landbank: [14.198895, 120.881006],
    library: [14.199439, 120.882330],
    lshs: [14.197485, 120.880545],
    men: [14.196597, 120.882731],
    ncrdec: [14.197471, 120.883761],
    newCemds: [14.199256, 120.882945],
    oldCemds: [14.199974, 120.881289],
    osas: [14.197748, 120.882294],
    physci: [14.200260, 120.881620],
    quad: [14.198263, 120.880330],
    resCenter: [14.199691, 120.882758],
    rolle: [14.201258, 120.881616],
    saka: [14.205139, 120.880999],
    saluysoy: [14.201515, 120.882401],
    shs: [14.197856, 120.880524],
    sprint: [14.198790, 120.882071],
    tdf: [14.198607, 120.886005],
    umall: [14.196091, 120.882317],
    women: [14.196743, 120.883419],
    n1: [14.196373, 120.880989],
    n2: [14.196558, 120.881096],
    n3: [14.196514, 120.881165],
    n4: [14.196540, 120.881205],
    n5: [14.196574, 120.881347],
    n6: [14.196779, 120.882284],
    n7: [14.197405, 120.882143],
    n8: [14.196949, 120.882996],
    n9: [14.196997, 120.883180],
    n10: [14.197047, 120.883259],
    n11: [14.197107, 120.883309],
    n12: [14.197385, 120.883476],
    n13: [14.197494, 120.883527],
    n14: [14.197554, 120.883526],
    n15: [14.198027, 120.883320],
    n16: [14.198347, 120.884353],
    n17: [14.198378, 120.884785],
    n18: [14.198926, 120.882907],
    n19: [14.199338, 120.882740],
    n20: [14.199571, 120.882639],
    n21: [14.199860, 120.882574],
    n22: [14.199800, 120.882351],
    n23: [14.199702, 120.882123],
    n24: [14.199847, 120.882250],
    n25: [14.199972, 120.882330],
    n26: [14.199974, 120.882521],
    n27: [14.200195, 120.882418],
    n28: [14.200478, 120.882346],
    n29: [14.200910, 120.882225],
    n30: [14.200992, 120.882564],
    n31: [14.200974, 120.882231],
    n32: [14.201271, 120.882148],
    n33: [14.201424, 120.882082],
    n34: [14.201425, 120.882219],
    n35: [14.201502, 120.882218],
    n36: [14.201815, 120.882151],
    n37: [14.202829, 120.881770],
    n38: [14.198346, 120.884355],
    n39: [14.200791, 120.881774],
    n40: [14.200660, 120.881258],
    n41: [14.200240, 120.881361],
    n42: [14.199467, 120.881539],
    n43: [14.199338, 120.881266],
    n44: [14.199161, 120.880500],
    n45: [14.200375, 120.880114],
    n46: [14.199796, 120.880239],
    n47: [14.199531, 120.880300],
    n48: [14.199137, 120.880390],
    n49: [14.199062, 120.880416],
    n50: [14.199001, 120.880627],
    n51: [14.198440, 120.880584],
    n52: [14.198388, 120.880306],
    n53: [14.197912, 120.880735],
    n54: [14.197478, 120.880854],
    n55: [14.196628, 120.881089],
    n56: [14.199065, 120.880109],
    n57: [14.198813, 120.880183],
    n58: [14.198975, 120.879772],
    n59: [14.198947, 120.879664],
    n60: [14.198602, 120.879737],
    n61: [14.198547, 120.879889],
    n62: [14.197986, 120.880039],
    n63: [14.197599, 120.880140],
    n64: [14.196265, 120.880449],
    n65: [14.195891, 120.880508],
    n66: [14.195758, 120.880613],
    n67: [14.195686, 120.880804],
    n68: [14.195617, 120.881927],
    n69: [14.195804, 120.881915],
    n70: [14.195896, 120.882341],
    n71: [14.196704, 120.881947],   
    n72: [14.199252, 120.880891],
    n73: [14.196501, 120.881045],
    n74: [14.198992, 120.879820],
    n75: [14.198580, 120.885827],
};

// define graphs for Dijkstra
const walkingGraph = {
    admin: {n77: 36.717, n76: 19.688, n75: 19.872, landbank: 0},
    agriEco: {n56: 29.309},
    ansci: {n63: 20.106},
    biosci: {n53: 6.888},
    cafenr: {n42: 7.373, library: 51.644, cafsev: 51.644, n45: 75.801},
    cafsev: {n43: 17.408, n44: 30.93, n45: 26.194}, //cafenr: 51.644, 
    cashier: {n18: 10.602},
    cas: {n48: 14.589},
    cdc: {n82: 6.166, n91: 28.654, gate2: 31.957},
    ccj: {n95: 65.597, n96: 20.044},
    ced: {n79: 13.298, n80: 17.229, n81: 14.395},
    ceit: {n73: 16.998, n86: 18.878, dit: 27.55},
    chapel: {n95: 10.609},
    con: {n64: 12.465},
    cspear: {n27: 8.339},
    cthm: {n15: 17.311, n80: 21.685, quad: 22.02},
    cvmbs: {n63: 17.051},
    dcee: {n89: 28.374},
    diet: {n88: 8.377},
    dit: {n87: 6.679, ceit: 27.55},
    gate1: {n3: 10.199, n4: 14.021},
    gate2: {cdc: 31.957, n92: 5.894},
    gate3: {n30: 29.47, umall: 29.76},
    grandstand: {n13: 31.954, n10: 25.788},
    gym: {n27: 8.339},
    hostel: {n56: 9.219, agriEco: 28.667},
    icc: {n61: 16.721},
    ih1: {n46: 26.663},
    ih2: {n31: 20.48},
    infirmary: {n98: 4.856},
    landbank: {n77: 36.717, n76: 19.688, n75: 19.872, admin: 0},
    library: {n43: 17.408, n44: 30.93, n45: 26.194}, //cafenr: 51.644, 
    lshs: {n9: 16.004},
    men: {n29: 35.548, women: 44.58},
    ncrdec: {n36: 7.748, n37: 55.55},
    newCemds: {n42: 15.801},
    oldCemds: {n67: 6.172},
    osas: {n26: 10.749},
    physci: {n66: 20.065, n67: 24.769},
    quad: {n15: 10.292, n80: 39.247, cthm: 22.02},
    resCenter: {n43: 16.891},
    rolle: {n60: 40.725, icc: 26.934},
    saka: {n63: 268.092},
    saluysoy: {n58: 8.34},
    shs: {n11: 9.16},
    sprint: {n41: 137.659, n69: 183.669},
    tdf: {n39: 135.692},
    umall: {gate3: 29.76},
    women: {n32: 27.801, men: 44.58},
    n1: {n2: 6.943, n97: 124.04},
    n2: {n1: 6.943, n3: 53.265},
    n3: {n2: 53.265, gate1: 10.199},
    n4: {gate1: 14.021, n5: 9.369},
    n5: {n4: 9.369, n6: 3.727, n8: 99.544},
    n6: {n5: 3.727, n7: 4.112},
    n7: {n6: 4.112, n31: 46.202},
    n8: {n5: 99.54, n9: 13.703, n10: 14.145, n11: 49.96},
    n9: {n8: 13.703, lshs: 16.004},
    n10: {n8: 14.145, grandstand: 25.788},
    n11: {n8: 49.96, shs: 9.169, n12: 7.941},
    n12: {n11: 7.941, n13: 7.941, n14: 7.941},
    n13: {n12: 14.772, grandstand: 31.954},
    n14: {n12: 54.052, n15: 29.49, n16: 12.556},
    n15: {quad: 10.292, cthm: 17.311, n80: 38.077},
    n16: {n14: 12.556, n17: 55.15, n77: 28.524},
    n17: {n16: 55.15, n18: 7.477},
    n18: {n17: 7.477, cashier: 10.602, n19: 11.865},
    n19: {n18: 11.865, n20: 18.873, n21: 14.233},
    n20: {n19: 18.873, n74: 35.921},
    n21: {n19: 14.233, n22: 11.346},
    n22: {n21: 11.346, n23: 13.292},
    n23: {n22: 13.292, n24: 22.916},
    n24: {n23: 22.916, n25: 66.415},
    n25: {n24: 66.415, n26: 47.458},
    n26: {n25: 47.458, osas: 10.749, n27: 49.303},
    n27: {n26: 49.303, n28: 33.869, gym: 8.339, cspear: 8.339},
    n28: {n27: 33.869, n29: 12.285, n31: 78.918, n32: 73.526},
    n29: {n28: 12.285, n30: 25.638, men: 35.548},
    n30: {n29: 25.638, gate3: 29.47},
    n31: {n7: 46.202, ih2: 20.48, n28: 78.918},
    n32: {n28: 73.526, women: 27.801, n33: 14.222},
    n33: {n32: 14.222, n34: 14.121},
    n34: {n33: 14.121, n35: 35.934},
    n35: {n34: 35.934, n36: 15.608},
    n36: {n35: 15.608, ncrdec: 7.748},
    n37: {ncrdec: 55.55, n38: 65.944, n40: 106.192},
    n38: {n37: 65.944, n39: 81.377},
    n39: {n38: 81.377, tdf: 135.692},
    n40: {n37: 106.192, n41: 60.27, n42: 32.617},
    n41: {n40: 60.27, sprint: 37.659},
    n42: {n40: 32.617, cafenr: 7.373, newCemds: 15.801, n43: 49.734},
    n43: {n42: 49.734, library: 17.408, cafsev: 17.408, resCenter: 16.891, n44: 26.008},
    n44: {n43: 26.008, n45: 9.943, n46: 16.793, library: 30.93, cafsev: 17.408},
    n45: {n44: 9.943, n47: 11.563, cafenr: 75.801, library: 26.194, cafsev: 17.408},
    n46: {n44: 16.793, n47: 15.247, ih1: 26.663, n51: 23.169},
    n47: {n45: 11.563, n46: 15.247, n49: 10.982},
    n48: {n49: 23.583, cas: 14.589, n68: 61.968},
    n49: {n47: 10.982, n48: 23.583, n50: 15.546},
    n50: {n49: 15.546, n51: 17.216},
    n51: {n46: 23.169, n50: 17.216, n52: 14.814},
    n52: {n51: 14.814, n53: 28.156},
    n53: {n52: 28.156, biosci: 6.888, n54: 37.381},
    n54: {n53: 37.381, n55: 15.126, n64: 45.939},
    n55: {n54: 15.126, n56: 30.644, n57: 35.805},
    n56: {n55: 30.644, hostel: 9.219, agriEco: 29.309},
    n57: {n55: 35.805, n58: 18.963, n60: 23.71},
    n58: {n57: 18.963, saluysoy: 8.34, n59: 9.9},
    n59: {n58: 9.9, n60: 12.515, saluysoy: 8.966, n62: 51.621},
    n60: {n57: 23.71, n59: 12.515, n61: 14.384, rolle: 40.725},
    n61: {n60: 14.384, icc: 16.721},
    n62: {n59: 51.621, n63: 109.347},
    n63: {n62: 109.347, cvmbs: 17.051, ansci: 20.106, saka: 268.092},
    n64: {n54: 45.939, con: 12.465, n65: 56.059},
    n65: {n64: 56.059, n66: 45.449, n89: 122.346},
    n66: {n65: 45.449, physci: 20.065, n67: 24.664},
    n67: {n66: 24.664, oldCemds: 6.172, n68: 55.498},
    n68: {n48: 61.968, n67: 55.498, n69: 15.458, n70: 32.933},
    n69: {n68: 15.458, sprint: 83.669},
    n70: {n68: 32.933, n71: 26.087},
    n71: {n70: 26.087, n72: 11.184, n74: 13.216},
    n72: {n71: 11.184, n73: 16.718, n85: 52.421},
    n73: {n72: 16.718, ceit: 16.998},
    n74: {n71: 13.216, n20: 35.921, n75: 27.917},
    n75: {n74: 27.917, landbank: 19.872, admin: 19.872, n76: 22.762, n84: 38.433},
    n76: {n75: 22.762, landbank: 19.688, admin: 19.688, n77: 23.493, n84: 25.663},
    n77: {n16: 28.524, n76: 23.493, n78: 12.021, n84: 32.815},
    n78: {n77: 12.021, n79: 15.61},
    n79: {n78: 15.61, ced: 13.298, n80: 12.22},
    n80: {n79: 12.22, quad: 39.247, cthm: 21.685, n15: 38.077, ced: 17.229, n81: 19.839},
    n81: {n80: 19.839, n82: 19.034},
    n82: {n81: 19.034, n83: 28.313, cdc: 6.166, n92: 33.184},
    n83: {n82: 28.313, n84: 9.419, n91: 6.21},
    n84: {n75: 38.433, n76: 25.663, n77: 32.815, n83: 9.419, n85: 7.802},
    n85: {n72: 52.421, n84: 7.802, n86: 19.564, n87: 40.415, n91: 10.361},
    n86: {n85: 19.564, ceit: 18.878},
    n87: {n85: 40.415, n90: 16.406, dit: 6.679, n88: 29.589},
    n88: {n87: 29.589, diet: 8.377, n89: 62.586},
    n89: {n65: 122.346, n88: 62.586, dcee: 28.374},
    n90: {n87: 16.406, n91: 28.807},
    n91: {n83: 6.21, n85: 10.361, n90: 28.807, cdc: 28.654},
    n92: {n82: 33.184, n93: 6.293, gate2: 5.894},
    n93: {n92: 6.293, n94: 9.665, n97: 122.316},
    n94: {n93: 9.665, n95: 36.547},
    n95: {n94: 36.547, chapel: 10.609, ccj: 65.597},
    n96: {ccj: 20.044, n97: 7.133},
    n97: {n93: 122.316, n96: 7.133, n98: 32.818},
    n98: {n97: 32.818, infirmary: 4.856, n99: 22.351},
    n99: {n98: 22.351, n00: 6.604, n1: 124.04},
    n00: {n92: 177.554, n99: 6.604, n2: 124.461}
};

const drivingGraph = {
    admin: {n50: 42.522},
    agriEco: {n30: 29.088},
    ansci: {n37: 28.093},
    biosci: {n28: 21.116},
    cafenr: {n18: 42.42},
    cafsev: {n22: 29.144},
    cashier: {n50: 42.522},
    cas: {n23: 32.395},
    cdc: {n56: 27.651},
    ccj: {n62: 23.798},
    ced: {n57: 20.55},
    ceit: {n44: 40.644},
    chapel: {n60: 26.065},
    con: {n39: 30.005},
    cspear: {n7: 47.499},
    cthm: {n52: 22.039},
    cvmbs: {n37: 21.096},
    dcee: {n45: 35.419},
    diet: {n46: 32.699},
    dit: {n47: 35.269},
    gate1: {n73: 0},
    gate2: {n74: 0},
    gate3: {n6: 48.829},
    grandstand: {n53: 23.626, n54: 31.325},
    gym: {n7: 47.499},
    hostel: {n30: 24.011},
    icc: {n33: 44.967},
    ih1: {n27: 35.419},
    ih2: {n5: 45.772, n71: 39.917},
    infirmary: {n63: 18.611},
    landbank: {n50: 42.522},
    library: {n22: 40.205},
    lshs: {n54: 33.319},
    men: {n8: 48.457},
    ncrdec: {n14: 26.961},
    newCemds: {n19: 23.906},
    oldCemds: {n41: 30.579},
    osas: {n7: 41.468},
    physci: {n41: 28.008},
    quad: {n52: 30.521},
    resCenter: {n21: 27.323},
    rolle: {n33: 53.517},
    saka: {n38: 7.97},
    saluysoy: {n34: 22.024},
    shs: {n53: 23.582},
    sprint: {n18: 91.379},
    tdf: {n75: 0},
    umall: {n70: 21.837},
    women: {n8: 51.029},
    n1: {n64: 59.437, n73: 15.46},
    n2: {n3: 8.903, n73: 8.39},
    n3: {n4: 5.191},
    n4: {n5: 15.767},
    n5: {n71: 66.275, ih2: 45.772},
    n6: {n7: 71.248, n8: 79.046, gate3: 48.829},
    n7: {osas: 41.468, gym: 47.499, cspear: 47.499},
    n8: {n9: 20.541, men: 48.457, women: 51.029},
    n9: {n10: 10.17},
    n10: {n11: 8.577},
    n11: {n12: 35.772},
    n12: {n13: 13.309},
    n13: {n14: 6.673},
    n14: {n15: 61.254, ncrdec: 26.961},
    n15: {n16: 61.711, n18: 105.26},
    n16: {n15: 61.711, n17: 81.377},
    n17: {n16: 81.377, tdf: 135.692},
    n18: {n19: 49.222, sprint: 91.379, cafenr: 42.42},
    n19: {n20: 28.103, cafenr: 31.399, newCemds: 23.906},
    n20: {n21: 32.89, resCenter: 18.509},
    n21: {n22: 24.947, n26: 13.904, resCenter: 27.323},
    n22: {n23: 26.885, cafsev: 29.144, library: 40.205},
    n23: {n42: 68.162, cas: 32.395},
    n24: {n23: 21.151},
    n25: {n24: 16.357},
    n26: {n27: 26.966, ih1: 35.419},
    n27: {n25: 26.549, n28: 32.411},
    n28: {n29: 49.776, biosci: 21.116},
    n29: {n30: 37.664, n31: 7.146, n39: 50.385},
    n30: {n29: 37.664, agriEco: 29.088, hostel: 24.011},
    n31: {n29: 7.146, n32: 40.991},
    n32: {n31: 34.215, n33: 18.441, n34: 18.757},
    n33: {n32: 18.441, n34: 14.769, rolle: 53.517, icc: 44.967},
    n34: {n32: 18.757, n33: 14.769, n35: 8.563, saluysoy: 22.024},
    n35: {n34: 8.563, n36: 35.545},
    n36: {n35: 35.545, n37: 120.602},
    n37: {n36: 120.602, n38: 269.729, cvmbs: 21.096, ansci: 28.093},
    n38: {n37: 269.729, saka: 7.97},
    n39: {n40: 54.145, con: 30.005},
    n40: {n45: 127.327},
    n41: {n40: 48.004, oldCemds: 30.579, physci: 28.008},
    n42: {n41: 88.069, n43: 32.738},
    n43: {n72: 41.54},
    n44: {n72: 43.347, n48: 12.154},
    n45: {n46: 65.777, dcee: 35.419},
    n46: {n47: 30.191, diet: 32.699},
    n47: {n48: 44.872, dit: 35.269},
    n48: {n49: 8.798, n56: 31.331},
    n49: {n51: 71.495, n50: 23.735},
    n50: {n49: 23.735, admin: 42.522, cashier: 42.522, landbank: 42.522},
    n51: {n53: 60.926, n52: 30.521},
    n52: {n51: 30.521, quad: 30.521, cthm: 22.039},
    n53: {n54: 49.934, shs: 23.582},
    n54: {n55: 97.852, lshs: 33.319, grandstand: 31.325},
    n55: {n2: 7.82},
    n56: {n57: 29.134, n74: 32.194, cdc: 27.651},
    n57: {n56: 29.134, ced: 20.55},
    n58: {n59: 12.051, n61: 49.234, gate2: 5.509},
    n59: {n58: 12.051, n60: 39.161},
    n60: {n59: 39.161, chapel: 26.065},
    n61: {n58: 49.234, n62: 64.442},
    n62: {n61: 64.442, n63: 44.388, ccj: 23.798},
    n63: {n62: 44.388, n64: 152.028, infirmary: 18.611},
    n64: {n63: 152.028, n65: 194.02, n1: 59.437},
    n65: {n64: 194.02, n66: 18.623},
    n66: {n65: 18.623, n67: 22.091},
    n67: {n66: 22.091, n68: 121.302},
    n68: {n67: 121.302, n69: 20.834},
    n69: {n68: 20.834, n70: 47.048},
    n70: {n69: 47.048, umall: 21.837},
    n71: {n6: 37.273},
    n72: {n44: 43.347, ceit: 38.023},
    n73: {gate1: 0, n2: 8.39, n1: 15.46},
    n74: {gate2: 0, n58: 5.509},
    n75: {n17: 135.692}
};



function doDijkstra(graph, start, end) {
    let distances = {}, previous = {}, unvisited = new Set();
    
    for (let node in graph) {
        distances[node] = node === start ? 0 : Infinity;
        unvisited.add(node);
    };

    while (unvisited.size) {
        let closestNode = null;
        for (let node of unvisited) {
            if (!closestNode || distances[node] < distances[closestNode]) {
                closestNode = node;
            }
        }

        if (distances[closestNode] === Infinity) break;
        if (closestNode === end) break;

        for (let neighbor in graph[closestNode]) {
            let newDistance = distances[closestNode] + graph[closestNode][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = closestNode;
            }
        }

        unvisited.delete(closestNode)
    };

    let path = [], node = end;
    while (node) {
        path.push(node);
        node = previous[node];
    };
    
    return path.reverse();
};

// "How to use?" part functions
function showInstructions() {
    let howTo = document.getElementById("how-to");
    let instructionsContainer = document.getElementById("instructions-container");

    if (howTo.checked) {
        instructionsContainer.style.display = "block";
        document.getElementById("foot-lbl").style.textDecoration = "underline";
    
    } else {
        instructionsContainer.style.display = "none";
        document.getElementById("foot-lbl").style.textDecoration = "none";
    };
};

// side button functions 
function showLayers() {
    if (shownLayers >= 2) {
        document.getElementById("two-layer").style.display = "flex";
        document.getElementById("add-text").innerHTML = "Add another destination";
    };
    
    if (shownLayers >= 3){
        document.getElementById("three-layer").style.display = "flex";
        document.getElementById("add-layer").style.display = "none";
    };
};

function add() {
    shownLayers ++;
    showLayers();
};

function remove(layer, select) {
    document.getElementById(select).selectedIndex = 0;

    if (layer != "one-layer") {
        document.getElementById(layer).style.display = "none";
        shownLayers --;
    };

    if (shownLayers < 3) {
        document.getElementById("add-layer").style.display = "flex";
    };

    if (shownLayers < 2) {
        document.getElementById("add-text").innerHTML = "Add destination";
    };
};


// SHOW MAP button function 
function showMap() {
    map.invalidateSize();
    pageContainer.style.transform = "translateY(calc(-100dvh + 60px))";
    grayContainer.style.borderRadius = "32px";

    logo.style.transform = "translateY(-90px) scale(0.4)";
    logo.disabled = false;

    for (let i = 0; i < grayElements.length; i++) {
        grayElements[i].style.opacity = "0";
        grayElements[i].disabled = true;
    };
    
    const modes = document.getElementsByName('mode');
    const locations = document.getElementsByClassName("select");
    const options = document.getElementsByClassName("option");
    let mode, Nodes, Graph, polyStart, polyEnd;
    let destinations = [];

    // get which mode of transportation is selected    
    for (let i = 0; i < modes.length; i++) {
        if (modes[i].checked) {
            mode = modes[i].value;
        };   
    };

    // define the set of coordinates to use depending on mode of transportation
    if (mode == "driving") {
        Nodes = drivingNodes;
        Graph = drivingGraph;
        polyStart = 1;
        polyEnd = 2;
    } else {
        Nodes = walkingNodes;
        Graph = walkingGraph;
        polyStart = 0;
        polyEnd = 1;
    };

    // get the locations selected then add to the "destinations" list
    for (let i = 0; i < locations.length; i++) {
        let loc = locations[i].value;
        let selectedIndex = document.getElementById(locations[i].id).selectedIndex - 1;
        if (loc != "none") {
            let marker = L.marker(Nodes[loc], {icon: redIcon}).addTo(map).bindPopup(options[selectedIndex].innerHTML, {autoClose: false}).openPopup();
            destinations.push(loc);
            mapElements.push(marker);
        };
    };

    let firstLocation = destinations[0];
    
    // reverse order for polyline generation
    destinations.reverse();
    // destinations = ["gate3", "dcee"];
    
    
    // do dijkstra between each stops in "destinations" list and create polyline
    for (let i = 1; i < destinations.length; i++) {
        let start = destinations[i];
        let end = destinations[i - 1];
        route = doDijkstra(Graph, start, end);
        console.log(route)
        
        let polylineColor = "#51A153"; // dark green
        let polylineOpacity = 1.0;

        if (start !== firstLocation) {
            polylineColor = "#74C776"; // light green
            polylineOpacity = 0.8;
        };

        // create polyline between each stops
        for (let stop = polyStart; stop < route.length - polyEnd; stop++) {
            polyline = new L.polyline([Nodes[route[stop]], Nodes[route[stop + 1]]], { weight: 6, color: polylineColor, opacity: polylineOpacity }).addTo(map);
            mapElements.push(polyline);
        };
    };
};

// map page home button function
function back() {
    map.setView([14.199962369320243, 120.88165030538508], 17);

    pageContainer.style.transform = "translateY(0)";
    grayContainer.style.borderRadius = "64px 64px 0 0";

    logo.style.transform = "scale(1)";
    logo.disabled = true;

    for (let i = 0; i < grayElements.length; i++) {
        grayElements[i].style.opacity = "1";
        grayElements[i].disabled = false;
    };

    // remove all previous markers and polylines after 1000ms
    setTimeout(function() {
        for(let i=0; i < mapElements.length; i++) {
            map.removeLayer(mapElements[i]);
        };
      }, 1000);
};