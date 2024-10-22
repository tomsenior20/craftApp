import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss';
import '../../styling/globals.scss';
import { Dropdown } from 'react-bootstrap';
import { ApiCalls } from '@/app/components/api';

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

interface Priv {
  Code: string;
  Active: number;
}

export default function RowOptions({ ticketID, record }: Number) {
  const {
    DeleteTicket,
    InsertTicketToDeleted,
    ArchiveTicket,
    RetrieveSetting
  } = ApiCalls();
  const [show, setShow] = useState(false);
  const [assignee, setCurrentAssignee] = useState<string>('~');
  const [AdminPrivilege, setAdminPrivilege] = useState<Priv | null>(null);
  // Delete Table Method, upon clicking delete
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

  // Function to adjust the height of ticketTableContainer based on whether toggle is open or not
  const adjustContainerHeight = (isShow: boolean) => {
    const ticketTableContainer = document.getElementById('openTicketContainer');
    if (ticketTableContainer) {
      ticketTableContainer.style.height = isShow
        ? 'calc(200px + 1rem)'
        : 'calc(100% - 1rem)';
    }
  };

  // Adjust height when show state changes
  useEffect(() => {
    adjustContainerHeight(show);
  }, [show]);

  // Delete Click Method
  const deleteAction = async () => {
    try {
      await AddToDeletedTable();
      await DeleteTicket(ticketID);
      window.location.reload();
    } catch (exception) {
      console.log('failed to delete ticket' + exception);
    }
  };

  // Archive Ticket Function
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
      window.location.reload();
    } catch (error) {
      console.log('failed to archive ticket' + error);
    }
  };

  const handleToggle = (isOpen: boolean, event: any) => {
    setShow(isOpen);
  };

  useEffect(() => {
    setCurrentAssignee('~');

    const GetPrivilege = async (Code: string) => {
      try {
        const result = await RetrieveSetting(Code);
        setAdminPrivilege(result);
      } catch (error: any) {
        console.log('Error getting privilege:', error);
        throw error;
      }
    };

    GetPrivilege('Admin');
  }, []);

  return (
    <Dropdown id="optionDropdown" show={show} onToggle={handleToggle}>
      <Dropdown.Toggle
        variant=""
        id="dropdown-basic"
        className="form-select form-select-lg"
        value={assignee}
      >
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100" id="assignOptions">
        <Dropdown.Item onClick={() => deleteAction()}>Delete</Dropdown.Item>
        {AdminPrivilege && AdminPrivilege.Active === 0 ? (
          <Dropdown.Item onClick={() => archiveTicket()}>Archive</Dropdown.Item>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
}
