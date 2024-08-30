import { useEffect, useState } from 'react';
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
        console.log('Error generating Assignee');
      }
    };

    fetchAssignee();
  }, []);

  return (
    <td className="col text-wrap">
      <select
        name="assigneeSelect"
        className="form-select ticketText"
        id="assigneeSelect"
      >
        <option key="empty"> - </option>
        {assignee.map((person) => (
          <option key={person.id} value={person.name}>
            {person.name}
          </option>
        ))}
      </select>
    </td>
  );
}
