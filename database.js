const mongoose = require('mongoose')
mongoose.connect('mongodb://imskorped:skorpedbot123@ds213513.mlab.com:13513/imskorped', { useNewUrlParser: true },
function (err) {
    if (err) {
        console.log('Erro ao conectar na db!')
    } else {
        console.log('Database conactada!')
    }
})
var Schema = mongoose.Schema;
var member = new Schema({
    _id: {
        type: String
    },
    casamento: {
        type: Boolean,
        default: false
    },
    casado: {
        type: String,
        default: "Ninguem"
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    warn: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    rep: {
        type: Number,
        default: 0
    },
    sobre: {
        type: String,
        default: "Use !setsobre para alterar o seu sobre!"
    },
    fotofundo: {
        type: String,
        default: "https://i.imgur.com/DE6pxPZ.png"
    },
    comum: {
        type: Number,
        default: 0
    },
    epico: {
        type: Number,
        default: 0
    },
    lendario: {
        type: Number,
        default: 0
    },
    raro: {
        type: Number,
        default: 0
    }
})

var Guild = new Schema({
    _id: {
        type: String
    },
    autorole: {
        type: Boolean,
        default: false
    },
    autoroleid: {
        type: String,
        dafault: "Nenhum"
    },
    leveis: {
        type: Boolean,
        default: true
    },
    coins: {
        type: Boolean,
        default: true
    },
    welcome: {
        type: Boolean,
        default: false
    },
    welcomechannel: {
        type: String,
        default: "Nenhum"
    },
    welcomemsg: {
        type: String,
        default: "Nenhuma"
    },
    byebye: {
        type: Boolean,
        default: false
    },
    byebyechannel: {
        type: String,
        default: "Nenhum"
    },
    byebyemsg: {
        type: String,
        default: "Nenhuma"
    },
    box: {
        type: Boolean,
        default: true
    },
    caixa: {
        type: Boolean,
        default: false
    },
    caixatipo: {
        type: String,
        default: "Comum"
    }
})

var Casado = new Schema({
    _nome1: {
        type: String
    },
    _nome2: {
        type: String,
    },
    espera: {
        type: Boolean,
        default: false
    }
})

var Guilds = mongoose.model("Guilds", Guild);
var Member = mongoose.model('Member', member);
var Casados = mongoose.model("Casados", Casado);
//estamos dizendo q isso ai e um modelo de planilha pro codigo
//e dps exportar para poder usar fora desse arquivo
exports.Members = Member;
exports.Guilds = Guilds
exports.Casados = Casados
    //o _id = a identificação do usuário no db
