const Post = require("../models/Post");//if things break remove this

module.exports = {
  getIndex: async (req, res) => {
    try {
      const posts = await Post.find({ dummyproperty: "dummyvalue"});
      res.render("index.ejs", { info: posts, user: req.user });
    } catch (err) {
        console.log(err);
    }
  },

  getCalendar: async (req, res) => {
    try {
      console.log(req);
      const posts = await Post.find({ dummyproperty: "dummyvalue"});
      res.render("calendar.ejs", { info: posts, user: req.user });
    } catch (err) {
    console.log(err);
    }
  }
}



/*module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
  }; if things break restore this*/ 