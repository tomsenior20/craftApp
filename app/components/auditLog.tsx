type AuditLogRecord = {
  username: string;
  time: number;
  action: string;
};

export default function SaveAuditLog(username: string, action: string) {
  const auditLog: AuditLogRecord = {
    username,
    time: Date.now(),
    action
  };

  sessionStorage.setItem('auditLog', JSON.stringify(auditLog));
}
