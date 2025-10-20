import { Identity } from "./Identity";

export class Entity<T>{
    private readonly _identity:Identity;
    protected _attributes:T;

    protected constructor(attibutes:T,id?:Identity){
        this._attributes = attibutes;
        this._identity = id ?? new Identity();
    }

    get identity():Identity{
        return this._identity;
    }
}