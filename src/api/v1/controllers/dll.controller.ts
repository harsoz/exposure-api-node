import { DllService } from "../../../modules/dll/services/dll.service";

const service = new DllService();

const controller = {
    getAll: async (req: any, res: any) => {
        try {
            const all = await service.getAll();
            res.json(all);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    get: async (req: any, res: any) => {
        try {
            const dll = await service.get(req);
            res.json(dll);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    execute: async (req: any, res: any) => {
        try {
            const response = await service.execute(req);
            res.json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    create: async (req: any, res: any) => {
        try {
            const response = await service.create(req);
            res.json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    },
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

export default controller;