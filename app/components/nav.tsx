'use client';
// Import Modules
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// CSS Styling Imports
import '../styling/nav.scss';
import '../styling/globals.scss';
import { ApiCalls, fetchData } from './api';

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

  const [brand, setBrandName] = useState<string>('');

  const GenerateOptions = ({ options }: { options: Option[] }) => {
    const [currentPage, setCurrentPage] = useState<string>('');
    const { FetchBrandName } = ApiCalls();

    const FetchBrand = async () => {
      try {
        const result = await FetchBrandName();
        setBrandName(result[0].BrandName);
      } catch (error) {
        console.log('Error Fetching BrandName ' + error);
      }
    };

    useEffect(() => {
      const handleLoad = () => {
        var windowPath = window.location.pathname;
        windowPath
          ? setCurrentPage(window.location.pathname)
          : console.log('Window Path is null');
      };

      FetchBrand();
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
