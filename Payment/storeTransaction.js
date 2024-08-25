import Transaction from "../database/models/Transation";

export const StoreTransaction = async (req, res) => {
  try {
    const { paidBy, amount } = req.body;
    if (!paidBy || !amount || !paymentMethod) {
      return res.status(400).json({
        msg: "Please the missing details",
      });
    }
    const storeTransact = await Transaction.create({
      paidBy: req.user.uniqueId,
      amount: amount,
    });
    if (!storeTransact) {
      return res.status(400).json({
        msg: "Could not store transaction",
      });
    }
    return res.status(200).json({
        msg:"transaction store",
        storeTransact
    })
  } catch (error) {
    return res.status(400).json({
        msg:"An error occured"
    })
  }
  
};
