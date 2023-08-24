import { APICALL_URL } from "shared/appConstants";
import { API } from "./api";

export const notesApi = {
    async create(note){
        const response = await API.post(APICALL_URL.NOTES.create, note)
        return response;
    },
    async readAll(){
        const response = await API.get(APICALL_URL.NOTES.readAll)
        return response;
    },
    async update(id, note){
        const response = await API.patch(APICALL_URL.NOTES.update + id, note);
        return response;
    },
    async delete(id){
        const response = await API.delete(APICALL_URL.NOTES.delete + id);
        return response;
    },
}
