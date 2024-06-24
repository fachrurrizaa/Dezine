import React from 'react'

export default function Input({ label, placeholder, type, className, value, onChange }) {
  return (
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text font-semibold text-[#004f4f] text-base mb-2">{ label }</span>
        </label>
        <input type={ type } placeholder={ placeholder } className={`input input-bordered w-full text-[#6B7193] mb-[14px] rounded-full ${className}`} value={value} onChange={onChange} required/>
    </div>
  )
}

// import React, { useState } from 'react';
// import Image from 'next/image';
// import visibilityOn from '../../../public/assets/visibilityON.svg';
// import visibilityOff from '../../../public/assets/visibilityOF.svg';

// export default function Input({ label, placeholder, type, className, value, onChange, showPasswordToggle }) {
//   const [showPassword, setShowPassword] = useState(false);

//   // Function to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const showToggle = type === 'password' && showPasswordToggle;

//   return (
//     <div className="form-control w-full">
//       <label className="label">
//         <span className="label-text font-semibold text-[#004f4f] text-base mb-2">{label}</span>
//       </label>
//       <div className="relative">
//         <input
//           type={showPassword ? 'text' : 'password'}
//           placeholder={placeholder}
//           className={`input input-bordered w-full text-[#6B7193] mb-[14px] rounded-full ${className}`}
//           value={value}
//           onChange={onChange}
//           required
//         />
//         {/* Toggle button for password visibility */}
//         {showToggle && (
//           <button
//             type="button"
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
//             onClick={togglePasswordVisibility}
//           >
//             <Image
//               src={showPassword ? visibilityOn : visibilityOff}
//               width={24}
//               height={24}
//               alt={showPassword ? 'Hide' : 'Show'}
//             />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

