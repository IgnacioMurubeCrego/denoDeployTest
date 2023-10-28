// @ts-ignore
import {Request, Response} from "npm:express@4.18.2";
import { CharacterModel, CharacterModelType } from "../db/character.ts";

export const getAll = async (req:Request, res : Response) => {
    try{
    const characters : CharacterModelType[] = await CharacterModel.find();
    res.send(characters);
    }catch(e){
        console.log(e);
    }
    
}