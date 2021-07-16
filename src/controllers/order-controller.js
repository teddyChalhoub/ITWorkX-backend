import orderModel from "../models/order-model"


exports.getAllOrders = (req,res,next)=>{

}

exports.addOrder = (req,res,next)=>{
    
}

exports.updateOrder = (req,res,next)=>{
    
}

exports.deleteOrder = (req,res,next)=>{

}


const handleError = (error, res) => {
    res.json({ success: false, message: error.message });
  };
  