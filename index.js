const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
// const upload = require("./models/upload");
const User = require("./models/user")
const InfoSection = require("./models/product"); // Import the InfoSection model
const {upload,uploadMultiple} = require("./models/upload")
const HotamProduct = require("./models/hotam")
const Contact = require("./models/contact")
const port = 4000;
const app = express();
const db = require("./config/mongoose");
const Gallery= require("./models/gallery");
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
// Configure Nodemailer transporter
const userRouter = require('./routes/user');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kumaramit28538@gmail.com',
        pass: 'vbxl bnpw jkbp tcky'
    }
});

app.use('/user', userRouter);
// Route to send email
app.post("/send-email", (req, res) => {
    const { to, subject, text } = req.body;
    console.log("to", to);
    const emaillist = [to, 'kumaramit28538@gmail.com'].join(","); // Convert array to comma-separated string

    const mailOptions = {
        from: 'kumaramit28538@gmail.com',
        to: emaillist,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email: ", error);
            return res.status(500).send("Error sending email");
        }
        console.log("Email sent: ", info.response);
        res.status(200).send("Email sent successfully");
    });
});


// Route to create a new product (info section)
app.post("/product", async (req, res) => {
    try {
        const newInfoSection = new InfoSection(req.body);
        await newInfoSection.save();
        res.status(201).send(newInfoSection);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Error creating product");
    }
});

// Route to delete a product by ID
app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await InfoSection.findByIdAndDelete(id);
        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});

app.get("/allproduct", async (req,res)=>{

        try{
    const project = await InfoSection.find();
    res.status(200).send({project});
        } catch(err){
             console.log("Error geting Projects ")
        }
});

app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await InfoSection.findByIdAndDelete(id);
        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});
 

// gallery 


app.post('/upload-multiple', (req, res) => {
   uploadMultiple(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (req.files === undefined) {
        return res.status(400).json({ message: 'No files selected!' });
      } else {
        try {
          const files = req.files.map(file => ({
            title: req.body.title,
            photo: file.path
          }));

          const newGalleryItems = await Gallery.insertMany(files);
          res.status(201).json(newGalleryItems);
        } catch (error) {
          res.status(500).json({ message: 'Error adding gallery items', error });
        }
      }
    }
  });
}); 

app.use("/gallery", async (req,res)=>{
    const allimages= await Gallery.find();
    return res.status(200).json({allimages})
})

app.delete("/delete-image/:id", async (req, res) => {
  try {
      const { id } = req.params;
      console.log("id",id)
      await   Gallery.findByIdAndDelete(id);
      res.status(200).send("Product deleted successfully");
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Error deleting product");
  }
});

app.post('/addcontact', async (req, res) => {
  const { name, email, mobile, instagram, facebook, pinterest } = req.body;

  if (!name || !email || !mobile) {
    return res.status(400).json({ error: 'Name, email, and mobile are required.' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      mobile,
      instagram,
      facebook,
      pinterest
    });

    await newContact.save();
    res.status(200).json({ message: 'Contact added successfully!', contact: newContact });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the contact.' });
  }
});


app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
  
    // Validate request body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(200).json({ message: 'Login Successfully' });
      }
  
    //   // Create a new user
    //   const newUser = new User({ username, password });
  
    //   // Save the user to the database
    //   await newUser.save();
  
      res.status(201).json({ message: 'Wrong Email/Password ' });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  });

  app.post('/logout', async (req,res)=>{
    return res.status(200).json({ message: 'Logout Successfully ',redirect: '/login' });
  })
 app.post('/addproducthotam', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.status(400).json({ message: err });
      } else {
        if(req.file == undefined){
          res.status(400).json({ message: 'No file selected!' });
        } else {
          const newProduct = new  HotamProduct({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            photo: req.file.path,
          });
  
          newProduct.save()
            .then(product => res.status(201).json(product))
            .catch(err => res.status(400).json({ message: 'Error adding product', error: err }));
        }
      }
    });
  });
  app.get("/allhotamproduct", async (req,res)=>{
    try{
const project = await  HotamProduct.find();
res.status(200).send({project});
    } catch(err){
         console.log("Error geting Projects ")
    }
});
app.delete("/hotamproduct/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await  HotamProduct.findByIdAndDelete(id);
        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});
 
app.put("/hotamproduct/:id", async(req,res)=>{
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await  HotamProduct.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
}
)

app.listen(port, (err) => {
    if (err) {
        console.log("Error in connecting server ", err);
    }
    console.log("Successfully connected on port ", port);
});
