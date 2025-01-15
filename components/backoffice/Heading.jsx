import React from 'react'

export default function Heading({title, className}){
  return (
    <div>
      <h2 className={`py-5 font-semibold text-2xl font-Vietnam ${className}`}>{title}</h2>
    </div>
  );
}


