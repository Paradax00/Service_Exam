const { Pharmacie } = require("../models/pharmacie.model");
const { RDV } = require("../models/rdv.model");
const { Dose } = require("../models/dose.model");
const { User } = require("../models/user.model");
module.exports = {
    createPharamcies: async ()=>{
        const liste = await Pharmacie.find();
        if(liste.length == 0){
            const pharmacies = [
                new Pharmacie({ title: "Pharmacie Nabil Kriaa", address: "El Ghazela", image: "ph1.jpg"}),
                new Pharmacie({ title: "Pharmacie Dhouib Kamoun", address: "Ariana", image: "ph2.jpg"}),
                new Pharmacie({ title: "Pharmacie  Aymen Riahi", address: "El Menzah", image: "ph3.jpg"})
            ]

            await Pharmacie.insertMany(pharmacies);
            console.log("Liste de pharmacies mis à jours");
        }else{
            console.log("Liste de pharmacies mis à jours");
        }
    },
    list: async (req,res)=>{
        const liste = await Pharmacie.find();
        res.json(liste);
    },
    listRdz: async (req,res)=>{
        const liste = await RDV.find();
        if(liste.length == 0){
            const rdvs = [
                new RDV({type: "Pfizer-BioNTech", date : "20-01-2022" }),
                new RDV({type: "Moderna", date : "22-01-2022" }),
                new RDV({ type: "Johnson & Johnson’s Janssen", date : "24-01-2022" }),
                new RDV({ type: "AstraZeneca", date : "16-01-2022" }),
            ]
            await RDV.insertMany(rdvs);
            return res.json(rdvs)
        } 
        res.json(liste)
    },
    listeDose: async (req,res)=>{
       const { _id } = req.params;
       const doses = await Dose.find({ user : _id });
       res.json(doses)
    },
    createDose: async (req,res)=>{
        const { user_id, rdv_id } = req.body;
        const doseExists = await Dose.find({ user : user_id });

        if(doseExists.length > 1){
            return res.status(401).json({ message: "Vous avez déjà pris deux doses" })
        }
        const rdv = await RDV.findOne({ _id : rdv_id });
        if(!rdv){
            return res.status(404).json({ message: "rendez-vou introuvable" })
        }

        const dose = new Dose({
            user: user_id,
            type: rdv.type,
            date: rdv.date
        })

        await dose.save();
        res.json({ message : "Dose prise avec succés" });
    },
    certificate: async (req,res)=>{
        const { _id } = req.params;
        const user = await User.findById(_id);
        const doses  = await Dose.find({ user : _id });
        if(doses.length == 2){
            return res.status(200).json(
                {
                    etat: "vacciné",
                    qr_code : "qr_code.png",
                    nom: user.nom,
                    code: user.code.toString(),
                    prenom: user.prenom,
                    email: user.email,
                }
            )
        }

        return res.status(401).json(
            {
                etat: "non vacciné",
                qr_code : "",
                nom: user.nom,
                code: user.code.toString(),
                prenom: user.prenom,
                email: user.email,
            }
        )
    }
}