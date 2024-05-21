import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, Link} from "react-router-dom"
import FullLogList from '../components/trailLogs/FullLogList'
import { UserContext } from '../context/UserProvider'
import logsImg from '../assets/logbook.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const Logs = () => {
  const { logs, getAllLogs, getAllTrails, addTrail, trails, getTrailLogs } = useContext(UserContext);
  const [selectedTrail, setSelectedTrail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllLogs()
    getAllTrails()
  }, []);

  const handleTrailChange = (event) => {
    const trailId = event.target.value;
    setSelectedTrail(trailId);

    if (trailId) {
      getTrailLogs(trailId);
    } else {
      getAllLogs();
    }
  };

  const handleBack = () => {
    navigate(-1); // Takes the user back to the previous page
  };

  const logList =
  <>
  <select 
					value={selectedTrail} 
					onChange={handleTrailChange}
					className='select-trail dropdown'>
          <option value=''>All Trails</option>
          {trails?.map((trail) => (
            <option key={trail._id} value={trail._id}>
              {trail.trailName}
            </option>
          ))}
        </select>
        <FullLogList logs={logs} selectedTrailId={selectedTrail} /></>

  return (
    <div className='logs-page'>
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className='logs-container'>
        {logs?.length === 0 ?
        <>
        <img className="notice-img" src={logsImg} alt='redirect message that says you have no logs'/>
        {trails?.length === 0 ?
        <Link className='add-log-btn' to="/trails">
        <button className='post-btn add-log-btn'>add a trail</button>
        </Link>
        :
        <Link className='add-log-btn' to="/post">
        <button className='post-btn add-log-btn'>add a log</button>
        </Link>}
        </>
        :
        <>{logList}</>}
      </div>
    </div>
  );
}


export default Logs;
