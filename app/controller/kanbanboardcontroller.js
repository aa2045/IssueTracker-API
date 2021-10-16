const kanbanboardModel = require ("../model/kanbanboard_model");

class KanbanController{

    static async createKanbanBoard(req,res){
        if(! req.body){

            return res.status(400).json({err: "no request body found"});
        }
        try{
            newKanban =  kanbanboardModel(req.body);
            await newKanban.save();
            return res.status(200).json(newKanban);
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
                message: "kanban not created!",
              });

        }

    }

    static async updateKanbanBoard(req,res){
        let id = req.params.id;
        if(!id){
            return res.status(400).json({err: "not found kanban id"});
        }

        if(!body){
            return res.status(400).json({err: "no body found to update kanban"});
        }
        try{
            const kanbanData = await kanbanboardModel.updateOne({id : id}, body);
            if (!kanbanData){
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

    static async deleteKanbanBoard(req,res){
        let id = req.params.id;

        const kanbanData = await kanbanboardModel.findOne({id : id});
        if(!kanbanData){
            return res.status(400).json({err: "kanban of the given id does not exist"});
        }

        else{
            kanbanData.remove();
            return res.status(200).json({message: " Kanban deleted successfully"});
        }

    }   
    
    static async getKanbanById(req,res){
        let id = req.params.id;
        if (!id){
           return res.status(400).json({err: "No id given in request parameters"});
        }

        try{
          const  kanbanData = await kanbanboardModel.findOne({id: id});
          if(!kanbanData){
              return res.status(400).json({err: "kanban of the given id does not exist"});
          }
          else{
              return res.status(200).json(kanbanData);
          }
        }
        catch(error){
            console.log(error);
            return res.status(400);

        }


    }
    static async getKanbanTypes(req,res){
        try{
            const  kanbanData = await kanbanboardModel.findOne({}).sort({index: "asc"});
            if(!kanbanData){
                return res.status(400).json({err: "kanban of the given id does not exist"});
            }
            else{
                return res.status(200).json(kanbanData);
            }
          }
          catch(error){
              console.log(error);
              return res.status(400);
  
          }

    }

}

module.exports = KanbanController;