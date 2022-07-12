const { User } = require("../models/user.model");

const generateCode = (previousCode) =>{
    let newCode = previousCode +1;
    return newCode;
}


module.exports = {
    login: async (req,res)=>{
        const { code } = req.body;
        const user = await User.findOne({code});
        if(user){
            return res.json(user)
        }
        return res.status(401).json({ message: "Le code fournit est incorrecte" })
    },
    list: async (req,res)=>{
        const users = await User.find();
        res.json(users);
    },
    createUsers: async ()=>{
        const liste = await User.find();
        if(liste.length == 0){
            const users = [
                new User({ nom: "Hjiri", prenom: "Wiem", email: "wiem.hjiri@esprit.tn", year: 1990, code: 102 }),
                new User({ nom: "Sta", prenom: "Yassine", email: "yassine.sta@esprit.tn", year: 1990, code: 104 }),
                new User({ nom: "Aissa", prenom: "Abdel Monem", email: "abdelmonem.aissa@esprit.tn", year: 1990, code: 125 }),
                new User({ nom: "Guedria", prenom: "Khaled", email: "khaled.guedria@esprit.tn", year: 1990, code: 132 }),
            ]

            await User.insertMany(users);
            console.log("Liste de users mis à jours");
        }else{
            console.log("Liste de users mis à jours");
        }
    }
}