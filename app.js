const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [
  {
    // id: 1
    firstname: "Ruqayaah",
    lastname: "Sabitu",
    email: "aderinolaruqayaah@gmail.com",
    password: "January14",
  },
  {
    // id: 2,
    firstname: "Abigail",
    lastname: "Folarin",
    email: "af@gmail.com",
    password: "January18",
  },
  {
    // id: 3,
    firstname: "Lani",
    lastname: "Oluwajuyitan",
    email: "lo@gmail.com",
    password: "January22",
  },
  {
    // id: 4,
    firstname: "Modupe",
    lastname: "Falodun",
    email: "mf@gmail.com",
    password: "January26",
  },
  {
    // id: 5,
    firstname: "Peculiar",
    lastname: "Erhis",
    email: "pe@gmail.com",
    password: "January30",
  },
];

app.use("/users/:email", (req, res, next) => {
  const { email } = req.params;
  const currentUser = users.find((el) => el.email === email);
  if(currentUser) {
    req.data = currentUser;
    return next();
  }
  res.status(404).json({
    status: "Failed",
    message: 'Account does not exist. Kindly login'
  });
});

app.get("/users", (req, res) => res.status(200).json(users));


// when registering
app.post("/users/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      status: "Failed",
      message: "Please fill in all your details",
    });
  }
  if (users.find((el) => el.email == email)) {
    return res.status(400).json({
      status: "Failed",
      message: "Email already exists",
    });
  }
  users.push(req.body);
  res.status(201).json({
    status: "Successful",
    message: "Your account has been successfully created"
  })
});

// when logging in
app.get("/users/:email", (req, res) => { 
  return res.status(200).json({
    status: "Successfully logged in",
    message: "User fetched successfully",
    data: req.data,
  })
});


// // when editing password
// app.patch(, (req, res) =>
//     res.send()
// );

// // when editing firstname
// app.put( ,(req, res) =>
//     res.send
// )

// // when editing lastname
// app.put( ,(req, res) =>
//     res.send
// )

app.listen(3000);
