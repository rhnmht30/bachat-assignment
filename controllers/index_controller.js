require("dotenv").config();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

module.exports.home = (req, res) => {
  const URL = `http://localhost:${process.env.PORT}/api/v1`;
  const html = `
  <h1>Welcome to Bachat API Menu</h1>
  <br>
  Base URL: <b>${URL}</b>
  <br>
  Routes:
  <br>
  <ul>
  <li>METHOD: Post<br>URL: <b>${URL}/add_user</b><br>BODY:email,googleId,name</li><br>
  <li>METHOD: Post<br>URL: <b>${URL}/add_transaction/:email</b><br>BODY: type,amount,bank</li>
  </ul>`;
  return res.send(html);
};

module.exports.add_user = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(404).json({ message: "error" });
    if (user) return res.json({ message: "user already exists" });
    else {
      let user = new User({
        email: req.body.email,
        googleId: req.body.googleId,
        name: req.body.name
      });

      user
        .save()
        .then(user => {
          return res.json({ message: "user created" });
        })
        .catch(err => {
          return res.status(404).json({ message: "error" });
        });
    }
  });
};

module.exports.add_transaction = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) return res.status(404).json({ message: "error" });
    if (user) {
      let newTransaction = new Transaction({
        type: req.body.type,
        amount: req.body.amount,
        userId: user._id,
        bank: req.body.bank
      });

      newTransaction
        .save()
        .then(transaction => {
          let updateContent = {
            wallet: {
              budget: user.wallet.budget,
              spent: user.wallet.spent + Number(req.body.amount)
            }
          };

          User.updateOne(
            { email: user.email },
            updateContent,
            (err, dataUpdated) => {
              if (err) return res.status(404).json({ message: "error" });
              return res.json({ message: "transaction recorded" });
            }
          );
        })
        .catch(err => {
          return res.status(404).json({ message: "error" });
        });
    } else return res.status(400).json({ message: "no user found" });
  });
};
