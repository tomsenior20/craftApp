'use client';

import Nav from '../components/nav';
import Footer from '../components/footer';
import { useState } from 'react';
// Styling Import
import '../styling/Contact/contact.scss';
import { fetchData } from '../components/api';

export default function Contact() {
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  type postData = {
    name: string;
    number: string;
    comment: string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Validate form fields
    if (!name.trim() || !number.trim() || !comment.trim()) {
      alert('Please fill out all fields.');
      setIsSubmitting(false);
      return;
    }

    // Create the Post Data Object
    const postData: postData = {
      name,
      number,
      comment
    };

    try {
      const data = await fetchData('submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      if (data) {
        alert(data.message);
        // Creates Successful Audit
        // Reset form fields
        setName('');
        setNumber('');
        setComment('');
      }
    } catch (error) {
      console.log('Error posting form: ' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <section className="contactTitleSection">
        <div className="contactMainContainer">
          <h1 className="contactPageTitle" aria-label="contact Main title">
            Contact Me
          </h1>
        </div>
      </section>
      <section className="contactFormSection d-flex flex-column flex-sm-row">
        <div
          className="contactFormInformationContainer w-100"
          aria-label="contactFormInformationContainer"
        >
          <h2>If you are wanting to contact us, please fill in the form</h2>
          <p>All data is completed and handled confidentially</p>
        </div>
        <form
          className="contactForm w-100 d-flex p-4 bg-dark shadow-lg"
          aria-label="contactForm"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center formTitle">Contact Form</h1>
          <div className="form-floating rounded mb-3">
            <input
              type="text"
              id="nameInput"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              aria-label="form Name entry"
            />
            <label htmlFor="nameInput" className="formLabel pt-3">
              Contact Me:{' '}
            </label>
          </div>
          <div className="form-floating rounded mb-3">
            <input
              type="number"
              id="contactNumberText"
              className="form-control"
              value={number}
              placeholder="Enter Contact Number"
              onChange={(e) => setNumber(e.target.value)}
              aria-label="form number entry"
            />
            <label className="formLabel pt-3" htmlFor="contactNumberText">
              Enter Contact Number:
            </label>
          </div>
          <div className="form-floating rounded mb-3">
            <textarea
              id="formComment"
              placeholder="Enter Comment"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <label htmlFor="formComment" className="formLabel pt-3">
              Enter Comment:
            </label>
          </div>
          <button
            id="submitForm"
            className="submitForm"
            role="button"
            type="submit"
            aria-label="submitForm"
          >
            Submit
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
