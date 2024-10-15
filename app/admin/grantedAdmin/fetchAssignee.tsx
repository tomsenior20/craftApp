import React, { useEffect, useState } from 'react';
import { fetchData } from '../../components/api';

export default function Assignee() {
  type Assignee = {
    name: string;
    id: number;
  };

  const [assignee, setAssignee] = useState<Assignee[]>([]);

  useEffect(() => {
    const fetchAssignee = async () => {
      try {
        const data = await fetchData('getAssigneeList', {
          method: 'GET'
        });
        if (data && data.result.length > 0) {
          setAssignee(data.result);
        }
      } catch (error) {
        console.log('Error generating Assignee:', error);
      }
    };

    fetchAssignee();
  }, []); // Ensure this runs only on component mount

  // Generate Options JSX
  const generateAssigneeOptions = () => {
    return (
      <select
        name="assigneeSelect"
        className="form-select ticketText"
        id="assigneeSelect"
      >
        <option value="~">~ Select an Asignee ~</option>
        {assignee.map((person) => (
          <option key={person.id} value={person.name}>
            {person.name}
          </option>
        ))}
      </select>
    );
  };

  return <td className="col text-wrap">{generateAssigneeOptions()}</td>;
}
