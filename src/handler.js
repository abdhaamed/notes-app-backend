const { nanoid } = require('nanoid')
const notes = require('./notes')


const homeHandler = (request, h) => {
  const html = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Mahasiswa</title>
    <style>
      body { font-family: Arial, sans-serif; }
      .container { width: 500px; margin: 20px; }
      label { display: inline-block; width: 200px; vertical-align: top; margin-bottom: 10px; }
      input[type="text"], input[type="date"], textarea, select {
        width: 240px;
        padding: 4px;
        box-sizing: border-box;
      }
      textarea { height: 80px; }
      .radio-group, .checkbox-group { display: inline-block; }
      .checkbox-group label { margin-left: 5px; }
      .buttons { margin-top: 10px; margin-left: 200px; }
      button { padding: 5px 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Data Mahasiswa</h2>
      <form method="POST" action="/submit">
        <div>
          <label for="nim">NIM :</label>
          <input type="text" id="nim" name="nim" />
        </div>

        <div>
          <label for="nama">Nama :</label>
          <input type="text" id="nama" name="nama" />
        </div>

        <div>
          <label for="tgl">Tgl Lahir (dd-mm-yyyy) :</label>
          <input type="date" id="tgl" name="tgl" />
        </div>

        <div>
          <label>Jenis Kelamin :</label>
          <div class="radio-group">
            <input type="radio" id="laki" name="gender" value="Laki-Laki" />
            <label for="laki">Laki-Laki</label>
            <input type="radio" id="perempuan" name="gender" value="Perempuan" style="margin-left:12px;" />
            <label for="perempuan">Perempuan</label>
          </div>
        </div>

        <div>
          <label for="alamat">Alamat di Bandung :</label>
          <textarea id="alamat" name="alamat"></textarea>
        </div>

        <div>
          <label for="tinggal">Tinggal di :</label>
          <select id="tinggal" name="tinggal">
            <option>--pilih--</option>
            <option>Kos/kontrakan</option>
            <option>Rumah saudara</option>
            <option>Rumah orang tua</option>
          </select>
        </div>

        <div>
          <label>Pilih 2 hobi yang paling disukai :</label>
          <div class="checkbox-group" style="width:240px">
            <div>
              <input type="checkbox" id="science" name="hobi" value="Science" />
              <label for="science">Science</label>
            </div>
            <div>
              <input type="checkbox" id="tech" name="hobi" value="Technology" />
              <label for="tech">Technology</label>
            </div>
            <div>
              <input type="checkbox" id="art" name="hobi" value="Art" />
              <label for="art">Art</label>
            </div>
            <div>
              <input type="checkbox" id="sport" name="hobi" value="Sport" />
              <label for="sport">Sport</label>
            </div>
          </div>
        </div>

        <div class="buttons">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  </body>
  </html>
  `;
  return h.response(html).type('text/html').code(200);
};

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);

    const createAt = new Date().toISOString();
    const updatedAt = createAt;

    const newNote = {
        title, tags, body, id, createAt, updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
            noteId: id,
        },
        });
        response.code(201);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    
    const note = notes.filter((n) => n.id === id)[0];
    
    if (note !== undefined) {
        return {
        status: 'success',
        data: {
            note,
        },
        };
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    
    const index = notes.findIndex((note) => note.id === id);
    
    if (index !== -1) {
        notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
        };
    
        const response = h.response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    
    const index = notes.findIndex((note) => note.id === id);
    
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { homeHandler, addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler }