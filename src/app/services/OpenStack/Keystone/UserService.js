import axios from "axios";
import KeystoneService from './TokenService'
import keystone from '../../../../config/keystone';

class UserService{

    constructor() {
        this.token = null;
        this._init();
   
      }
   
    async _init()
    {
        const token = await KeystoneService.checkToken();
        this.token = token;

    }

    async getUsers(req)
    {
        let result = {
            "success": "",
            "users":null
        };
        
        let config = {
            headers: {
              "X-Auth-Token": req.headers['x-auth-token'],
            }
          }
               await axios.get(keystone.url +"/v3/users",config).then(response=>{
                 result.users = response.data.users;
                 result.success = 200;
                 
                 
             }).catch(error=>{
                
                 result.success = false;
                 
             })
             
             return result;
    }

    async create(data)
    {
        console.log(data);
        let result = {
            success: "",
            message :"",
           
        };
        
        let config = {
            headers:{
                "X-Auth-Token" : data.headers['x-auth-token'],
            
            }
        }   

        await axios.post( keystone.url + "/v3/users",data.body,config).then(response=>{
            result.success = true;
            result.message = "Usuário criado com sucesso";
        }).catch(error=>{
           
            result.success = false;
            result.message = error;
        })

        return result;
    }

    async delete(id,req)
    {
        let result = {
            success: "",
            message :'',
           
        };

        let config = {
            headers:{
                "X-Auth-Token" : req.headers['x-auth-token'],
            
            }
        }   

        await axios.delete(keystone.url + "/v3/users" + id ,config).then(response=>{
            result.success = true;
            result.message = "Usuário foi exclúido com sucesso";
        }).catch(error=>{
            result.success = false;
            result.message = error;
        })
    }

    async getByName(name)
    {
        
        let result = {
            success: false,
            user :'',
           
        };

        let config = {
            headers:{
                "X-Auth-Token" : this.token
            }
        } 
        await axios.get( keystone.url + "/v3/users",config).then(response=>{
            Object.keys(response.data.users).forEach(key => {
                let user = response.data.users[key];
                console.log(name);
               if(user.name == name){
                   result.success = true;
                   result.user = user;
                 
               }
              
              });

        }).catch(error=>{
           
            result.success = false;
            
        })
        return result;  


    }

    async getById(id)
    {
        
        let result = {
            success: "",
            user :'',
           
        };

        let config = {
            headers:{
                "X-Auth-Token" : token
            }
        } 
    
        await axios.get(keystone.url + "/v3/users/" + id).then(response=>{
            result.success = true;
            result.user = response.data.user;
            
        }).catch(error=>{
            result.success = false;
        })


    }
    


}
export default new UserService