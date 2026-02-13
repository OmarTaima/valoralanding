import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import { getJobPositions } from '../store/slices/jobPositionsSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainLayout = () => {
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.jobPositions.positions);
  useEffect(() => {
    if (positions.length === 0) {
      dispatch(getJobPositions());
    }
  }, [dispatch, positions.length]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
