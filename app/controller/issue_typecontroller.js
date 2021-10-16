const issueTypeModel = require ("../model/issuetype_model");

class IssueTypeController{

    static async createIssueType(req, res){
        if(! req.body){

            return res.status(400).json({err: "no request body found"});
        }
        try{
            newIssueType  =  issueTypeModel(req.body);
            await newIssueType.save();
            return res.status(200).json(newIssueType);
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
                message: "Issue-type not created!",
              });

        }
    }

    static updateIssueType(req,res){
        let id = req.params.id;
        if(!id){
            return res.status(400).json({err: "not found issuetype id"});
        }

        if(!body){
            return res.status(400).json({err: "no body found to update issuetype"});
        }
        try{
            const issueTypeData = await issueTypeModel.updateOne({id : id}, body);
            if (!issueTypeData){
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

    static async getIssueTypeById(req,res){
        let id = req.params.id;
        if (!id){
           return res.status(400).json({err: "No id given in request parameters"});
        }

        try{
          const  issueTypeData = await issueTypeModel.findOne({id: id});
          if(!issueTypeData){
              return res.status(400).json({err: "Issuetype of the given id does not exist"});
          }
          else{
              return res.status(200).json(issueTypeData);
          }
        }
        catch(error){
            console.log(error);
            return res.status(400);

        }

    }

    static async getIssueType(req,res){
        try{
            const  issueTypeData = await issueTypeModel.findOne({});
            if(!issueTypeData){
                return res.status(400).json({err: "issuetype of the given id does not exist"});
            }
            else{
                return res.status(200).json(issueTypeData);
            }
          }
          catch(error){
              console.log(error);
              return res.status(400);
  
          }
    }

    static async deleteIssueTypes(req, res){
        let id = req.params.id;

        const issueTypeData = await issueTypeModel.findOne({id : id});
        if(!issueTypeData){
            return res.status(400).json({err: "Issue type of the given id does not exist"});
        }

        else{
            issueTypeData.remove();
            return res.status(200).json({message: "Issue type deleted successfully"});
        }
    }

}

module.exports = IssueTypeController;