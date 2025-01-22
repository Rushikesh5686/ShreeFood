const mongoose = require('mongoose');

const db = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://rushibundhe2020:rushikesh@cluster0.0hm9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Fetch data from the 'food_item' collection
    const fetch_data = mongoose.connection.db.collection('food_item');
    const data = await fetch_data.find({}).toArray();
    const foodCategory = mongoose.connection.db.collection('foodCategory');
    const catdata=await foodCategory.find({}).toArray();
    global.food_item=data 
    global.foodCategory=catdata
    //console.log(catdata)
    // Log the data or assign it as needed
   
    //console.log(global.food_item)

    // Return the data instead of using a global variable
    return data;
  } catch (err) {
    console.error('Error connecting to MongoDB or fetching data:', err);
    throw err; // Rethrow the error to handle it in the caller
  }
};

module.exports = db;
