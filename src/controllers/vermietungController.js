import service from '../services/vermietungService.js';
import { throwNotFound } from '../utils.js';
import { wrapAsync } from '../utils.js';

const prefix = '/vermietungen';

export default function registerRoutes(app) {
    app.get(prefix, wrapAsync(search));
    app.post(prefix, wrapAsync(create));
    app.get(`${prefix}/:id`, wrapAsync(read));
    app.put(`${prefix}/:id`, wrapAsync(update));
    app.patch(`${prefix}/:id`, wrapAsync(update));
    app.delete(`${prefix}/:id`, wrapAsync(remove));
}

async function search(req, res) {
    let result = await service.search(req.query.q);
    res.status(200).send(result);
}

async function create(req, res) {
    let result = await service.create(req.body);
    res.status(201).header('Location', `${prefix}/${result.id}`).send(result);
}

async function read(req, res) {
    let result = await service.read(req.params.id);
    if (result) {
        res.status(200).send(result);
    } else {
        throwNotFound();
    }
}

async function update(req, res) {
    let result = await service.update(req.params.id, req.body);
    if (result) {
        res.status(200).send(result);
    } else {
        throwNotFound();
    }
}

async function remove(req, res) {
    let count = await service.remove(req.params.id);
    if (count > 0) {
        res.status(204).json({ message: "Vermietung gelöscht." });
    } else {
        throwNotFound();
    }
}
