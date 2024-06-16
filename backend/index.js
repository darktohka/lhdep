const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://bartisandrea:kReEFRvlE9RwehxV@cluster0.lclv73w.mongodb.net/e-commerce")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB: ", error);
    });

app.get("/", (req, res) => {
    res.send("Express App is Running");
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post("/upload", upload.array('product', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: 0, error: 'No files uploaded' });
        }

        const image_urls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
        
        res.json({
            success: 1,
            image_urls: image_urls
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).json({ success: 0, error: 'Internal server error' });
    }
});


const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    description: {
        type: String, 
        required: false, 
    },
    images:{
        type: [String],
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avaliable:{
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
        {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id+1;
        }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        description: req.body.description,
        images:req.body.images,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name: req.body.name,
    })
})

//api for deleting products

app.post('/removeproduct',async (req,res) =>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name: req.body.name
    })
})

//api for getting all products

app.get('/allproducts', async (req,res) =>{
    let products = await Product.find({});
        console.log("All Products Fetched");
        res.send(products);
})

//api for getting all users

app.get('/allusers', async (req, res) => {
    try {
        const users = await Users.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
});

//api for updating products
app.post('/updateproduct', async (req, res) => {
    try {
        const { id, name, description, images, category, new_price, old_price, available } = req.body;

        // Ensure that ID is a valid number
        if (typeof id !== 'number') {
            return res.status(400).json({ success: false, error: 'Invalid product ID' });
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { id: id }, // Find product by its custom id
            {
                name,
                description,
                images,
                category,
                new_price,
                old_price,
                available
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found or failed to update' });
        }

        res.json({
            success: true,
            message: 'Product updated successfully',
            updatedProduct,
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//user model 
const Users = mongoose.model('Users', {
    name:{
        type: String,
    },
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String,
    },
    phone:{
        type:Number,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//creating endpoint for registrating the user
app.post('/signup', async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"existing user found with same email"})
        
    }
    let cart = {};
    for (let i =0; i < 300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true, token})
})

//endpoint for user login
app.post('/login',async (req,res) =>{

    let user = await Users.findOne({email:req.body.email});

    if (user){
        const passCompare = req.body.password === user.password;
        if (passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({
            success:false, errors:"wrong email id"
        });
    }
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});