const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const co = require('co');

const db = require('../models/proverb');

///mongoose.connect('mongodb://poshat:qwerty00@ds127802.mlab.com:27802/poshat', {useMongoClient: true});
//mongoose.connect('mongodb://dbuser:oFpxqW71@127.0.0.1:27017/proverbs', {useMongoClient: true});
mongoose.connect('mongodb://poshat1:oFpxqW71@127.0.0.1:27017/razdumki', {useMongoClient: true});

mongoose.Promise = global.Promise;

//получаем поговорки из файла
const filePath = path.join(__dirname, '../provers.txt.csv');
fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      //делим на строки
      const arr = data.split('\n');

      //делим на категории, текст, страну
      const proverbs = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          const str = arr[i].split('|');
          const proverb = {};
          proverb.text = str[0];
          proverb.category = str[1];
          proverb.country = str[2];
          proverb.author = 'Без автора';
          proverbs.push(proverb);
        }
      }

      //сохраняем в базе данных
      saveToDB(proverbs);
    } else {
      console.log(err);
    }
});

function saveToDB(proverbs) {

  const cats = {
    category: [],
    author: [],
    country: []
  }

  proverbs.map(el => {
    if (!cats.category.includes(el.category)) cats.category.push(el.category)
    if (!cats.author.includes(el.author)) cats.author.push(el.author)
    if (!cats.country.includes(el.country)) cats.country.push(el.country)
  })

  const uniqCats = {
    category: _.uniq(cats.category),
    author: _.uniq(cats.author),
    country: _.uniq(cats.country)
  }

  co(function *() {
    for (let i = 0; i < uniqCats.category.length; i++) {
      const record = new db.Category({
        text: uniqCats.category[i]
      })
      yield record.save()
    }
    for (let i = 0; i < uniqCats.author.length; i++) {
      const record = new db.Author({
        name: uniqCats.author[i]
      })
      yield record.save()
    }
    for (let i = 0; i < uniqCats.country.length; i++) {
      const record = new db.Country({
        name: uniqCats.country[i]
      })
      yield record.save()
    }
    console.log('Done writing categories')

    // writing proverbs

    for (let i = 0; i < proverbs.length; i++) {
      const proverb = proverbs[i]
      const text = proverb.text
      const category = yield db.Category.findOne({text: proverb.category})
      const author = yield db.Author.findOne({name: proverb.author})
      const country = yield db.Country.findOne({name: proverb.country})

      const record = new db.Proverb({
        text,
        category,
        author,
        country
      })
      yield record.save()
    }

    console.log('All done')
  }).catch(err => console.log(err))

}
