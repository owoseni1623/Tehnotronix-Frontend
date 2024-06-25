import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";


function Footer() {
  return (
    <>
      <div className='bg-orange-500 py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-20 flex flex-col md:flex-row justify-between items-center md:items-start overflow-hidden'>
        <div className='mb-6 md:mb-0'>
          <p className='text-lg lg:text-xl font-bold text-center md:text-left'>TECHNOTRONIX</p>
        </div>
        <div className='md:ml-8 lg:ml-0 mb-6 md:mb-0'>
          <h1 className='text-lg font-bold mb-4 text-center md:text-left'>Useful Links</h1>
          <ul className='text-white text-center md:text-left'>
            <li>
              <a className='hover:text-black' href=''>Home</a>
            </li>
            <li>
              <a className='hover:text-white' href=''>Contact</a>
            </li>
            <li>
              <a className='hover:text-white' href=''>Privacy Policy</a>
            </li>
            <li>
              <a className='hover:text-white' href=''>Terms and Conditions</a>
            </li>
          </ul>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <h1 className='text-lg font-bold mb-4'>Follow Us</h1>
          <div className='flex items-center justify-center md:justify-start'>
            <FaFacebook className='text-white mr-4 md:mr-6' />
            <FaXTwitter className='text-white mr-4 md:mr-6' />
            <FaInstagramSquare className='text-white mr-4 md:mr-6' />
            <FaTiktok className='text-white' />
          </div>
        </div>
      </div>
      <div className='bg-black text-white text-center py-2'>
        <p className='text-sm'>&copy; Copyright Technonotronix | All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;