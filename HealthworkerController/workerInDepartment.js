import HealthWorker from "../database/models/Healthworker.js";

export const WorkerInDepartMent = async (req, res) => {
  try {
    const { department } = req.params;
    console.log(department);
    
    const workers = await HealthWorker.find({ department: department });
    console.log(workers);
    
    if(workers.length == 0){
        return res.status(404).json({
            msg:"No worker available"
        })
    }
    return res.status(200).json({
        workers
    })
  } catch (error) {
     res.status(500).json({
        msg:"an error occured",
        error:error
     }) 
  }
};
