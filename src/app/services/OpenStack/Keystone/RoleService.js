import axios from "axios";
class RoleService
{
    async getAll(req)
    {
        let result = {
            success: "",
            data :'',
           
        };
   

        let config = {
            headers:{
                "X-Auth-Token" : req.headers['x-auth-token']
            }
        } 

        await axios.get("http://127.0.0.1:5000/v3/roles/",config).then(response=>{
            result.success = true;
            result.data = response.data.roles;
            
        }).catch(error=>{
            console.log(error);
            result.success = error;
        })

        return result;
    }
}

export default new RoleService();