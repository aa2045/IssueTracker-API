const mongoose = require("mongoose");
const projectModel = require("../model/project_model.js");
const issueModel = require("../model/issue_model.js");

class projectController{
    static createProject(req,res){

        const {
            projectname,
            members,
            projectKey,
            projectAdmin,
        } = req.body;
    console.log(req.body);
    console.log(projectname);

        if(!req.body){
            res.json({message: "required fields missing"});
            return;
        }
        else{
          projectModel.findOne({projectname:projectname},(err, projectdata)=>{
              console.log(projectdata);

                if(err){
                    console.log(err);
                }
                
               else if(projectdata == null){
                    const newproject = new projectModel({
                        projectname: projectname,
                        members: members,
                        projectKey: projectKey,
                        projectAdmin: projectAdmin
                    }); 
                    console.log(newproject);
                    newproject.save((err,data)=>{
                        console.log("data"+ data);
                        if(err || !data){
                            console.log(err);
                            console.log(data);
                            res.json({error: "error in creating project"});
                            return;
                        }
                        else{
                            res.json(newproject);
                        }
                    });

                }
                else{
                    console.log("in else");
                    res.json({message:"project exists"});
                }

            });

        }
    }

    static updateProject(req,res){
        let _id = req.params.id;
        console.log(_id);

        const {projectname,
            members,
            projectKey,
            projectAdmin,} = req.body;

        console.log(req.body);
        if(! _id){
            res.json({message: "project _id not found"});
            return;
        }
        if(!req.body){
            res.json({message: "No request body to update"});
            return;
        }
        
        projectModel.findOne({_id: _id}, (err,data)=>{
            if(err ||!data){
                console.log(err);
                console.log(data);
                res.json({err:"Cannot find project"});
            }
            else{
                
                const projectData = data;
                if(!projectData){
                    res.json({err:"project not found"});
                    return;
                }
                else{
                    projectData.projectname = projectname || projectData.projectname;
                    projectData.members = members || projectData.members;
                    projectData.projectKey = projectKey || projectData.projectKey;
                    projectData.projectAdmin = projectAdmin || projectData.projectAdmin;

                    data.save((err, data) =>{
                        console.log("data:" + data);
                        if (err || !data){
                            console.log(err);
                            console.log(data);
                            console.log(projectData);
                            res.json({err:"Could not save"});
                            return;
                        }
                        else{
                            res.json(projectData);
                            return;
                        }
                    });

                }
            }

        });
       
    }

    static deleteProject(req,res){
        let _id = req.params.id;
        console.log(_id);

        projectModel.findOne({_id: _id}, (err,data)=>{
            if(err ||!data){
                console.log(err);
                console.log(data);
                res.json({err:"project is not found"});
            }
            else{
                const projectData = data;
                console.log(projectData);
                
                //add code to delete issue
                // issueModel.deleteMany({projectid:_id}, (err,issueData)=>{
                //     if(err || !issueData){
                //         projectData.remove();
                //         res.json({message:"project has no issue tickets, so only project is deleted"});
                //         return;
                //     }
                //    else{
                //         issueData.remove();
                //         projectData.remove();
                //         res.json({message: "project and issue tickets deleted successfully"});
                //         return; 
                //    }
                           
                    
              //  });
                projectData.remove();
                res.json({message: "project and issue tickets deleted successfully"});
                return; 

            
            }
        });
    }

    static getProjects(req,res){
        projectModel.find({},(err, data) =>{
            if(err ||!data){
                console.log(err);
                console.log(data);
                res.json({err:"project is not found"});
                return;
            }
            else{
                res.json(data);
                return;
            }

        });
    }

    static getProjectsByKey(req,res){
        let key = req.params.key;
        projectModel.findOne({projectKey: key},(err,data)=>{
            if(err ||!data){
                console.log(err);
                console.log(data);
                res.json({err:"project is not found"});
                return;
            }
            else{
                res.json(data);
                return;
            }

        });
    }
}

module.exports = projectController;