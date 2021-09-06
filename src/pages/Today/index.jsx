import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getDate } from "../../api/Request";
import EventProfile from "../../components/EventProfile";

const Today = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    let date = new Date();
    const AsyncDay = async () => {
      let res = await getDate(date);
      setEvent(res);
    };
    AsyncDay();
  }, []);
  const history = useHistory();
  const routeChange = () => {
    let path = "/";
    history.push(path);
  };

  return (
    <div className="flex items-start justify-center min-h-screen  px-3 pb-20 text-center sm:block sm:p-0">
      <div
        className="px-4 pt-5 pb-4 sm:p-5"
        style={{ backgroundColor: "#16151C" }}
      >
        <div className="sm:flex sm:items-start">
          <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
            <button
              type="button"
              className="w-full inline-flex justify-center text-white outline-none sm:w-auto sm:text-sm goback-button fc-button"
              onClick={() => {
                routeChange();
              }}
            >
              Go Back
            </button>
            <h3
              className="text-center text-md sm:text-lg leading-6 font-bold mt-6"
              id="modal-title"
              style={{ color: "aliceblue", fontFamily: "Inter" }}
            >
              TODAY'S EVENTS
            </h3>
            <div className="mt-2">
              {event.length !== 0 ? (
                <div className="flex flex-col sm:grid sm:gap-x-5 sm:grid-cols-2 ">
                  {event.map((item) => {
                    item["todayChecker"] = true;
                    return (
                      <div className="eventprofile">
                        <EventProfile key={item._id} {...item} />;
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <h2 className="text-white text-center">
                    Schedule on this date seems clear!
                  </h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
