import dllRoutes from './api/v1/routes/dll.route'

export default function router(app: any): any {
    app.get('/', (req, res) => {
        res.send('Hello, World!'); // Send a response back to the client
    });
    app.use('/api/v1/dll', dllRoutes);
    return app;
}