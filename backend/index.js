const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



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
const Order = mongoose.model("Order", {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    cartItems: {
        type: Object,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    deliveryOption: {
        type: String, // "pickup" or "delivery"
        required: true,
    },
    address: {
        type: String, // only required if deliveryOption is "delivery"
        required: function() {
            return this.deliveryOption === "delivery";
        },
    },
    phone: {
        type: Number, // Add phone number field
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    scheduledDate: {  // Nou câmp pentru data programată
        type: Date,
        required: true,
    },
    scheduledTime: {  // Nou câmp pentru ora programată
        type: String,
        required: true,
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
    for (let i =0; i < 500; i++){
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

app.get('/oferte', async (req,res)=>{
    let products = await Product.find({});
    let oferte = products.slice(1).slice(-4);
    console.log("Oferte Fetched");
    res.send(oferte);
})

app.get('/recomandari', async (req,res)=>{
    let products = await Product.find({});
    let recomandari = products.slice(0,5);
    console.log("Recomandari Fetched");
    res.send(recomandari);
})

//fetch user
    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else{
            try{
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            } catch(error){
                res.status(401).send({errors:"please authenticate using a valid token"})
            }
        }
    }

//endpoint for cartdata
app.post('/addtocart',fetchUser, async (req,res)=>{
    console.log("added", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added!")
   // res.json({ success: true, message: 'Item added to cart' }); // Send a success response

})

//endpoint remove product from cartdata
app.post('/removefromcart', fetchUser, async (req,res)=>{
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ success: true, message: 'Item removed from cart' }); // Send a success response

})

//get cartdata
app.post('/getcart', fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

app.post('/createorder', fetchUser, async (req, res) => {
    const { cartItems, totalAmount, deliveryOption, address, deliveryDateTime } = req.body;
  
    if (!deliveryDateTime || !deliveryDateTime.date || !deliveryDateTime.time) {
      return res.status(400).json({ success: false, error: 'Scheduled date and time are required' });
    }
  
    const { date, time } = deliveryDateTime;
  
    // Proceed to create the order using date and time
    const newOrder = new Order({
      userId: req.user.id,
      cartItems,
      totalAmount,
      deliveryOption,
      address: deliveryOption === 'delivery' ? address : null,
      scheduledDate: date,
      scheduledTime: time,
      phone: req.body.phone,
    });
  
    await newOrder.save();
  
    res.json({ success: true, message: 'Comanda a fost plasată cu succes', order: newOrder });
  });
  
  

// Exemplu de modificare a rutei pentru preluarea comenzilor
app.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find({})
            .select('userId cartItems totalAmount deliveryOption address phone status date scheduledDate scheduledTime') // Selectează doar câmpurile necesare
            .populate('userId', 'name email phone'); // Populează cu detalii despre utilizator (name, email, phone)
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch orders' });
    }
});

app.patch("/admin/orders/:orderId/finalize", async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({ success: false, error: "Order not found" });
      }
  
      res.json({ success: true, updatedOrder });
    } catch (error) {
      console.error("Error finalizing order:", error);
      res.status(500).json({ success: false, error: "Failed to finalize order" });
    }
  });
  
    app.post('/admin/orders/:orderId/removeorder', async (req, res) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        res.json({ success: true, deletedOrder });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, error: 'Failed to delete order' });
    }
});



app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
