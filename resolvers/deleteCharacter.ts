import {Request, Response} from "npm:@types/express";
import {CharacterModel} from "../db/character.ts";

export const deleteCharacter = async (req : Request, res : Response) => {

    const discToDelete = await CharacterModel.findOne().where("id").equals(req.params.id).exec();

    if(!discToDelete){
        res.status(404).send("Character not found in Mongo database");
        return;
    } else{
        await CharacterModel.deleteOne().where("id").equals(req.params.id).exec();
        res.status(200).send("Character deleted from Mongo database.");
    }
  }