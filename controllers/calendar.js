const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Post = require("../models/Post");

exports.postUserSelect = (req, res) => {
    const newVariable = document.getElementById("somethingidk").value;
    console.log(newVariable)
}

/*What am I trying to do?

I want to have a form on my page and be able to grab whatever value the user inputs into the form.
I want to be able to take that value (which I'm testing by logging it into the console) and then go into my
users collection in my Mongo Database and append that value as the value of the fmUsername property, if
user exists.

Then re-write the calendar page so that if req.user.fmUsername exists, we use that as the value that's currently
created by prompt, the value that determines how the calendar will be made.

Remove the prompt thing from JavaScript entirely.

*/