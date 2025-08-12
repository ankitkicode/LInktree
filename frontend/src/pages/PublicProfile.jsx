import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';
import LinkCard from '../components/LinkCard';

export default function PublicProfile() {
  const { username } = useParams();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await API.get(`/links/public/${username}`);
      setLinks(res.data);
    };
    fetchLinks();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center px-4 py-10">
      
      {/* Profile Header */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-lg">
          {username[0].toUpperCase()}
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
          {username}'s Links
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Discover all the links shared by <span className="font-medium text-purple-600">{username}</span>
        </p>
      </div>

      {/* Links List */}
      <div className="w-full max-w-lg space-y-4">
        {links.length === 0 ? (
          <p className="text-center text-gray-500 italic">No links available</p>
        ) : (
          links.map((link) => (
            <LinkCard key={link._id} title={link.title} url={link.url} />
          ))
        )}
      </div>
    </div>
  );
}
