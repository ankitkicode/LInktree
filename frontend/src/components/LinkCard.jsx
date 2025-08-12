const LinkCard = ({ title, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5"
    >
      <h3 className="font-semibold text-lg text-gray-900 truncate">
        {title}
      </h3>
      <p className="text-sm bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent truncate">
        {url}
      </p>
    </a>
  );
};

export default LinkCard;
