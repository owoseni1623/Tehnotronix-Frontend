import React, { useState } from "react";

function Card ({ children, description, descriptionColor }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className='border border-black w-[280px] text-center rounded-lg shadow-xl pb-[10px] relative'
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      {children}
      {showDescription && (
        <p className={`absolute top-0 left-0 right-0 bg-${descriptionColor}-200 text-black bg-orange-300 py-2 px-4 opacity-80 transition-opacity duration-300 `}>{description}</p>
      )}
    </div>
  );
}

export default Card;