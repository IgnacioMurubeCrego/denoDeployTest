export enum RACES {
    Hobbit = "Hobbit",
    Human = "Human",
    Elf = "Elf",
    Dwarf = "Dwarf",
    Ent = "Ent"
}

export type Character = {
    name : string;
    race : RACES;
    description : string;
    skills : boolean;
    id : string;
}