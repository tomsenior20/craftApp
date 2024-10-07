import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss';
import '../../styling/globals.scss';
import { Dropdown } from 'react-bootstrap/esm';
import { fetchData, ApiCalls } from '@/app/components/api';

interface Number {
  ticketID: number;
  record: Record;
}

interface Record {
  id: number;
  Name: string;
  ContactNumber: string;
  Comment: string;
}

export default function RowOptions({ ticketID, record }: Number) {
  const { DeleteTicket, InsertTicketToDeleted } = ApiCalls();
  const [show, setShow] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState('0px');

  const AddToDeletedTable = async () => {
    try {
      await InsertTicketToDeleted(
        record.id,
        record.Name,
        record.ContactNumber,
        record.Comment
      );
    } catch (error) {
      console.log('Failed to insert deleted record' + error);
    }
  };

  const deleteAction = async () => {
    try {
      await AddToDeletedTable();
      await DeleteTicket(ticketID);
      window.location.reload();
    } catch (exception) {
      console.log('failed to delete ticket' + exception);
    }
  };

  const handleToggle = (isOpen: boolean) => {
    setShow(isOpen);
    const documents = document.getElementById('openTicketContainer');
    if (documents) {
      if (isOpen) {
        const currentHeight = documents.clientHeight; // Get current height in pixels
        // Get current height and add 200px
        documents.style.height = `${currentHeight + 50}px`; // Add 200px to the current height
      } else {
        const currentHeight = documents.clientHeight; // Get current height in pixels
        // Get current height and add 200px
        documents.style.height = `${currentHeight - 50}px`; // Add 200px to the current height
      }
    }
  };

  return (
    <Dropdown id="optionDropdown" show={show} onToggle={handleToggle}>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        className="form-select form-select-lg"
      >
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100" id="assignOptions">
        <Dropdown.Item onClick={() => deleteAction()}>Delete</Dropdown.Item>
        <Dropdown.Item eventKey="2">Archive</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
