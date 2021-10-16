priorityModel = require("../model/prioritytype_model");

class priorityController{

    static async createPriority(req,res){

        if(! req.body){

            return res.status(400).json({err: "no request body found"});
        }
        try{
            newPriority  =  priorityModel(req.body);
            await newPriority.save();
            return res.status(200).json(newPriority);
            //return res.status(200).json({
    //   success: true,
    //   data: priority,
    //   message: "Priority created!",
    // });
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                error: error.errmsg,
                message: "Priority not created!",
              });

        }

    }

    static async updatePriority(req,res){
        let id = req.params.id;
        if(!id){
            return res.status(400).json({err: "not found priority id"});
        }

        if(!body){
            return res.status(400).json({err: "no body found to update priority"});
        }
        try{
            const priorityData = await priorityModel.updateOne({id : id}, body);
            if (!priorityData){
                return res.status(400).json({err: "Could not update"});
        }
        else{

            return res.status(200).json({message: "sucessfully updated"});
        }
    }
    catch(error){
        console.log(error);
    }
    }

    static getPriorityById(req,res){
        let id = req.params.id;
        if (!id){
           return res.status(400).json({err: "No id given in request parameters"});
        }

        try{
          const  priorityData = await priorityModel.findOne({id: id});
          if(!priorityData){
              return res.status(400).json({err: "priority of the given id does not exist"});
          }
          else{
              return res.status(200).json(priorityData);
          }
        }
        catch(error){
            console.log(error);
            return res.status(400);

        }

    }

    static getPriority(req,res){
        try{
            const  priorityData = await priorityModel.findOne({});
            if(!priorityData){
                return res.status(400).json({err: "priority of the given id does not exist"});
            }
            else{
                return res.status(200).json(priorityData);
            }
          }
          catch(error){
              console.log(error);
              return res.status(400);
  
          }

    }

    static deletePriority(req,res){
        let id = req.params.id;

        const priorityData = await priorityModel.findOne({id : id});
        if(!priorityData){
            return res.status(400).json({err: "priority of the given id does not exist"});
        }

        else{
            priorityData.remove();
            return res.status(200).json({message: "priority deleted successfully"});
        }

    }

}

module.exports = priorityController;