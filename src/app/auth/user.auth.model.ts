export class UserAuthDataModel{
    
    constructor(public eamil:string,public id:string,private _token:string,private _tokenExp:Date){  }
    
    get token(){
        if(!this._tokenExp||new Date() > this._tokenExp){
            return null
        }
        return this._token
    }
    
    get expTime(){
        return this._tokenExp
    }
}