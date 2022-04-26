export class signin2Response{

  public id:number ;
  public username:string;
 public email:string;
 public tokenType:string;
 public accessToken:string;
 public roles:string[];
 constructor(){
   this.id=0;
   this.email="";
   this.username="";
   this.tokenType="";
   this.accessToken=""
   this.roles=[];
 }

}
