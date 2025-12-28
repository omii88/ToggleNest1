const ActivityItem = ({ user, action, time }) => {
  return (
    <div className="activity-item">
      <strong>{user}</strong> {action}
      <span>{time}</span>
    </div>
  );
};

export default ActivityItem;
