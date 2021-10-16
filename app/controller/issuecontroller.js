const mongoose = require("mongoose");
const issueModel = require("../model/issue_model.js");

class issueController{
    static async createIssue(req,res){
        const {
            projectId,
            createdbyId,
            issueTypeId,
            assignee,
            priorityId,
            epicId,
            description,
            title,
            statusId
        } = req.body;

        if(! req.body){
            return res.status(400).json({ success: false,
                error: "You must provide a issue"});
        }

       try{
            const newIssue = issueModel({
                projectId:projectId,
                createdbyId:createdbyId,
                issueTypeId: issueTypeId,
                assignee: assignee,
                priorityId: priorityId,
                epicId: epicId,
                description: description,
                title: title,
                statusId: statusId
            });
            await newIssue.save();
            return res.status(201).json({
                success: true,
                data: issue,
                message: "Issue created!",
              });
       }
       catch(error){
        return res.status(400).json({
            success: false,
            error: error,
            message: "Issue not created!",
          });
        }

       }

       static async updateIssue(req, res){
           let _id = req.params.id;
          
           const {
            projectId,
            createdbyId,
            issueTypeId,
            assignee,
            priorityId,
            epicId,
            description,
            title,
            statusId
        } = req.body;

        if(! req.body){
            return res.status(400).json({ success: false,
                error: "You must provide a issue"});
        }

        try{
           const data =  await issueModel.findOne({_id:_id});

           if(!data){
            return res.status(400).json({
                success: false,
                error: error,
                message: "Issue does not exist!",
              });
           }
           else{
               const updatedIssue = data;
               updatedIssue.projectId = projectId || updatedIssue.projectId;
               updatedIssue.createdbyId = createdbyId || updatedIssue.createdbyId ;
               updatedIssue.issueTypeId = issueTypeId || updatedIssue.issueTypeId;
               updatedIssue.assignee = assignee || updatedIssue.assignee;
               updatedIssue.priorityId = priorityId || updatedIssue.priorityId;
               updatedIssue.epicId = epicId || updatedIssue.epicId;
               updatedIssue.description = description || updatedIssue.description;
               updatedIssue.title = title || updatedIssue.title;
               updatedIssue.statusId = statusId || updatedIssue.statusId;

               await data.save();
           }
               

        }
        catch(error){
            return res.status(400).json({
                success: false,
                error: error,
                message: "Issue not created!",
              });
        }


       }

    }


module.exports = issueController;

