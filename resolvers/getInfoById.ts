import {Request,Response} from "npm:@types/express";
import { CharacterModel, CharacterModelType } from "../db/character.ts";

export const getInfoById = async (req : Request,res : Response) => {
    const character : CharacterModelType | null = await CharacterModel.findById(req.params.id);
    if(character === null){
        res.status(404).send("Character not found.");
        return;
    }
    else{
        res.status(200).send(character);
    }
}