import React from 'react';
import AddProperty from './AddProperty';

const AgentDashboard = ({ agentDisplayName, agentEmail }) => {
  return (
    <div>
      <h1>Welcome, {agentDisplayName}!</h1>
      <AddProperty agentDisplayName={agentDisplayName} agentEmail={agentEmail} />
    </div>
  );
};

export default AgentDashboard;
