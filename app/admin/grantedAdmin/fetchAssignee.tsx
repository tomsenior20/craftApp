import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../../components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

export default function Assignee() {
  interface Assignee {
    name: string;
    id: number;
  }

  const [assignee, setAssignee] = useState<Assignee[]>([]);
  const [show, setShow] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchAssignee = async () => {
      try {
        const data = await fetchData('getAssigneeList', {
          method: 'GET'
        });
        if (data && Array.isArray(data.results)) {
          setAssignee(data.results);
        }
      } catch (error) {
        console.log('Error generating Assignee:', error);
      }
    };

    fetchAssignee();
  }, []);

  // Function to adjust the height of ticketTableContainer based on whether toggle is open or not
  const adjustContainerHeight = (isShow: boolean) => {
    const optionsHeight = optionsRef.current?.clientHeight;
    const ticketTableContainer = document.getElementById('openTicketContainer');
    if (ticketTableContainer) {
      ticketTableContainer.style.height = isShow
        ? `calc(${optionsHeight}px + 150px)`
        : 'calc(100% - 150px)';
    }
  };

  useEffect(() => {
    adjustContainerHeight(show);
  }, [show]);

  const handleDropdownToggle = (isOpen: boolean) => {
    setShow(isOpen);
    adjustContainerHeight(isOpen);
  };

  // Generate Options JSX
  const generateAssigneeOptions = () => {
    return (
      <Dropdown
        id="optionDropdown"
        show={show}
        onToggle={handleDropdownToggle}
        className="light"
      >
        <Dropdown.Toggle
          variant=""
          id="dropdown-basic"
          className="form-select form-select-lg text-break"
        >
          Select Assignee
        </Dropdown.Toggle>
        <Dropdown.Menu ref={optionsRef} className="w-100" id="assignOptions">
          {assignee.map((people) => (
            <Dropdown.Item key={people.id}>{people.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return <td className="col text-wrap">{generateAssigneeOptions()}</td>;
}
