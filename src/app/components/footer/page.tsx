export default function Footer() {
  const currentYear = new Date().getFullYear(); // Ambil tahun saat ini

  return (
      <footer className="fixed bottom-0 w-full p-2 bg-black/50 backdrop-blur-md text-gray-400 text-center">
          <a 
              href="https://s.id/himang" 
              className="hover:text-white transition duration-300"
              target="_blank" 
              rel="noopener noreferrer"
          >
              © {currentYear} Himang
          </a>
      </footer>
  );
}
