import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb+srv://adrianorodrigoteixeira:armariolivre@clusterarmariolivre.tc5gdjg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterArmarioLivre");

const armariolivre = mongoose.model("ArmarioLivre", new Schema({
    nome:{type:String,required:true,min:3,max:200},
    sobrenome:{type:String,required:true,min:4,max:200},
    donate:{type:String,required:true,min:4,max:200},
    cep:{type:String,required:true,min:11,max:200},
    rua: {type:String,required:true},
    numero:{type:Number,required:true},
    bairro: {type:String,required:true,min:3,max:200},
    cidade: {type:String,required:true,min:3,max:200},
    estado: {type:String,required:true,min:2,max:200}
}));



export default armariolivre