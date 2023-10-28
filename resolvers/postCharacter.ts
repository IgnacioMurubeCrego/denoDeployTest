// @ts-ignore : ignored import error
import {Request, Response} from "npm:express@4.18.2";
import { CharacterModel, CharacterModelType } from "../db/character.ts";
import { RACES } from "../types.ts";

export const postCharacter =  async (req : Request, res : Response) =>{

    try{
    const body : Partial<Omit<CharacterModelType, "_id">> = req.body;
    const {name, race, description, skills} = body;
    if(!name || !name || !race || !description || !skills){
        res.status(500).send("Missing Fields in Uploaded Character Body");
        return;
    }

    if(!(Object.values(RACES).includes(race))){
        res.status(500).send("Invalid Race.");
        return;
    }

    if(typeof name !== "string" || typeof description !== "string"
    || typeof race !== "string" || typeof skills !== "string"){
        res.status(500).send("Invalid data type.");
        return;
    }

    const exists = await CharacterModel.findOne({name}).exec();

    if(exists){
        res.status(400).send("Character already exists.");
        return;
    }

    const newCharacter = await CharacterModel.create({name, race, description, skills});

    res.send({
        name : newCharacter.name,
        race : newCharacter.race, 
        description : newCharacter.description,
        skills : newCharacter.skills,
        id : newCharacter.id
    });

    }
    catch(e){
        console.log(e);
    }
};

export default postCharacter;