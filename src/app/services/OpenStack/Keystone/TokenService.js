import axios from "axios";
import keystone from '../../../../config/keystone';

class  TokenService
{

async generateToken(username, password, tenant)
{
    
     let data =
           {
            "auth": {
                "identity": {
                    "methods": [
                        "password"
                    ],
                    "password": {
                        "user": {
                            "name": username, 
                            "password": password, 
                            "domain": {
                                "name": "Default"
                            }
                        }
                    }
                },
                "scope": {
                    "project": {
                       "domain":{"id":"default"},
                       "name":tenant
                    }
                }
            }
        } 
           
             return await axios.post(keystone.url + "/v3/auth/tokens", data) 
         
}

async checkToken()
{
        let result  = null;
    await this.generateToken(keystone.username, keystone.password, keystone.tenant).then(response=>{
        if(response.headers.hasOwnProperty("x-subject-token"))
            {
                result =  response.headers['x-subject-token'];
            }
            else
            {
                result = "Invalid Token";
            }
            
    }).catch(error=>{
        console.log(error.message);
         result = error.message;
    })
       
    return result;
}
}

export default new TokenService();
