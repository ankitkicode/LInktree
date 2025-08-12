import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [nameStatus, setNameStatus] = useState(null); // "available" | "taken" | null
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  // Real-time name check
  useEffect(() => {
    const checkAvailability = async () => {
      if (!form.name.trim()) {
        setNameStatus(null);
        return;
      }
      setChecking(true);
      try {
        const res = await API.get(`/auth/check-name?name=${form.name}`);
        setNameStatus(res.data.available ? 'available' : 'taken');
      } catch (err) {
        console.error(err);
        setNameStatus(null);
      }
      setChecking(false);
    };

    const delayDebounce = setTimeout(checkAvailability, 500);
    return () => clearTimeout(delayDebounce);
  }, [form.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 backdrop-blur-lg shadow-xl border border-purple-100">
        
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join <span className="text-purple-600 font-semibold">LinkNest</span> and start sharing your links
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {form.name && (
              <p
                className={`text-sm mt-1 ${
                  nameStatus === 'available' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {checking
                  ? 'Checking availability...'
                  : nameStatus === 'available'
                  ? '✅ Name is available'
                  : nameStatus === 'taken'
                  ? '❌ Name is already taken'
                  : ''}
              </p>
            )}
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-full font-semibold shadow-md hover:bg-purple-700 hover:shadow-lg transition"
            disabled={nameStatus === 'taken'}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
