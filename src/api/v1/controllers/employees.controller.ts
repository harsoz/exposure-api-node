const db = require('../models/employee');

const controller = {
    getEmployees: async (req: any, res: { json: (arg0: any) => void; }) => {
        const employees = await db.find();
        res.json(employees);
    },
    // getEmployee: async (req: { params: { id: any; }; }, res: { json: (arg0: any) => void; }) => {
    //     const id = req.params.id;
    //     const employee = await db.findById(id);
    //     res.json(employee);
    // },
    // createEmployee: async (req: { body: any; }, res: { json: (arg0: { message: string; }) => void; }) => {
    //     const employee = req.body;
    //     const add = new db(employee);
    //     await add.save();
    //     res.json({ message: 'Employee created' });
    // },
    // updateEmployee: async (req: { params: { id: any; }; body: any; }, res: { json: (arg0: { message: string; res: any; }) => void; }) => {
    //    let response = await db.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //     res.json({ message: 'Employee updated', res: response});
    // },
    // deleteEmployee: async (req: { params: { id: any; }; }, res: { json: (arg0: { message: string; }) => void; }) => {
    //     const id = req.params.id;
    //     await db.findByIdAndDelete(id);
    //     res.json({ message: 'Employee deleted' });
    // },
}

module.exports = controller;