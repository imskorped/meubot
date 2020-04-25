require('http').createServer().listen(3000)
console.log("Conectando o bot...")
const Discord = require('discord.js');
const client = new Discord.Client({fetchAllMembers: true});
const ytdl = require ("ytdl-core");
const moment = require('moment');
      moment.locale('PT-BR');   
const config = require('./config.json');
const database = require('./database.js');
const fs = require('fs');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.GOOGLE_API_KEY);
const queue = new Map();
const Util = require('discord.js');
client.commands = new Discord.Collection();
client.setMaxListeners(20)


fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("[ERRO] " + err);
    files.forEach(file => {
        let eventFunction = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/prefix-/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error("[CONSOLE ERROR] " + err);
    }

});

client.login("NTU1ODM0NzI4MDI1MDMwNzAz.XqNMpA.mlykixnu0yaX6ZdptoTZT2FKDGE")


//logs no console

client.on("message", (message) => {

console.log(`${message.author.username}: ${message.content} | #${message.channel.name}`);

});

//fim das logs no console

//Captcha


/*
client.on('guildMemberAdd', member => {
    var x = member.guild.channels.get("545410589313466379");
    if(!x) return;
    const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setThumbnail(member.user.avatarURL)
    .setFooter("Skorped")
    .setDescription(`<@${member.user.id}> \n \n Seja bem vindo!\nLeia as <#536970287934078999> para não ser punido.`)
	x.send(embed)
    let grupo = member.guild.roles.find("name", "💥 Não Registrado");
    member.addRole(grupo)
        
});



client.on('guildMemberAdd', member => { 
    
  let embed = new Discord.RichEmbed()
.setDescription("Clique no emoji abaixo para poder desbloquear todas as funções do servidor!")
.setColor('#FF0000')
.setFooter("🔒 SkorpedBOT • Verificação")
.setTimestamp();
	
member.guild.channels.get('536970280099250198').send(`** ** ` + `<@` + member.user.id  + `>`);

member.guild.channels.get('536970280099250198').send(embed).then(cona=> {
  cona.react('✅')
})
  })

client.on('messageReactionAdd', (reaction, user) => {
  if(reaction.emoji.name === "✅" && user.id !== client.user.id) {
       client.guilds.get("530618032037298186").members.get(user.id).addRole('536970269940514856')
       client.guilds.get("530618032037298186").members.get(user.id).removeRole('536970267985969153')
       
  }
	})


*/
//fim do captcha



fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("[ERRO] " + err);
    files.forEach(file => {
        let eventFunction = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.login("NTU1ODM0NzI4MDI1MDMwNzAz.XqNMpA.mlykixnu0yaX6ZdptoTZT2FKDGE")



const prefix = "!";
const id = "490323052928696340"

const configs = require('./jsons/config.json');

const teste = configs.teste;

client.on("ready", () => {

    let string = ''
    for (var i = 0; i < client.users.size; i++) {

        let userStatus = {
            online: 'online',
            idle: 'ausente',
            dnd: 'ocupado',
            offline: 'offline'
        }[client.users.array()[i].presence.status]

        string += "     - " + client.users.array()[i].username + " ( " + userStatus + " ) ,\n";
    
    }

//database 
	
	
	
	client.on('message', async message => {
    if (message.author.bot) return;
    var xpCol = new Set()
    let xpRDM = Math.round(Math.random() * 5)
    let coinsRDM = Math.round(Math.random() * 8)
    database.Members.findOne({
        "_id": message.author.id
    }, function (erro, documento) {
        if (documento) {
            if (documento.ban) { } else {
                var unbug = 370 * documento.level + 1
                if (documento.xp > unbug) {
                    documento.xp += xpRDM
                    documento.coins += coinsRDM
                    documento.level += 1
                    message.channel.sendMessage(`Parabéns ${message.author}, você acabou de subir para o nível ${documento.level}!`);
                    documento.xp = 0
                    documento.save()
                    xpCol.add(message.author.id)
                    setTimeout(function () {
                        xpCol.delete(message.author.id)
                    }, 30 * 1000)
                } else {
                    documento.xp += xpRDM
                    documento.coins += coinsRDM
                    documento.save()
                    xpCol.add(message.author.id)
                    setTimeout(function () {
                        xpCol.delete(message.author.id)
                    }, 30 * 1000)
                }
            }
        } else {
            var pessoa = new database.Members({
                _id: message.author.id,
                level: 0,
                xp: 0,
                coins: 0,
                rep: 0,
                sobre: "Use !setsobre para alterar o seu sobre!",
            })

            pessoa.save()
        }
    });
})
	
	
//membros no topico
/*


client.on('guildMemberAdd', guild => {
    const topico = `${client.guilds.get('530618032037298186').memberCount}`
    const gg = client.channels.get("544329572364189706", "536970346776100884")
    gg.setTopic("Estamos com " + topico + " membros no servidor!")
    
  });

  client.on('guildMemberRemove', guild => {
    const topico = `${client.guilds.get('530618032037298186').memberCount}`
    const gg = client.channels.get("544329572364189706", "536970346776100884")
    gg.setTopic("Estamos com " + topico + " membros no servidor!")
    
  });

  client.on('ready', guild => {
    const topico = `${client.guilds.get('530618032037298186').memberCount}`
    const gg = client.channels.get("544329572364189706", "536970346776100884")
    gg.setTopic("Estamos com " + topico + " membros no servidor!")
    
  });

	
*/

    
//mencionar bot
	
	
client.on('message', message =>{
    if(message.content.includes("<@553356812322340864>")){
	if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle("SkorpedBOT")
    .setColor("RANDOM")
    .setDescription("Olá, sou o SkorpedBOT, fui desenvolvido pelo <@490323052928696340>, meu prefixo é `!`, para saber mais informações, use !info, para ver meus comandos, use !comandos")

    .setTimestamp()
    .setFooter("SkorpedBOT • @ImSkorped", client.user.avatarURL)

    message.channel.send(embed);
  }
});
	
	
	
    
 //logs
	
	
	
	client.on('messageDelete', async (message) => {
    const logs = message.guild.channels.find('name', '📝logs');
    if(!logs) return;
    const logsembed = new Discord.RichEmbed()
        .setDescription(`**${message.author.username}** apagou uma mensagem!\n\n🔖 **Informações:**\n👤 **ID:** ${message.author.id}\n📁 **Canal:** ${message.channel.name}\n\n**💬 Mensagem:** ${message.content}\n`)
        .setColor(message.guild.member(client.user).displayHexColor)
    	.setThumbnail(message.author.displayAvatarURL)
        .setFooter("🔔 SkorpedBOT • Sistema de logs")
        .setTimestamp()

    logs.send(logsembed);
})
	
	client.on("message", message => { 
if(message.channel.type == "dm") {
if(message.author.bot) return;
const logsdm = client.channels.find(a => a.name == '📝logs');

	const logsdmembed = new Discord.RichEmbed()
        .setDescription(`**${message.author.username}** enviou uma mensagem na DM do bot!\n\n🔖 **Informações:**\n👤 **ID:** ${message.author.id}\n📁 **Canal:** DM\n\n**💬 Mensagem:** ${message.content}\n`)
        .setColor("RANDOM")
    	.setThumbnail(message.author.displayAvatarURL)
        .setFooter("🔔 SkorpedBOT • Sistema de logs")
        .setTimestamp()
	

if(!logsdm) return;
logsdm.send(logsdmembed)
}
})
	
	
    


//bloqueador de invites 2.0
	
client.on('message', message =>{
    if (message.content.includes("discord.gg")) {
        if(!message.guild.member(message.author.id).hasPermissions("ADMINISTRATOR")) {
            message.delete()
            message.channel.send(`${message.author}, não divulgue links de outros servidores!`)  
            message.author.send(`Você recebeu uma advertência por: Divulgar convites sem permissão.`)

            database.Members.findOne({
                "_id": message.author.id
            }, function(erro, documento) {
    
                database.Members.findOne({
                    "_id": message.author.id
                }, function(err2, doc2) {
    
                    if (documento) {
    
                        if (doc2) {
    
                            doc2.warn += 1
                            doc2.save();
    
                        } else {
    
                            var pessoa = new database.Users({
                                _id: message.author.id,
                                level: 0,
                                xp: 0,
                                coins: 0,
                                conquistas: 0,
                                mensagens: 0,
                                msglevel: 0,
                                invitetru: false,
                                invitecode: "Nenhum",
                                invitou: 0,
                                warn: 0,
                                rep: 0
                            })
    
                            pessoa.save()
    
                        }
    
                    } else {
    
                        var pessoa = new database.Users({
                            _id: message.author.id,
                            level: 0,
                            xp: 0,
                            coins: 0,
                            conquistas: 0,
                            mensagens: 0,
                            msglevel: 0,
                            invitetru: false,
                            invitecode: "Nenhum",
                            invitou: 0,
                            warn: 0,
                            rep: 0
                        })
    
                        pessoa.save()
    
                    }
    
                })
    
            })
            const logs = message.guild.channels.find('name', '📝logs');
            if(!logs) return;
        const logsinviteembed = new Discord.RichEmbed()
    .setDescription(`**${message.author.username}** enviou um invite!\n\n🔖 **Informações:**\n👤 **ID:** ${message.author.id}\n📁 **Canal:** <#${message.channel.id}>\n\n**💬 Mensagem:** ${message.content}\n`)
    .setColor(message.guild.member(client.user).displayHexColor)
    .setThumbnail(message.author.displayAvatarURL)
    .setFooter("🔔 SkorpedBOT • Sistema de logs")
    .setTimestamp()

logs.send(logsinviteembed);
        }
    }})


	
    
    
//musica

    
client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Função de música funcionando!'));

client.on('disconnect', () => console.log('Eu apenas desconectei, mais já estou reconectando agora...'));

client.on('reconnecting', () => console.log('Estou me reconectando agora!'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!');
	//	const permissions = voiceChannel.permissionsFor(msg.Client.user);
	//	if (!permissions.has('CONNECT')) {
	//		return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
	//	}
	//	if (!permissions.has('SPEAK')) {
	//		return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
	//	}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** foi adicionado à lista!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    
                    const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor("Seleção de musicas", client.user.displayAvatarURL)
                    .addField("Resultados obtidos a partir do nome fornecido", `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}\n`+"`Digite o numero que representa a musica que você deseja.`")
		    	    .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
                    .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)

					msg.channel.send(embed);
                    // eslint-disable-next-line max-depth

                 
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 20000,
							errors: ['time']
						});
					} catch (err) {
                        console.error(err);
                        
                        const temp = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setAuthor("Seleção de musicas", client.user.displayAvatarURL)
                        .setDescription("Você demorou muito para escolher uma das 10 opções.")
		    	        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
                        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
    

						return msg.channel.send(temp);
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
                    console.error(err);
                    
                    const result = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setAuthor("Seleção de musicas", client.user.displayAvatarURL)
                        .setDescription("Não encontrei nada relacionado a esse nome, desculpe.")
                        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
		    	.setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
    

					return msg.channel.send(result);
				}
			}
            return handleVideo(video, msg, voiceChannel);
            console.log("Play")  
		}
    } else 
    
    if (command === 'skip') {
        const skipnoperm = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você não pode executar esse comando, este comando só esta disponivel para a staff", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) 
        return msg.channel.send(skipnoperm);
        
        const errskip = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você precisa estar em um canal de voz para executar esse comando", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
        if (!msg.member.voiceChannel) return msg.channel.send(errskip);
        const noskip = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Não há nenhuma musica tocando para que eu possa pular no momento", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
		if (!serverQueue) return msg.channel.send(noskip);
		serverQueue.connection.dispatcher.end('O comando Skip foi usado!');
		return undefined;
    } else 
    
    if (command === 'stop') {
        const stopnoperm = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você não pode executar esse comando, este comando só esta disponivel para a staff", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(stopnoperm);
        
        const musnoch = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você precisa estar em um canal de voz para executar esse comando", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)

        
        if (!msg.member.voiceChannel) return msg.channel.send(musnoch);
        const nomusic = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Não há nenhuma musica tocando", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)

		if (!serverQueue) return msg.channel.send(nomusic);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('O comando de parada foi usado!');
		return undefined;
    } else 
    
    if (command === 'volume') {

        const volnoperm = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você não pode executar esse comando, este comando só esta disponivel para a staff", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


        if (!msg.member.hasPermission("MANAGE_MESSAGES")) 
        return msg.channel.send(volnoperm);
        
        const errvol = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você precisa estar em um canal de voz para executar o comando", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)

        
        if (!msg.member.voiceChannel) return msg.channel.send(errvol);
        
        const volerr = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Não há nenhuma musica tocando no momento", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


        if (!serverQueue) return msg.channel.send(volerr);
        
        const vol = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("O volume atual é", `${serverQueue.volume} 🔊`, true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


		if (!args[1]) return msg.channel.send(vol);
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        
        const setvol = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Eu ajustei o volume para:", `${args[1]} 🔊`, true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


		return msg.channel.send(setvol);
    } else 
    
    if (command === 'queue') {
        const qnm = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Não há nenhuma musica tocando no momento", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)

        if (!serverQueue) return msg.channel.send(qnm);
        

        const queue = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
                        .addField("Tocando agora 🎶", `${serverQueue.songs[0].title}`, true)
                        .addField("Queue atual", `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`, true)
		    	        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
                        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
    

		return msg.channel.send(queue);
    } else 
    
    
    if (command === 'pause') {
        const permpause = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você não pode executar esse comando, este comando só esta disponivel para a staff", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(permpause);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            const pause = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Status atual da musica", "⏸ Pausada", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
			return msg.channel.send(pause);
        }
        const pnm = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Não há nenhuma musica tocando no momento", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)

		return msg.channel.send(pnm);
    } else 
    
    if (command === 'resume') {
        const permres = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Você não pode executar esse comando, este comando só esta disponivel para a staff", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
		
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(permres);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            const res = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Status atual da musica", "▶ Tocando", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)
		
			return msg.channel.send(res);
        }
        
        const rnm = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Sistema de musicas", client.user.displayAvatarURL)
        .addField("Erro ❌", "Não há nenhuma musica tocando no momento", true)
        .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
        .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


		return msg.channel.send(rnm);
	}

	return undefined;
;

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Eu não pude entrar no canal de voz: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
        
        const newm = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Seleção de musicas", client.user.displayAvatarURL)
    .addField("Musica adcionada na lista 🎶", `${song.title}`)
    .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
    .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


        if (playlist) return undefined;
        
        else 
        
        return msg.channel.send(newm);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'O fluxo não está gerando com rapidez suficiente.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const playin = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Seleção de musicas", client.user.displayAvatarURL)
    .addField("Tocando agora 🎶", `${song.title}`)
    .setThumbnail("https://cdn.discordapp.com/attachments/484485121207042064/493056098874687488/1485968501-musicsocialnetworkbrandlogo_78889.png")
    .setFooter("SkorpedBOT • Sistema de musicas", client.user.displayAvatarURL)


	serverQueue.textChannel.send(playin);
}

});

    


    
//presence
    
    
    
    
    
    const membrosNomes = string
    var statusIDO = ["dnd" , "online" , ]

    console.log(`Conectado !`)
    setTimeout(function() {
        console.log(`SkorpetBOT\nNumero de usuarios totais: ${client.users.size}\nNumero de guilds onde estou presente: ${client.guilds.size}\nStatus do bot: OK`);
    }, 2000)
});

client.login("NTU1ODM0NzI4MDI1MDMwNzAz.XqNMpA.mlykixnu0yaX6ZdptoTZT2FKDGE")

client.on("message", (message) => {
});

