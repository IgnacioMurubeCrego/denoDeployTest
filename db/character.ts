import mongoose from "npm:mongoose@7.6.3";
import { Character, RACES } from "../types.ts";

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name : { type: String, required : true, unique : true},
    race: {type : String, enum: RACES, required : true},
    description: {type : String, required : true},
    skills: {type : String, required : false, default : false}
}, {
    timestamps : true, // Created at / Updated at ...
});

export type CharacterModelType = mongoose.Document & Omit<Character, "id">;

export const CharacterModel = mongoose.model<CharacterModelType>(
    "character",
    CharacterSchema
);
