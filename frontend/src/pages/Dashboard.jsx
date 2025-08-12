import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { Trash2, Edit2 } from 'lucide-react';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ title: '', url: '' });
  const [user, setUser] = useState(null);

  const [editForm, setEditForm] = useState({ title: '', url: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLinks = async () => {
    try {
      const res = await API.get('/links');
      setLinks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addLink = async () => {
    if (!form.title || !form.url) return alert("Please fill all fields");
    try {
      await API.post('/links', form);
      setForm({ title: '', url: '' });
      fetchLinks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLink = async (id) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      setLinks((prev) => prev.filter(link => link._id !== id)); 
      await API.delete(`/links/${id}`);
    } catch (err) {
      console.error(err);
      fetchLinks();
    }
  };

  const openEditModal = (link) => {
    setEditingId(link._id);
    setEditForm({ title: link.title, url: link.url });
  };

  const updateLink = async () => {
    if (!editForm.title || !editForm.url) return alert("Please fill all fields");
    try {
      await API.put(`/links/${editingId}`, editForm);
      setEditingId(null);
      fetchLinks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navbar user={user} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {user && (
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome, <span className="text-purple-600">{user.name}</span> 👋
          </h1>
        )}

        {/* Add Link Form */}
        <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Link</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Title"
              className="border border-gray-300 p-3 flex-1 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL"
              className="border border-gray-300 p-3 flex-1 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
            <button
              onClick={addLink}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              Add
            </button>
          </div>
        </div>

        {/* Links List */}
        <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Links</h2>
          {links.length === 0 ? (
            <p className="text-gray-500">No links yet. Start by adding one above!</p>
          ) : (
            links.map((link) => (
              <div
                key={link._id}
                className="flex justify-between items-center border-b last:border-0 py-3"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  {link.title}
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(link)}
                    className="text-purple-500 hover:text-purple-700 transition flex items-center gap-1"
                  >
                    <Edit2 size={18} /> Edit
                  </button>
                  <button
                    onClick={() => deleteLink(link._id)}
                    className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Link</h2>
            <input
              type="text"
              placeholder="Title"
              className="border border-gray-300 p-3 w-full rounded-lg mb-3 focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL"
              className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={editForm.url}
              onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={updateLink}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
