import dllRoutes from './api/v1/routes/dll.route'

export default function router(app: any): any {
    app.use('/api/v1/dll', dllRoutes);
    return app;
}