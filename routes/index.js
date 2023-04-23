const express = require("express");
const User = require("../models/userSchema");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("hig", req.body);
    let users=[];
    switch(req.body.type){
      case "INCOME":
        users = await User.find({$and:[{income:{ $lt: '$5' }},{$or : [{car : 'BMW'},{car : 'Mercedes'}]}]});
        break;
      case "PHONE":
        users = await User.find({$and:[{ phone_price:{ $gt: '10000' }},{gender : 'Male'}]});
        break;
      case "STARTS_M":
        users = await User.find({$and:[{ last_name:/^M/},{quote: {$regex:/^.{16,}$/}}]});
        break;
      case "EMAIL":
        users = await User.find({$and:[{$or:[{car:'BMW'},{car:'Mercedes'}]},{email:{$not:/\d/}}]});
        break;
      case "TOP_TEN":
          users_data = await User.aggregate([{
            $group:{_id:"$city",
            count:{$sum:1},
            //  avgIncome:{$avg:{$toDecimal:{ $trim:{ input:"$income", chars: "$" }} }},   
             users:{$push:"$$ROOT"}     
            },        
              },
              { $sort: { count: -1 } },
              {$limit:10}
            ])
            for (let i = 0; i < users_data.length; i++) 
                users = users.concat(users_data[i].users);  
            break;
        
        default:
          users = await User.find({});
          break;
    }
  
    
    res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

    res.status(200).json(users);
  } catch {
    (err) => {
      res.json("unable to find server");
    };
  }
});module.exports = router;
