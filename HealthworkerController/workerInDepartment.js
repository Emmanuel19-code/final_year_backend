import health_worker from "../database/models/Healthworker.js"

export const WorkerInDepartMent = async (req, res) => {
  try {
    const { department } = req.params;
    const workers = await health_worker.find({ specialty:department});
    if(!workers.length == 0){
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
