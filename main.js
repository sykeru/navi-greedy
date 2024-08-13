// initialize main variables
let shownLayers = 1;
const pageContainer = document.getElementById("page-container");
const grayContainer = document.getElementById("gray-container");
const grayElements = grayContainer.querySelectorAll(".z");
const logo = document.getElementById("logo")

// initialize Leaflet map and its elements
const map = L.map('map', {zoomControl: false}).setView([14.199962369320243, 120.88165030538508], 17);


const mtLayer = L.maptilerLayer({
                apiKey: 'eCwvi5eqVtXNab5U5pNc',
                style: L.MaptilerStyle.OUTDOOR,
    }).addTo(map);

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
    n1: [14.196277536115117, 120.88048473198177], 
    n2: [14.196386947852886, 120.88101718636738], 
    gate1: [14.196550330772805, 120.8811120328926], // n3
    n4: [14.196581534307029, 120.88120962738675], 
    // n5: [14.196700908852965, 120.88186877886329],  
    grandstand: [14.197738534218757, 120.88102459856853],  // n5
    umallGate: [14.196226935354984, 120.88232690663348], // n6
    n7: [14.196799183816476, 120.88227153024586], 
    n8: [14.196831438555485, 120.88239583026661], 
    n9: [14.197006714249407, 120.88317920736223], 
    n10: [14.197121596772789, 120.88339298869501], 
    ncrdec: [14.197521350996606, 120.88354734845433], // n11
    n12: [14.199746245883025, 120.88250814285626], 
    n13: [14.198020308724766, 120.88332117218903], 
    cafenr: [14.199142580689566, 120.88278193856135],  // n14
    n15: [14.199594330244212, 120.88242006589563], 
    n16: [14.196887541795128, 120.88268008494491],
    cas: [14.199690800817008, 120.88210702489948], // n17
    n18: [14.199469843288525, 120.8815474800787], 
    n19: [14.199290925868068, 120.88100494500605], 
    n20: [14.196658022103124, 120.8822134474104],
    n21: [14.19917524261326, 120.88052716848183], 
    n22: [14.199046222337312, 120.88054605011926], 
    n23: [14.199210817045834, 120.88110943459264], 
    n24: [14.199360832830043, 120.8812646039155], 
    n25: [14.198724995744804, 120.88128766565913], 
    n26: [14.198745357356013, 120.88147163314916], 
    n27: [14.198680980891428, 120.88167568736277], 
    n28: [14.198482253270202, 120.88184832017246], 
    n29: [14.197887006874469, 120.88202702567908], 
    osas: [14.1975639168527, 120.88221434203922], // n30
    cashier: [14.198668512162984, 120.8811600775734], // n31
    n32: [14.198541829165316, 120.8806691913583], 
    n33: [14.198789565045198, 120.88060303386425],
    n34: [14.198423353400164, 120.88070073085201], 
    n35: [14.197943572207008, 120.88083543225723], 
    n36: [14.197412597837634, 120.88098994933423], 
    gym: [14.197118529025133, 120.88232438676317], // n37
    dit: [14.199461271525124, 120.88045401999981], // n38
    diet: [14.199814906774776, 120.88035705495039], // n39
    n40: [14.200297253969339, 120.88024285431747], 
    n41: [14.200560880471507, 120.88128696246018], 
    oldCemds: [14.199920854979403, 120.88142911052366],  // n42
    con: [14.200691592732083, 120.88176707788875], // n43
    n44: [14.200792601357012, 120.88225926325826], 
    biosci: [14.200351992087976, 120.88240593555676], // n45
    n46: [14.200148287107483, 120.8824390514679], 
    n47: [14.20001437402276, 120.8824000999292], 
    n48: [14.199824555336054, 120.8822818477624], 
    n49: [14.200904256609665, 120.88231504538345], 
    n50: [14.201236132800622, 120.8822534056156], 
    icc: [14.20146044773778, 120.88187787720294], // n51
    rolle: [14.201216713940871, 120.88175712851812], // n52
    n53: [14.201347900497797, 120.88218587018867], 
    n54: [14.201578913449822, 120.88215466176614], 
    cvmbs: [14.202824320783192, 120.8817141113035], // n55
    n56: [14.196252337110307, 120.88035509193833], 
    infirmary: [14.1975299451574, 120.88009747632331],  // n57
    ccj: [14.197831577827367, 120.88002138306873], // n58 
    n59: [14.199099005557365, 120.88036501499688], 
    cdc: [14.199020002205854, 120.88006886089283],  // n60
    gate2: [14.198967914916868, 120.87984806787658],  // n61
    n62: [14.198869440978821, 120.87969031455314], 
    chapel: [14.198553104443853, 120.87975048634994], // n63
    n64: [14.198323460363488, 120.8797762094308],
    tdf: [14.198595870500526, 120.88592230227202], // n65
    n66: [14.1975299451574, 120.88020747632331],
    ih2: [14.19636458131911, 120.88174765572329], // n67
    n68: [14.197325178050455, 120.88350066051406], 
    saluysoy: [14.2013023241157, 120.88243737661506], // n69
    admin: [14.198874602132035, 120.88088691735506], // n70
    n71: [14.199139106600429, 120.88085998914651],
    ceit: [14.199371707815803, 120.88072659154814], // n72
    dcee: [14.200192813538132, 120.88000305432064], // n73
    ih1: [14.200029476951434, 120.88269540081875], // n74
    n75: [14.196559881289307, 120.88125267401364], 
    n76: [14.196653322198388, 120.88166248519967], 
    n77: [14.199887351492938, 120.88247955567706], 
    agriEco: [14.201045832661995, 120.88295040914448], // n78
    saka: [14.205150955857926, 120.88091158938379], 
    n80: [14.199521473841438, 120.88260734534613], 
    newCemds: [14.199210621239656, 120.88292705697539], // n81 
    resCenter: [14.199558609076924, 120.88276940687263], // n82
    library: [14.199451796798918, 120.88248708461627], // n83
    men: [14.196662007730925, 120.88271406736101],  // n84
    women: [14.196772328807057, 120.88320718550389], // n85 
    lshs: [14.19749059283419, 120.88071771123052],  // n86
    quad: [14.1983393398538, 120.880349002049], // n87
    n88: [14.197968287000013, 120.88097082950239],
    n89: [14.197460063422387, 120.88109106173006],
    ced: [14.198738179336699, 120.88022170624139], // n90
    physci: [14.200102882106703, 120.88159635778081], // n91
    hostel: [14.200883112126727, 120.8826346238722], // n92
    n93: [14.197526313372452, 120.8808511320723],
    n94: [14.200085885752214, 120.88139658867114],
    n95: [14.198856464165239, 120.87974089540077],
    n96: [14.198309213326707, 120.884172868311],
    n97: [14.198411622626822, 120.88490318744324],
    n98: [14.198896653800857, 120.87984946400731],
    n99: [14.19895552923927, 120.88008841693711],
    n00: [14.199027686637038, 120.88038413049025],
};

const drivingNodes = {
    n1: [14.196145209443445, 120.88047920621668],
    n2: [14.196269925716073, 120.88105940878651],
    gate1: [14.196417979252814, 120.88116833590496], // n3
    ih2: [14.196558395200634, 120.88170477772461], // n4
    umallGate: [14.196730045382244, 120.88231712522484], //n5
    gym: [14.197103280611577, 120.88221903728476], // n6
    osas: [14.197523226783824, 120.88211309002659], // n7
    men: [14.196901448077567, 120.88299851106639], // n8
    women: [14.196901448077567, 120.88299851106639], // n8
    n9: [14.197025941014687, 120.88336029956666],
    n10: [14.197176661199238, 120.883494509740981],
    n11: [14.197385262900508, 120.88357625229219],
    ncrdec: [14.197503584193795, 120.88357864315757], // n12
    n13: [14.198035377484384, 120.88333873945855],
    tdf: [14.198595870500526, 120.88592230227202], // n14
    cafenr: [14.199162550836427, 120.88286098176932], // n15
    newCemds: [14.199162550836427, 120.88286098176932], // n15
    library: [14.199513492358149, 120.88268761049287], // n16
    resCenter: [14.199513492358149, 120.88268761049287], // n16
    n17: [14.199830541867167, 120.8825658156603],
    ih1: [14.199973760637288, 120.88255115517087], // n18
    biosci: [14.200369525009572, 120.88245191493203], // n19
    hostel: [14.200837977722047, 120.88227682728754], // n20
    agriEco: [14.200837977722047, 120.88227682728754], // n20
    rolle: [14.201221714652572, 120.88219788618616], // n20
    icc: [14.201221714652572, 120.88219788618616], // n20
    saluysoy: [14.201221714652572, 120.88219788618616], // n20
    saka: [14.205150955857926, 120.88091158938379], // n21
    n22: [14.201374771938006, 120.88223059035609],
    n23: [14.201574839515395, 120.88220092986619],
    cvmbs: [14.20291843249673, 120.88171453546005], // n24
    con: [14.200707731224206, 120.88174352669958], // n25
    n26: [14.200589993611857, 120.88128834072634],
    dcee: [14.200310581983214, 120.8801883079434], // n27
    diet: [14.199795757878713, 120.88028934513904],
    dit: [14.199420671002848, 120.8803636585938], // n29
    cas: [14.19967206758593, 120.88216310558921], // n30
    n31: [14.199422818321493, 120.881567716202],
    oldCemds: [14.199978091737677, 120.8814216012408], // n32
    physci: [14.199978091737677, 120.8814216012408], // n32
    n33: [14.19921136999935, 120.88099358649688],
    ceit: [14.199067147455675, 120.88042770906304], // n34
    admin: [14.199067147455675, 120.88042770906304], // n34
    cashier: [14.199067147455675, 120.88042770906304], // n34
    quad: [14.198409710906528, 120.88060668006237], // n35
    grandstand: [14.197938115833228, 120.88073793504535], // n36
    lshs: [14.197526313372452, 120.8808511320723], // n37
    cdc: [14.198975612628367, 120.88009040138904], // n38
    ced: [14.198975612628367, 120.88009040138904], // n38
    gate2: [14.198919228785423, 120.8798360226431], // n39
    n40: [14.198904590397282, 120.87979179771542],
    n41: [14.198867433479585, 120.8796837143745],
    chapel: [14.19853965397061, 120.87975106465345], // n42
    n43: [14.198343295262477, 120.87976744405819],
    ccj: [14.198010103523876, 120.87991147590711], // n44
    n45: [14.198546914337523, 120.87988949910594],
    n46: [14.197985668158324, 120.88003941510406],
    infirmary: [14.19755275004072, 120.88015105468197], // n47
    n48: [14.200140525035536, 120.88251921528268],
    n49: [14.198309213326707, 120.884172868311],
    n50: [14.198411622626822, 120.88490318744324],
};

// define graphs for Dijkstra
const walkingGraph = {
    n1: {n56: 14.253, n2: 58.673, n66: 142.433},
    n2: {n1: 58.673, gate1: 20.847},
    gate1: {n2: 20.847, n4: 11.078},
    n4: {gate1: 11.078, n75: 5.228, n36: 95.396},
    grandstand: {n88: 26.197, n89: 31.783},
    umallGate: {n20: 49.47},
    n7: {n76: 67.628, n8: 14.199, n20: 15.872},
    n8: {n7: 14.199, n16: 31.271, gym: 32.839},
    n9: {n16: 55.413, women: 26.236, n10: 26.349},
    n10: {n9: 26.349, n68: 25.439},
    ncrdec: {n68: 22.387, n13: 60.602},
    n12: {n80: 27.185, n15: 19.378, n77: 15.99},
    n13: {ncrdec: 60.602, n96: 97.269, cafenr: 137.665},
    cafenr: {n13: 137.665, newCemds: 17.377, n80: 46.144},
    n15: {library: 17.418, n80: 21.753, n12: 19.378, cas: 35.409},
    n16: {n8: 31.271, n9: 55.413, men: 25.344},
    cas: {n15: 35.409, n48: 24.007, n18: 65.13},
    n18: {cas: 65.13, n24: 32.814, oldCemds: 51.748},
    n19: {n24: 29.05, n23: 14.36, ceit: 31.322, n21: 53.085},
    n20: {n7: 15.872, umallGate: 49.47},
    n21: {n22: 14.49, n59: 19.427, dit: 32.768, ceit: 30.649, n19: 53.085},
    n22: {n21: 14.49, n33: 29.193, n71: 35.383, admin: 35.383, n59: 20.379, n00: 17.576},
    n23: {n19: 14.36, n24: 23.623, n25: 57.336},
    n24: {n18: 32.814, n23: 23.623, n19: 29.05},
    n25: {cashier: 15.12, n23: 57.336, n26: 19.96},
    n26: {n25: 19.96, n27: 23.132},
    n27: {n26: 23.132, n28: 28.89},
    n28: {n27: 28.89, n29: 68.935},
    n29: {n28: 68.935, osas: 41.212},
    osas: {n29: 41.212, gym: 50.926},
    cashier: {n25: 15.12, n32: 54.759},
    n32: {cashier: 54.759, n33: 28.455 , n34: 13.606},
    n33: {n32: 28.455, admin: 32.03, n22: 29.193},
    n34: {quad: 39.05, n32: 13.606, n35: 55.29},
    n35: {n34: 55.29, n88: 14.852, n36: 61.346},
    n36: {n35: 61.346, n89: 12.11, n93: 19.591, n4: 95.396},
    gym: {osas: 50.926, n8: 32.839},
    dit: {n21: 32.768, diet: 40.688},
    diet: {dit: 40.688, n40: 55.029},
    n40: {diet: 55.029, dcee: 28.339, n41: 116.307},
    n41: {n40: 116.307, con: 53.757, n94: 54.123},
    oldCemds: {n18: 51.748, physci: 27.106, n41: 72.799},
    con: {n41: 53.757, n44: 54.232},
    n44: {biosci: 51.482, con: 54.232, n49: 13.795, hostel: 41.696, agriEco: 79.647},
    biosci: {n44: 51.482, n46: 22.931},
    n46: {biosci: 22.931, n47: 15.471},
    n47: {n48: 24.658, n77: 14.613, n46: 15.471},
    n48: {n47: 24.658, cas: 24.007},
    n49: {n44: 13.795, hostel: 34.53, n50: 37.496},
    n50: {n49: 37.496, saluysoy: 21.153, n53: 14.403},
    icc: {n54: 32.615, n53: 35.481, rolle: 30.066},
    rolle: {icc: 30.066, n53: 48.464, n50: 53.541},
    n53: {n50: 14.403, rolle: 48.464, icc: 35.481, n54: 25.907},
    n54: {n53: 25.907, cvmbs: 146.399, icc: 32.615},
    cvmbs: {n54: 146.399, saka: 272.79},
    n56: {infirmary: 144.752, n1: 14.253},
    infirmary: {ccj: 34.529, n56: 144.752, n66: 11.858},
    ccj: {n64: 60.746, infirmary: 34.529},
    n59: {n21: 19.427, n22: 20.379, cdc: 33.111},
    cdc: {n59: 33.111, gate2: 24.496, n99: 7.473},
    gate2: {cdc: 24.496, n98: 7.925},
    n62: {n95: 5.64, chapel: 35.768, gate2: 20.226},
    chapel: {n62: 35.768, n64: 25.685},
    n64: {chapel: 25.685, ccj: 60.746},
    tdf: {n97: 111.753},
    n66: {n1: 142.433, n98: 156.795, infirmary: 11.858},
    ih2: {n76: 33.393},
    n68: {n10: 25.439, ncrdec: 22.387},
    saluysoy: {n50: 21.153},
    admin: {n22: 41.405, n33: 32.03, n71: 29.554},
    n71: {n22: 35.383, n23: 28.047, admin: 29.554},
    ceit: {n21: 30.649, n19: 31.322},
    dcee: {n40: 28.339},
    ih1: {n77: 28.127},
    n75: {n4: 5.228, n76: 45.383},
    n76: {n75: 45.383, ih2: 33.393, n7: 67.628},
    n77: {n12: 15.99, n47: 14.613, ih1: 28.127},
    agriEco: {n44: 79.647},
    saka: {cvmbs: 272.79},
    n80: {cafenr: 46.144, library: 15.103, resCenter: 17.951, n12: 27.185, n15: 21.753},
    newCemds: {cafenr: 17.377},
    resCenter: {n80: 17.951},
    library: {n80: 15.103, n15: 17.418},
    men: {n16: 25.344},
    women: {n9: 26.236},
    lshs: {n93: 14.921},
    quad: {n34: 39.05, ced: 46.423},
    n88: {n35: 14.852, grandstand: 26.197},
    n89: {n36: 12.11, grandstand: 31.783},
    ced: {quad: 46.423, n99: 28.117},
    physci: {n94: 21.617, oldCemds: 27.106},
    hostel: {n44: 41.696, n49: 34.53, agriEco: 38.551},
    n93: {lshs: 14.921, n36: 19.591},
    n94: {n41: 54.123, physci: 21.617, oldCemds: 18.682},
    n95: {ccj: 117.905, n62: 5.64, n98: 12.528, gate2: 16.943},
    n96: {n13: 97.269, n97: 79.546}, 
    n97: {n96: 79.546, tdf: 111.753}, 
    n98: {gate2: 7.925, n95: 12.528, n66: 156.795}, 
    n99: {cdc: 7.473, ced: 28.117, n98: 26.578, n00: 32.872}, 
    n00: {n99: 32.872, n59: 8.194, n22: 17.576}, 
};

const drivingGraph = {
    n1: {infirmary: 160.459, n2: 64.064},
    n2: {gate1: 20.221, n1: 64.064},       
    gate1: {ih2: 59.899},    
    ih2: {umallGate: 68.714},      
    umallGate: {gym: 42.828, men: 75.885, women: 75.885},
    gym: {umallGate: 42.828, osas: 48.072},      
    osas: {gym: 48.072},     
    men: {n9: 38.411},      
    women: {n9: 38.411},    
    n9: {n10: 24.995},       
    n10: {n11: 24.813},      
    n11: {ncrdec: 13.158},
    ncrdec: {n13: 64.541},
    n13: {n49: 94.933, cafenr: 135.505, newCemds: 135.505},
    tdf: {n50: 111.753},
    cafenr: {resCenter: 43.267, library : 43.267},
    newCemds: {resCenter: 43.267, library: 43.267},
    library: {n17: 37.62},
    resCenter: {n17: 37.62},
    n17: {ih1: 16.003 , cas: 46.851},
    ih1: {n48: 19.087},
    biosci: {hostel: 55.404, agriEco: 55.404},
    hostel: {con: 59.284, saluysoy: 43.51, rolle: 43.51, icc: 43.51},
    agriEco: {con: 59.284, saluysoy: 43.51, rolle: 43.51, icc: 43.51},
    rolle: {hostel: 43.51, agriEco: 43.51, n22: 17.38},
    icc: {hostel: 43.51, agriEco: 43.51, n22: 17.38},
    saluysoy: {hostel: 43.51, agriEco: 43.51, n22: 17.38},
    n22: {saluysoy: 17.38, rolle: 17.38, icc: 17.38, n23: 22.475},
    n23: {n22: 22.475, cvmbs: 158.334},
    cvmbs: {n23: 158.334, saka: 262.902},
    saka: {cvmbs: 262.902},
    con: {n26: 50.784},
    n26: {dcee: 122.583},
    dcee: {diet: 58.273},
    diet: {dit: 42.47},
    dit: {ceit: 39.912, admin: 39.912, cashier: 39.912},
    cas: {n31: 71.47},
    n31: {n33: 64.656, physci: 63.721, oldCemds: 63.721},
    n33: {ceit: 63.073, cashier: 63.073, admin: 63.073},
    oldCemds: {n26: 69.54},
    physci: {n26: 69.54},
    ceit: {ced: 37.759, cdc: 37.759, quad: 75.607, grandstand: 75.607},
    admin: {ced: 37.759, cdc: 37.759, quad: 75.607, grandstand: 75.607},
    cashier: {ced: 37.759, cdc: 37.759, quad: 75.607, grandstand: 75.607},
    quad: {grandstand: 54.314},
    grandstand: {lshs: 47.388},
    lshs: {gate1: 127.897},
    cdc: {gate2: 28.129},
    ced: {gate2: 28.129},
    gate2: {n40: 5.038},
    n40: {n41: 12.362, n45: 41.143},
    n41: {n40:12.362, chapel: 37.163},
    chapel: {n41: 37.163, n43: 21.905},
    n43: {chapel: 21.905, ccj: 40.171},
    ccj: {n43: 40.171},
    n45: {n40: 41.143, n46: 64.466},
    n46: {n45: 64.466, infirmary: 49.62},
    infirmary: {n46: 49.62, n1: 160.459},
    n48: {biosci: 26.477},
    n49: {n13: 94.933, n50: 79.546},
    n50: {n49: 79.546, tdf: 111.753},
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
        shownLayers--;
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
    let mode, Nodes, Graph;
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
    } else {
        Nodes = walkingNodes;
        Graph = walkingGraph;
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
    
    // do dijkstra between each stops in "destinations" list and create polyline
    for (let i = 1; i < destinations.length; i++) {
        let start = destinations[i];
        let end = destinations[i - 1];
        route = doDijkstra(Graph, start, end);

        let polylineColor = "#51A153"; // dark green
        let polylineOpacity = 1.0;

        if (start !== firstLocation) {
            polylineColor = "#74C776"; // light green
            polylineOpacity = 0.8;
        };

        // create polyline between each stops
        for (let stop = 0; stop < route.length - 1; stop++) {
            polyline = new L.polyline([Nodes[route[stop]], Nodes[route[stop + 1]]], { weight: 6, color: polylineColor, opacity: polylineOpacity }).addTo(map);
            mapElements.push(polyline);
        };
    };
};

// map page home button function
function home() {
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