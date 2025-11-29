import React from 'react';

const ResultPane: React.FC<{ title?: string; result: any }> = ({ title, result }) => {
  return (
    <div className="card">
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      <pre style={{ whiteSpace: 'pre-wrap' }}>{typeof result === 'string' ? result : JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default ResultPane;
