import { Router } from "express";
import Transaction from "../models/Transaction.js ";
const router=Router();

// sending json response to /transaction  when http GET request to given URL
router.get('/',async(req,res)=>{
    const transaction=await Transaction.find({}).sort({createdAt:-1})
    res.json({data:transaction})
})

// create transaction using /transaction url
router.post('/', async(req, res) => {
    const { amount, description, date } = req.body
    const transaction = new Transaction({
        amount, description, date
    });
    // transaction save in mongoDB
    await transaction.save()
    res.json({ message: "Success" })
})

// Delete transaction using /transaction/:id 
router.delete('/:id',async(req,res)=>{
    await Transaction.findOneAndDelete({_id:req.params.id})
    res.json({message:"Deleted"})
})

router.patch('/:id',async(req,res)=>{
    await Transaction.updateOne({_id:req.params.id},{$set:req.body})
    res.json({message:"Updated"})
})
export default router