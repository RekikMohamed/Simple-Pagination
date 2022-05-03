import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import Table from "react-bootstrap/Table";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  /*const [data, setData] = useState([
    {
      _id: "62716cdba11166029d6dcedf",
      user: "1",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    },
    {
      _id: "62716cdb6e82674cf8c013d7",
      user: "2",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    },
    {
      _id: "62716cdb0ef2df8a288d3391",
      user: "3",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    },
    {
      _id: "62716cdb7661b2e5d806058a",
      user: "4",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    },
    {
      _id: "62716cdbe6625f6cd3cae618",
      user: "5",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    },
    {
      _id: "62716cdbd3ab40c101bbd499",
      user: "6",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    },
    {
      _id: "62716cdb7661b2e51806058a",
      user: "7",
      address: "gfdigjoi",
      status: "fdvdf",
      contact: "sdfsd",
      lastClaim: "sdfsdfsd"
    }
  ]);*/
  const [data, setData] = useState([]);
  const [numPages, setNumPages] = useState([]);
  const [viewedData, setViewedData] = useState([]);
  const [numberOfRows, setNumbersOfRows] = useState(3);
  const [active, setActive] = useState(1);
  const [popoverInfo, setPopoverInfo] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("ai")
      .then((data) => {
        return data.json();
      })
      .then((items) => {
        setData(items);
      });
  }, []);

  useEffect(() => {
    let numbers = Math.ceil(data.length / numberOfRows);
    let items = [];
    for (let i = 0; i < numbers; i++) items.push(i + 1);
    setNumPages(items);
  }, [data]);

  useEffect(() => {
    const items = data.slice(
      (active - 1) * numberOfRows,
      (active - 1) * numberOfRows + numberOfRows
    );
    setViewedData(items);
  }, [active, data, numPages, numberOfRows]);

  const changePage = (e) => {
    setActive(e);
  };

  const openPopover = (val) => {
    setPopoverInfo(val);
    setShow(true);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{popoverInfo.user}</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="App">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Adress</th>
            <th>Contact</th>
            <th>Last Claim</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {viewedData.map((value, index) => (
            <tr>
              <th>{value.user}</th>
              <th>{value.address}</th>
              <th>{value.contact}</th>
              <th>{value.lastClaim}</th>
              <th>{value.status}</th>
              <th>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <button onClick={() => openPopover(value)}>Unblock</button>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <button onClick={() => openPopover(value)}>Unblock</button>
                </OverlayTrigger>{" "}
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {numPages.map((value) => (
          <PageItem
            key={value}
            active={active === value}
            onClick={() => changePage(value)}
          >
            {value}
          </PageItem>
        ))}
      </Pagination>
    </div>
  );
}
