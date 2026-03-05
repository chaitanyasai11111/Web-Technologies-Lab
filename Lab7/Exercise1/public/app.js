const API_URL = '/notes';

// DOM Elements
const noteForm = document.getElementById('note-form');
const notesContainer = document.getElementById('notes-container');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const subjectGroup = document.getElementById('subject-group');

// Form Inputs
const idInput = document.getElementById('note-id');
const titleInput = document.getElementById('title');
const subjectInput = document.getElementById('subject');
const descInput = document.getElementById('description');

// State
let isEditing = false;
let notesList = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchNotes);

noteForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent standard page reload behavior

    if (isEditing) {
        await updateNote(idInput.value);
    } else {
        await addNote();
    }
});

cancelBtn.addEventListener('click', resetForm);

// FETCH (GET) - Load all notes
async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch notes');

        notesList = await response.json();
        renderNotes();
    } catch (error) {
        console.error('Error fetching notes:', error);
        notesContainer.innerHTML = `<div class="empty-state" style="color:red;">Error loading notes. Is your Node server connecting to MongoDB?</div>`;
    }
}

// CREATE (POST) - Add a new note
async function addNote() {
    const noteData = {
        title: titleInput.value.trim(),
        subject: subjectInput.value.trim(),
        description: descInput.value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });

        if (response.ok) {
            resetForm();
            await fetchNotes(); // Re-render updated list
        } else {
            alert('Failed to save note.');
        }
    } catch (error) {
        console.error('Error adding note:', error);
    }
}

// DELETE - Remove a note
async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await fetchNotes(); // Re-render updated list
        } else {
            alert('Failed to delete note.');
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

// Prepare the form for UPDATE (PUT)
function editNote(id) {
    const note = notesList.find(n => n._id === id);
    if (!note) return;

    isEditing = true;

    // Populate form with existing data
    idInput.value = note._id;
    titleInput.value = note.title;
    descInput.value = note.description;

    // The requirement only states updating title and description. 
    // Subject is read-only in edit mode here.
    subjectInput.value = note.subject || '';
    subjectInput.disabled = true;
    subjectGroup.style.opacity = '0.5';

    // Update UI headers/buttons
    formTitle.textContent = 'Edit Note';
    submitBtn.textContent = 'Update Note';
    cancelBtn.classList.remove('hidden');

    // Smooth scroll back to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// UPDATE (PUT) - Submit edited note
async function updateNote(id) {
    const noteData = {
        title: titleInput.value.trim(),
        description: descInput.value.trim()
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });

        if (response.ok) {
            resetForm();
            await fetchNotes();
        } else {
            alert('Failed to update note.');
        }
    } catch (error) {
        console.error('Error updating note:', error);
    }
}

// Helper: Reset UI after edit or submit
function resetForm() {
    isEditing = false;
    noteForm.reset();
    idInput.value = '';

    subjectInput.disabled = false;
    subjectGroup.style.opacity = '1';

    formTitle.textContent = 'Create a Note';
    submitBtn.textContent = 'Save Note';
    cancelBtn.classList.add('hidden');
}

// Helper: Render array of notes into DOM
function renderNotes() {
    notesContainer.innerHTML = '';

    if (notesList.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                No notes found. Start by creating a note above!
            </div>
        `;
        return;
    }

    notesList.forEach(note => {
        // Format incoming ISO date
        const dateObj = new Date(note.created_date);
        const formattedDate = !isNaN(dateObj)
            ? dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : 'Unknown Date';

        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <div class="note-header">
                <div>
                    <div class="note-title">${escapeHTML(note.title)}</div>
                    <div class="note-subject">${escapeHTML(note.subject || 'No Subject')}</div>
                </div>
            </div>
            <div class="note-desc">${escapeHTML(note.description)}</div>
            <div class="note-footer">
                <span class="note-date">${formattedDate}</span>
                <div class="note-actions">
                    <button class="btn-edit" onclick="editNote('${note._id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteNote('${note._id}')">Delete</button>
                </div>
            </div>
        `;
        notesContainer.appendChild(card);
    });
}

// Helper: Basic HTML escaping to prevent Cross-Site Scripting (XSS)
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
