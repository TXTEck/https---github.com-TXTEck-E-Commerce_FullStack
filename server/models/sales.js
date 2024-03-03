const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
   {
        customerName: {type: String,required:true},
        customerEmail: {type: String,required:true},
        paypalPaymentID: {type: String, required:true},
        price: {type: Number, required:true},
   },
   {
       collection: `sales`
   })

module.exports = mongoose.model(`sales`, salesSchema)