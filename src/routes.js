const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler, homeHandler } = require("./handler")

const routes = [{
    method: 'GET',
    path: '/',
    handler: homeHandler
},{
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
},{
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
},{
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler
},{
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler
},{
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler
}]

module.exports = routes