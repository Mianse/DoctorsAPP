'use client'
import GlobalApi from '@/app/_Utils/GlobalApi';
import DoctorsList from '@/app/_components/DoctorsList';
import React, { useEffect, useState } from 'react';

const Search = ({ params }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params && params.Cname) {
      getDoctors();
    }
  }, [params]);

  const getDoctors = () => {
    setLoading(true);
    GlobalApi.getDoctorsByCategory(params.Cname)
      .then(resp => {
        console.log(resp);
        setDoctorsList(resp.data.list);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : params && params.Cname ? (
        <DoctorsList heading={params.Cname} doctorsList={doctorsList} />
      ) : (
        <p>No category specified.</p>
      )}
    </div>
  );
};

export default Search;
