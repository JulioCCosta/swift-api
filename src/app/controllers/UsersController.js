
import keystoneService from '../services/KeystoneService'
import userService from '../services/UserService'


class UsersController {
  async index(req, res) {

  
      const response = await userService.getUsers(req);
     
      if(response.success)
      {
        return res.json(response.users);
      }
      
  
      
      return res.json({ error: 'Token invalido' });     
  }

  async store(req, res) {
   
    const { body } = req;

    const response = await userService.create(req);
    if(response.success)
    {
      return res.json(response.message);
    }
    return res.json(response.message)
    //return res.json(task);
  }

  async update(req, res) {
    
    return res.json(task);
  }

  async destroy(req, res) {}
    
}

export default new UsersController();
