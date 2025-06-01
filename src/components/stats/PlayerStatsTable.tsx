import React from 'react';
const PlayerStatsTable: React.FC = () => {

  return (
    <div className="overflow-x-auto">
      <div className="bg-white rounded-lg shadow full-iframe">
      <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTy4Nxtj6SKMYrKjD_59aMwPZrOApyKnZrLIQjo0RohlKgGUQqGkGR0C8oM0kVFY2m9r1KJUjdF-6h6/pubhtml?gid=613108472&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Stats are automatically synchronized with the team's Google Sheets document.</p>
      </div>
    </div>
  );
};

export default PlayerStatsTable;