import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // BootstrapのCSSをインポート
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobHuntingStatuses() {
  const {id} = useParams();
  const [jobHuntingStatuses, setJobHuntingStatuses] = useState([]);
  //const [userId, setUserId] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId] = useState(id);
  useEffect(() => {
    const backEndUrl = process.env.REACT_APP_BACK_END_URL;
    const indexUrl =
      backEndUrl + "/api/user/" + userId + "/job_hunting_statuses";
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${indexUrl}`);
        setJobHuntingStatuses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="JobHuntingStatus">
      <h1 className="my-1">就職活動状況</h1>

      <Table striped bordered hover responsive="xl">
        <thead>
          <tr>
            <th className="col-xs-1">ID</th>
            <th className="col-lg-2">企業名</th>
            <th scope="col-lg-1">就活サイト</th>
            <th scope="col-2">備考欄</th>
            <th className="col-sm-1">就活状況</th>
            <th scope="col">書類提出日</th>
            <th scope="col">１次選考</th>
            <th scope="col">2次選考</th>
            <th scope="col">最終選考</th>
          </tr>
        </thead>
        <tbody>
          {jobHuntingStatuses.map((status) => (
            <tr key={status.id}>
              <td>{status.id}</td>
              <td>{status.corporation.name}</td>
              <td>{status.way.name}</td>
              <td>{status.note}</td>
              <td>{status.status.name}</td>
              <td>
                {status.submit &&
                  new Date(status.submit).toLocaleString("ja-JP", {
                    dateStyle: "short",
                  })}
              </td>
              <td>
                {status.interview1 &&
                  new Date(status.interview1).toLocaleString("ja-JP", {
                    dateStyle: "short",
                  })}
              </td>
              <td>
                {status.interview2 &&
                  new Date(status.interview2).toLocaleString("ja-JP", {
                    dateStyle: "short",
                  })}
              </td>
              <td>
                {status.interview_last &&
                  new Date(status.interview_last).toLocaleString("ja-JP", {
                    dateStyle: "short",
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default JobHuntingStatuses;
