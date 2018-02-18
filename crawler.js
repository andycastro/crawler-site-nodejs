var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

var website = "Jovem Nerd";
var target = "Nerd News / Tecnologia";

var url = [
    "https://jovemnerd.com.br/nerdnews/categoria/tech/?search=&category=tech&page=1", 
    "https://jovemnerd.com.br/nerdnews/categoria/tech/?search=&category=tech&page=2", 
    "https://jovemnerd.com.br/nerdnews/categoria/tech/?search=&category=tech&page=3"
];

console.log("--- SITE: " + website + " ---");
console.log("---TARGET: " + target + " ---");

var initial = "";
var i = 0;
while(i <= 2){
    initial += i;
    console.log("--- Resultado das Páginas " + url[i] + " ---");
    console.log("====");
    request(url[i], function(err, res, body){
        if (err) console.log('Erro: ' + err);
        var $ = cheerio.load(body);
        $('.entry-card__nerdnews').each(function(){
            var dataPost = $(this).find('.entry-card__content .screen-reader-text').text().trim();
            var title = $(this).find('.entry-card .entry-card__content-title').text().trim();
            var content = $(this).find('.entry-card .entry-card__content-excerpt').text().trim();
    
            console.log('Matérias: ' + dataPost + ' - ' + title + ' - ' + content);
            fs.appendFile('materia.txt', dataPost + ' ' + title + ' ' + content + '\n', (error) => {'Error'});
        })
    });
    ++i
}