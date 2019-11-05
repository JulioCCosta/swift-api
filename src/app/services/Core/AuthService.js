import TokenService from '../services/OpenStack/Keystone/TokenService'
import userService from '../OpenStack/Keystone/UserService'

class AuthService
{
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
                   let token = await TokenService.checkToken(username,password,tenantName)
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