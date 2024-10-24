'use client';

import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../../components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { ApiCalls } from '../../components/api';

interface ticketDetails {
  id: number;
  Name: string;
}

export default function Assignee({ id: id, Name: Name }: ticketDetails) {
  interface Assignee {
    name: string;
    id: number;
  }

  const [assignee, setAssignee] = useState<Assignee[]>([]);
  const { InsertAssignee, AssigneeAndContactTicket } = ApiCalls();
  const [assigneeSelected, setAssigneeSelected] = useState<string[]>([]);
  const [showDropdown, setShowDropDown] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const fetchAssignee = async () => {
    try {
      const data = await fetchData('getAssigneeList', {
        method: 'GET'
      });
      if (data && Array.isArray(data.results)) {
        setAssignee(data.results);
      }
    } catch (error) {
      console.log('Error fetching assignees:', error);
    }
  };

  useEffect(() => {
    fetchAssignee();
    checkAssignee();
  }, []);

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

  const SelectAssignee = async (name: string) => {
    await InsertAssignee(Name, name);
  };

  const checkAssignee = async () => {
    try {
      const a = await AssigneeAndContactTicket(Name);
      if (a.results) {
        setAssigneeSelected([a.results.AssignedTo]);
        setShowDropDown(false);
      }
    } catch (error) {
      console.log('Error checking Assignee:', error);
    }
  };

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
            <Dropdown.Item
              key={people.id}
              onClick={() => SelectAssignee(people.name)}
            >
              {people.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <td className="col text-wrap">
      {showDropdown ? (
        generateAssigneeOptions()
      ) : (
        <span>{assigneeSelected.length > 0 ? assigneeSelected : null}</span>
      )}
    </td>
  );
}
