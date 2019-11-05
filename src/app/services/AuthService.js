import userService from './UserService'
import keystone from '../../config/keystone';
import axios from "axios"
class AuthService
{

    async getToken(username,password,tenantName)
    {

    let result = false;
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
                 "name":tenantName
              }
          }
      }
  } 
     
        await axios.post(keystone.url +"/v3/auth/tokens", data).then(response=>{
            result = result =  response.headers['x-subject-token'];
        }).catch(error=>{
            response = error;
        }) 

        return result;
    }

    async auth(username,password,tenantName)
    {
      
        let result = {
            success:false,
            message :'',
            token:""
           
        };
        if(username)
        {
           
            const response = await userService.getByName(username);
            result.token = response;
            if(response.success)
            {
                console.log(username,password,tenantName);
                   let token = await this.getToken(username,password,tenantName)
                   if(token)
                   {
                       result.success = true;
                       result.message =  "Token foi gerado com sucesso";
                       result.token =  token;
                   }
                   else
                   {
                       result.token = username;
                       result.message = 'Error ao tentar se autenticar';
                   }
            }
        }
        return result;
    }
}
export default new AuthService();