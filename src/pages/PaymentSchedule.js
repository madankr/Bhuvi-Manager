import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { GrEdit } from "react-icons/gr";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

axios.defaults.withCredentials = true;

const PaymentSchedules = () => {
  const navigate = useNavigate();
  const [paymentSchedules, setpaymentSchedules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getpaymentSchedules = async () => {
      try {
        const paymentSchedulesData = await axios.get('/api/v1/payment-schedule');
        setpaymentSchedules(paymentSchedulesData.data);
        console.log('res:', paymentSchedulesData.data)
        console.log(paymentSchedules)
      } catch (error) {
        toast.error(error.message)
        setError(error.message);
      }
    }
    getpaymentSchedules();
  }, [])

  const handleEdit = (paymentScheduleId) => {
    // Add your edit logic here
    navigate(`/edit-payment-schedule?payment-ScheduleId=${paymentScheduleId}`);
  };
  const handleRedirect = (projectScheduleId) => {
    navigate(`/project-schedule?project-scheduleId=${projectScheduleId}`);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/payment-schedule/${id}`);
      setpaymentSchedules(paymentSchedules.filter((paymentSchedule) => paymentSchedule._id !== id));
    } catch (error) {
      toast.error(error.message)
    }
  };
  const handleAdd = () => {
    navigate('/create-payment-schedule');
  };


  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-bold text-center mt-4">Payment Schedules</h1>
      <div className=" mb-4 mr-20 text-right">
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Add Payment Schedule
        </button>
      </div>

      <section className='bg-white px-12 py-8 mb-16 h-full w-full'>
        <div className="mt-6 w-full">
          {paymentSchedules.map((paymentSchedule) => (
            <div key={paymentSchedule._id} className="card">
              <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
                <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                  Payment Schedule of {paymentSchedule.site?.name}
                  <div className='self-end'>
                  <button
              className="bg-green-500 rounded-2xl text-white px-2 py-1 mr-2">
                <MdAdd className="text-xl text-white" />
              </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                  >
                    <GrEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(paymentSchedule._id)}
                    className="bg-green-500 rounded-2xl text-white px-2 py-1 mr-2"
                  >
                    <MdDelete />
                  </button>
                </div>
                </summary>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Work</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Payment Date</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentSchedule?.paymentDetails.map((work) => (
                      <tr key={work._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                          {work.workDescription}
                        </td>
                        <td className="px-6 py-4">{work.amount}</td>
                        <td className="px-6 py-4">{work.dateOfPayment}</td>
                        <td className="px-6 py-4">{work.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleRedirect(work._id)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                          >
                            <FaExternalLinkAlt />
                          </button>
                          <button
                            onClick={() => handleEdit(work._id)}
                            className="bg-blue-500 text-white px-2 py-1 mr-2"
                          >
                            <GrEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(work._id)}
                            className="bg-red-500 text-white px-2 py-1 mr-2"
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white px-8 py-2 mb-16 h-full w-full'>
        <div className="mt-6 w-full">
          <div className="card">
            <details className="rounded-lg bg-white overflow-hidden shadow-lg p-3">
              <summary className='flex justify-between flex-row text-xl font-large text-color-title cursor-pointer' style={{ padding: '1rem' }}>
                Payment Schedule of
                <div>
                <button
              className="bg-green-500 rounded-2xl text-white shadow self-end p-1">
                <MdAdd className="text-xl text-white" />
              </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 mr-2"
                  >
                    <MdDelete />
                  </button>
                </div>
              </summary>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Work</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Payment Date</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">

                    </td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <FaExternalLinkAlt />
                      </button>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                      >
                        <GrEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 mr-2"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </details>
          </div>
        </div>
      </section>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default PaymentSchedules