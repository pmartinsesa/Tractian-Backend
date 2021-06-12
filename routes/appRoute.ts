export const appRoute = (app: any, model: any) => {
    const modelName = model.modelName.toLowerCase();
    app.route(`/${modelName}/:id?`)
        .get(async (req: any, res: any) => {
            const { id } = req.params;
            const query: any = {};
            if (id) {
                query._id = id;
            }
            try {
                const elements = await model.find(query);
                res.send({ elements });
            } 
            catch (error) {
                res.status(400).send({ error: `Failed to find ${modelName}` });
            }
        })
        .post(async (req: any, res: any) => {
            try {

                const element = new model(req.body);
                await element.save();

                res.status(201).send({
                    message: 'OK',
                    element: element
                });
            }
            catch (error) {
                res.send(error);
            }
        })
        .put(async (req: any, res: any) => {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send({ error: `${modelName} ID is missing.` });
            }

            try {
                const updatedElement = await model.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });


                if (updatedElement) {
                    return res.status(200).send('OK');
                }

                res.status(400).send({ error: `Could not update the ${modelName}` });
                
            } 
            catch (error) {
                res.send(error);
            }
        })
        .delete(async (req: any, res: any) => {
            const { id } = req.query;
          
            if (!id) {
                return res.status(400).send({ error: `${modelName} ID is missing.` });
            }

            try {
                const deletedElement = await model.deleteOne({ _id: id });

                if (deletedElement.deletedCount) {
                    return res.send({message: 'OK'});
                }

                res.status(400).send({ error: `Could not delete the ${modelName}` });

            } 
            catch (error) {
                res.send(error);
            }
        });
}