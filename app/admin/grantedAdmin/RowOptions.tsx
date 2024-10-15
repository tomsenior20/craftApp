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

interface ArchiveProps {
  Name: string;
  ContactNumber: number;
  Comment: string;
  Assignee: string;
}

export default function RowOptions({ ticketID, record }: Number) {
  const { DeleteTicket, InsertTicketToDeleted, ArchiveTicket } = ApiCalls();
  const [show, setShow] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState('0px');
  const [assignee, setCurrentAssignee] = useState<string>('~');

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

  const archiveTicket = async () => {
    if (!record.ContactNumber) {
      console.log('Contact Number is null');
      return;
    }

    if (isNaN(parseInt(record.ContactNumber, 10))) {
      console.log('ContactNumber is not a valid number:', record.ContactNumber);
      return;
    }

    const User: ArchiveProps = {
      Name: record.Name,
      ContactNumber: parseInt(record.ContactNumber, 10),
      Comment: record.Comment,
      Assignee: assignee
    };
    try {
      await ArchiveTicket(
        User.Name,
        User.ContactNumber,
        User.Comment,
        User.Assignee
      );
    } catch (error) {
      console.log('failed to archive ticket' + error);
    }
  };

  const handleToggle = (isOpen: boolean) => {
    setShow(isOpen);
    const documents = document.getElementById('openTicketContainer');
    if (documents) {
      if (isOpen) {
        const currentHeight = documents.clientHeight;
        documents.style.height = `${currentHeight + 50}px`;
      } else {
        const currentHeight = documents.clientHeight;
        documents.style.height = `${currentHeight - 50}px`;
      }
    }
  };

  useEffect(() => {
    setCurrentAssignee('~');
  }, []);

  return (
    <Dropdown id="optionDropdown" show={show} onToggle={handleToggle}>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        className="form-select form-select-lg"
        value={assignee}
      >
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100" id="assignOptions">
        <Dropdown.Item onClick={() => deleteAction()}>Delete</Dropdown.Item>
        <Dropdown.Item onClick={() => archiveTicket()}>Archive</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
