const Discord = require('discord.js');
const request = require('request-promise');
const datetime = require('datetime');
const date = require('date');
var leagues = [{
    url: 'https://api.football-data.org/v2/competitions/CL/matches',
    method: 'GET',
    league: 'Champions League',
    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/PL/matches',
    method: 'GET',
    league: 'Premier League',

    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/BL1/matches',
    method: 'GET',
    league: 'Bundesliga',

    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/FL1/matches',
    method: 'GET',
    league: 'Ligue 1',

    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/PD/matches',
    method: 'GET',
    league: 'Primera Division',

    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/SA/matches',
    method: 'GET',
    league: 'Serie A',
    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/DED/matches',
    method: 'GET',
    league: 'Eredivise',

    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }},{
    url: 'https://api.football-data.org/v2/competitions/ELC/matches',
    method: 'GET',
    league: 'Championship',

    headers: {
        'X-Auth-Token': '26123f366b7f42e2bb15b38615794395',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }}];




// basketballspielen
// 4c78a0cbb944c2e90a7f759abbdf734e


const client = new Discord.Client();

const prefix = '--';

client.once('ready', () =>{
    console.log('Bot is online');

});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)   return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'fix'){
        checkdate().then(function(res){
        message.channel.send(res).then( );
        });
       
       
      
   
       
            
    }else if(command === 'legenden'){
        message.channel.send("```Die wahren Fußballegenden sind: \n Roland Linz und Roman Kienast <3```");
    }
});

  function checkdate(){
 var text= [];
 return new Promise(function(resolve, reject) {

   
  leagues.forEach(options =>{
    request(options)
        .then(function (rep){
            var counter = 0;
            
            // {embed: {
            //     color: 3447003,
            //     author: {
            //       name: client.user.username,
            //       icon_url: client.user.avatarURL()
            //     },
            //     title: "This is an embed",
            //     url: "http://google.com",
            //     description: "This is a test embed to showcase what they look like and what they can do.",
            //     fields: [{
            //         name: "Fields",
            //         value: "They can have different fields with small headlines."
            //       },
            //       {
            //         name: "Masked links",
            //         value: "You can put [masked links](http://google.com) inside of rich embeds."
            //       },
            //       {
            //         name: "Markdown",
            //         value: "You can put all the *usual* **__Markdown__** inside of them."
            //       }
            //     ],
            //     timestamp: new Date(),
            //     footer: {
            //       icon_url: client.user.avatarURL(),
            //       text: "© Example"
            //     }
            //   }
            // }

            let json = JSON.parse(rep);
            //  console.log(json);
              var today = new Date();
              var tod; 
             json.matches.forEach(play => {
             // console.log(play);
              tod = new Date(Date.parse(play.utcDate));



              // console.log(tod.getDate());
                 if(tod.getMonth()+1 == today.getMonth()+1 && tod.getDate()-1 == today.getDate()-1){  
                    var erg ="";
                    console.log(play);
                     var min = tod.getMinutes();
                    if (min < 10) {
                        min = '0' + min;
                        } else {
                        min = min + '';
                        }
                        console.log(play);

                        switch(play.status) {
                            case 'POSTPONED':
                                erg =" Verlegt       ";
                                break;
                            case 'FINISHED' :           
                                erg = " "+play.score.fullTime.homeTeam + " : " + play.score.fullTime.awayTeam+"        ";
                                break;

                            case 'IN_PLAY' :
                                if(play.score.halfTime.homeTeam == null){
                                    play.score.halfTime.homeTeam = play.score.fullTime.homeTeam;
                                }
                                if(play.score.halfTime.awayTeam == null){
                                    play.score.halfTime.awayTeam = play.score.fullTime.awayTeam;
                                }
                                erg =  " ("+play.score.halfTime.homeTeam + " : " + play.score.fullTime.awayTeam+") " + play.score.fullTime.homeTeam + " : " + play.score.fullTime.awayTeam;
                                break;
                            default:
                        

                                 erg= " 0 : 0        "
                                 break;
                        }
                        if(counter == 0){
                            console.log(options.league);
                  text.push('\n'+options.league+'  \n'+tod.getHours()+2+" : "+min+erg+" "+play.homeTeam.name +" : "+play.awayTeam.name+"\n");
                }else{
                    text.push(tod.getHours()+2+" : "+min+erg+" "+play.homeTeam.name +" : "+play.awayTeam.name+"\n"); 
                }
                counter++;
                 }
             });
        })
        .catch(function(err){console.log(err)});
    // request(options, function(err,res,body) {
    //     let json = JSON.parse(body);
    //    console.log(json);
    //     var today = new Date();
    //     var tod; 
    //    json.matches.forEach(play => {
    //    console.log(play);
    //     tod = new Date(Date.parse(play.utcDate));
    //    console.log(tod.getDate());
    //        if(tod.getMonth()+1 == today.getMonth()+1 && tod.getDay()-1 == today.getDay()-1){
    //            console.log(play.homeTeam.name);
              
    //         text.push(tod.getHours()+" : "+tod.getMinutes()+"       "+play.homeTeam.name +"      "+play.awayTeam.name+"\n");
    //        }
    //    });
    // console.log(json.matches);
    //    });
});
setTimeout(function(){
    resolve(ausgabe(text));
},4750);

});




}
function ausgabe(text){
    var txt ="```Heutige absolute Top-Spiele: \n";
    for(var i = 0 ; i < text.length; i++){
    txt += text[i];
    }
    if(text.length==0){
        return "```Heute sind absolut keine wichtigen Spiele oder die SPiele sind kostenpflichtig \n```"
    }
    console.log(txt);

    return txt +"```";
     // return "```Match-Fixtures \nBody text blah blah```"; 
    }

client.login(process.env.TOKEN);
