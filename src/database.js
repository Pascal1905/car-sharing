import {JSONFilePreset} from "lowdb/node";

const defaultData = {
    kunden: [
        {id: 1, name: "Max Mustermann", adresse: "Musterstrasse 1"},
        {id: 2, name: "Paul Mustermann", adresse: "Musterstrasse 2"},
        {id: 3, name: "Peter Mustermann", adresse: "Musterstrasse 3"}
    ],
    vermietungen: [
        {id: 1, kundenid: 1, fahrzeugid: 1, startdatum: "2023-01-01", enddatum: "2023-01-07"},
        {id: 2, kundenid: 2, fahrzeugid: 2, startdatum: "2023-01-01", enddatum: "2023-01-07"},
        {id: 3, kundenid: 3, fahrzeugid: 3, startdatum: "2023-01-01", enddatum: "2023-01-07"}
    ],
    fahrzeuge: [
        {id: 1, kennzeichen: "M-XX 1234", marke: "Volkswagen", status: "true"},
        {id: 2, kennzeichen: "A-XX 1234", marke: "Volkswagen", status: "true"},
        {id: 3, kennzeichen: "B-XX 1234", marke: "Volkswagen", status: "true"}
    ]
};
export const db = await JSONFilePreset("src/db.json", defaultData);
export function findIndex(dataset, id) {
    return dataset.findIndex(entry => entry.id === id);
}
export function getNextId(dataset) {
    let maxId = -1;
    for (let entry of dataset || []) maxId = Math.max(maxId, entry.id);
    return maxId + 1;
}

export default {db, findIndex, getNextId};