import axios from "axios";
import keystone from '../../config/keystone';
class  KeystoneService
{

async generateToken()
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
                            "name": keystone.username, 
                            "password": keystone.password, 
                            "domain": {
                                "name": "Default"
                            }
                        }
                    }
                },
                "scope": {
                    "project": {
                       "domain":{"id":"default"},
                       "name":keystone.tenantName
                    }
                }
            }
        } 
           
             return await axios.post(keystone.url + "/v3/auth/tokens", data) 
         
}

async checkToken()
{
        let result  = null;
    await this.generateToken().then(response=>{
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

export default new KeystoneService();
