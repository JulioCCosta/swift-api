import authService from '../services/AuthService'
import roleService from '../services/RoleService'

class LoginController
{
    async login(req,res)
    {
        const { body } = req;
        const user = await authService.auth(body.username,body.password,body.tenantName);
        if(user.success)
        {
       
          res.set("X-Auth-Token",user)
          return res.json(user.token);
        }
        return res.json(user);
    }

    async logout(req,res)
    {

     
        const roles = await roleService.getAll(req);
        if(roles)
        {
          return res.json(roles.data);
        }
        return res.json("Error");

    }
}


export default new LoginController();