import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => deleteAction()}>Delete</Dropdown.Item>
        <Dropdown.Item eventKey="2">Archive</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
