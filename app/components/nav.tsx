'use client';
// Import Modules
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// CSS Styling Imports
import '../styling/nav.scss';
import '../styling/globals.scss';
import { fetchData } from './api';

export default function Nav() {
  type Option = {
    key: string;
    value: string;
  };

  const Options: Option[] = [
    { key: 'Home', value: '/' },
    { key: 'Contact', value: '/contact' },
    { key: 'Admin', value: '/admin' },
    { key: 'Log Out', value: '/' }
  ];

  // #region Fetch Brand Name
  const [brand, setBrandName] = useState<string>('');
  const FetchBrandName = async () => {
    try {
      const data = await fetchData('selectBrandName', {
        method: 'GET'
      });
      if (data && data.length > 0) {
        setBrandName(data[0].BrandName);
      }
    } catch (error) {
      console.log('Error Fetching BrandName ' + error);
    }
  };
  // #endregion

  const GenerateOptions = ({ options }: { options: Option[] }) => {
    const [currentPage, setCurrentPage] = useState<string>('');

    useEffect(() => {
      const handleLoad = () => {
        var windowPath = window.location.pathname;
        windowPath
          ? setCurrentPage(window.location.pathname)
          : console.log('Window Path is null');
      };

      FetchBrandName();
      handleLoad();

      return () => {
        window.removeEventListener('load', handleLoad);
        window.removeEventListener('popstate', handleLoad);
      };
    }, []);

    return (
      <ul>
        {options.map((item, index) =>
          currentPage === '/admin/grantedAdmin' && item.key === 'Log Out' ? (
            <li key={index} className="d-flex justify-content-around">
              <Link href={item.value} className="nav-link">
                {item.key}
              </Link>
            </li>
          ) : currentPage !== '/admin/grantedAdmin' &&
            item.key !== 'Log Out' ? (
            <li key={index} className="d-flex justify-content-around">
              <Link href={item.value} className="nav-link">
                {item.key}
              </Link>
            </li>
          ) : null
        )}
      </ul>
    );
  };

  return (
    <nav className="navbar d-flex flex-row">
      <div className="navigationNameContainer d-flex">
        <p aria-label="navNameText" className="navbar-brand">
          {brand}
        </p>
      </div>
      <div className="navigationListContainer d-flex">
        <GenerateOptions options={Options} />
      </div>
    </nav>
  );
}
