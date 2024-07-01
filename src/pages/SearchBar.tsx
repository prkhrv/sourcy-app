import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import DOMPurify from "dompurify";


interface SearchBarProps {
    fetchData: (searchTerm: string) => void;
}

const SearchBar = ({ fetchData}: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const searchInputRef = React.useRef<HTMLInputElement>(null);  

    const handleKeyDown = (event:any) => {
      if (event.key === 'Enter') {
        handleSearch(event);
      }
    };

    const handleSearch = (e: any) => {
    e.preventDefault();

    if (searchTerm.trim() === "") alert("Please enter a search term");

    // Sanitize the input
    const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm.trim());

    // fetch products
    fetchData(sanitizedSearchTerm);

    // cleanup input
    setSearchTerm("");

    // focus on input
    searchInputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center w-full mt-8 px-8">
      <div className="flex w-full max-w-2xl">
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          className="flex-grow p-2 border border-black rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleSearch}
          className="ml-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Search
        </Button>
      </div>
    </div>
  );

    // return (
    //     <div className="flex flex-col items-center min-h-screen bg-gray-100">
    //     <header className="w-full p-4 bg-black text-white text-center text-2xl font-bold">
    //         Sourcy - App
    //     </header>
    //     <div className="flex justify-center items-center w-full mt-8">
    //         <Input ref={searchInputRef} value={searchTerm} type="text" placeholder="Search..." className="w-1/2 p-2 border border-black rounded-lg" onChange={(e) => setSearchTerm(e.target.value)} />
    //         <Button
    //         onClick={handleSearch}
    //         className="ml-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
    //         >
    //         Search
    //         </Button>
    //     </div>
    //     </div>
    // );
};

export default SearchBar;
