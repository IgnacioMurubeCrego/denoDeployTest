import {Request, Response} from "npm:@types/express";
import { CharacterModel, CharacterModelType } from "../db/character.ts";

export const updateCharacter =  async (req : Request, res : Response) =>{

    const body : Partial<Omit<CharacterModelType, "_id">> = req.body;
    const {name, race, description, skills} = body;
    if(!race){
        res.status(500).send("Missing Fields in Uploaded Character Body");
        return;
    }

    const oldCharacter = await CharacterModel.findOne().where("id").equals(req.params.id).exec();

    if(!oldCharacter){
        res.status(404).send("Character not found in Mongo database");
        return;
    } else{

        const updatedCharacter = await CharacterModel.create({
            name,
            race, 
            description,
            skills 
        });

    await CharacterModel.findOneAndReplace(oldCharacter.id,updatedCharacter);
    res.status(200).send({
        name : updatedCharacter.name,
        race : updatedCharacter.race, 
        description : updatedCharacter.description,
        skills : updatedCharacter.skills,
        id : updatedCharacter.id
    });
}
}