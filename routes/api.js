var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var db = require('../models/proverb');
var acc = require('../models/user');

router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.get('/categories', (req, res) => {
  db.Category.find({})
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          text: el.text,
          id: el.id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/category/:id', (req, res) => {
  db.Proverb.aggregate([
    {
      $match: {category: new mongoose.Types.ObjectId(req.params.id)}
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryP"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "_id",
        as: "countryP"
      }
    },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authorP"
      }
    }
  ])
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          id: el._id,
          text: el.text,
          category: el.categoryP[0].text,
          categoryId: el.categoryP[0]._id,
          country: el.countryP[0].name,
          countryId: el.countryP[0]._id,
          author: el.authorP[0].name,
          authorId: el.authorP[0]._id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/countries', (req, res) => {
  db.Country.find({})
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          name: el.name,
          id: el.id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/country/:id', (req, res) => {
  db.Proverb.aggregate([
    {
      $match: {country: new mongoose.Types.ObjectId(req.params.id)}
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryP"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "_id",
        as: "countryP"
      }
    },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authorP"
      }
    }
  ])
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          id: el._id,
          text: el.text,
          category: el.categoryP[0].text,
          categoryId: el.categoryP[0]._id,
          country: el.countryP[0].name,
          countryId: el.countryP[0]._id,
          author: el.authorP[0].name,
          authorId: el.authorP[0]._id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/authors', (req, res) => {
  db.Author.find({})
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          name: el.name,
          id: el.id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/author/:id', (req, res) => {
  db.Proverb.aggregate([
    {
      $match: {author: new mongoose.Types.ObjectId(req.params.id)}
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryP"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "_id",
        as: "countryP"
      }
    },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authorP"
      }
    }
  ])
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          id: el._id,
          text: el.text,
          category: el.categoryP[0].text,
          categoryId: el.categoryP[0]._id,
          country: el.countryP[0].name,
          countryId: el.countryP[0]._id,
          author: el.authorP[0].name,
          authorId: el.authorP[0]._id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.post('/search', (req, res) => {
  db.Proverb.aggregate([
    {
      $match: {text: new RegExp(req.body.text, 'ig')}
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryP"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "_id",
        as: "countryP"
      }
    },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authorP"
      }
    }
  ])
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          id: el._id,
          text: el.text,
          category: el.categoryP[0].text,
          categoryId: el.categoryP[0]._id,
          country: el.countryP[0].name,
          countryId: el.countryP[0]._id,
          author: el.authorP[0].name,
          authorId: el.authorP[0]._id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/random', (req, res) => {
  db.Proverb.aggregate([
    {
      $sample: {size: 5}
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryP"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "_id",
        as: "countryP"
      }
    },
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "authorP"
      }
    }
  ])
    .then(data => {
      const response = []
      data.forEach(el => {
        response.push({
          id: el._id,
          text: el.text,
          category: el.categoryP[0].text,
          categoryId: el.categoryP[0]._id,
          country: el.countryP[0].name,
          countryId: el.countryP[0]._id,
          author: el.authorP[0].name,
          authorId: el.authorP[0]._id
        })
      })
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.post('/new/proverb', (req, res) => {
  const proverb = new db.Proverb({
    text: req.body.text,
    category: req.body.category,
    country: req.body.country,
    author: req.body.author
  })
  proverb.save()
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.post('/edit/proverb', (req, res) => {
  const id = req.body.id
  const proverb = {
    text: req.body.text,
    category: req.body.category,
    country: req.body.country,
    author: req.body.author
  }
  db.Proverb.findByIdAndUpdate(id, proverb)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.post('/delete/proverb', (req, res) => {
  db.Proverb.findByIdAndRemove(req.body.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.post('/user/add', (req, res) => {
  const vkId = parseInt(req.body.vkId)
  acc.User.findOne({vkId})
    .then(el => {
      let category = 0
      if (el === null) {
        const user = new acc.User({vkId})
        user.save()
      } else {
        category = el.category
      }
      res.json(category)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.get('/user/:id', (req, res) => {
  const vkId = req.params.id
  acc.User.findOne({vkId})
    .then(el => {
      const response = el ? el.category : null
      res.json(response)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

module.exports = router;
