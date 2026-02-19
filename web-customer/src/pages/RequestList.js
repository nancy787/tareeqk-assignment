import React, { useEffect, useState } from "react";
import api from "../api";

export default function RequestList() {

  const [requests, setRequests] = useState([]);
  const isDriver = localStorage.getItem("user_type") === "driver";

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    const res = await api.get("/requests");
    setRequests(res.data);
  };

  const acceptRequest = async (id) => {
    await api.post(`/requests/${id}/accept`);
    fetchRequests();
  };

  return (
    <div className="container">
      <h2 className="heading">🚗 Towing Requests</h2>

      {requests.length === 0 ? (
        <div className="empty">No requests available</div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Status</th>
                <th>Driver</th>
                <th>Map</th>
                {isDriver && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.customer_name}</td>
                  <td>{req.location}</td>

                  <td>
                    <span className={`badge ${req.status || "pending"}`}>
                      {req.status || "pending"}
                    </span>
                  </td>

                  <td>{req.driver_name || "—"}</td>

                  <td>
                    {req.latitude && req.longitude ? (
                      <a
                        className="map-link"
                        href={`https://www.google.com/maps?q=${req.latitude},${req.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open
                      </a>
                    ) : "N/A"}
                  </td>

                  {isDriver && (
                    <td>
                      {req.status !== "assigned" ? (
                        <button
                          className="accept-btn"
                          onClick={() => acceptRequest(req.id)}
                        >
                          Accept
                        </button>
                      ) : (
                        <strong style={{ color: "#4caf50" }}>
                          Assigned
                        </strong>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
