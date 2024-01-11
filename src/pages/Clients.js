import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

axios.defaults.withCredentials = true;


const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClient] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        const clientData = await axios.get('/api/v1/client');
        setClient(clientData.data);
        console.log(clients)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }
    getClients();
  }, [])

  const handleEdit = (clientId) => {
    // Add your edit logic here
    navigate(`/edit-client?clientId=${clientId}`);
  };
  const handleRedirect = (clientId) => {
    navigate(`/client?clientId=${clientId}`);
  }

  const handleDelete = async (id) => {
    try {
      const deleteClient = await axios.delete(`/api/v1/client/${id}`);
      setClient(clients.filter((client) => client._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };

  const handleAdd = () => {
    navigate('/create-client');
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-bold text-center">client List</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Client
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">{client.name}</td>
              <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.contactNo}</td>
                <td className="px-6 py-4">{client.whatsapp}</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
              <button
                  onClick={() => handleRedirect(client._id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  <FaExternalLinkAlt />
                </button>
                <button
                  onClick={() => handleEdit(client._id)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                 <GrEdit />
                </button>
                <button
                  onClick={() => handleDelete(client._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                 <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-500">{error}</p>}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default Clients