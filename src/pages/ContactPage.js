import React, { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend server
    console.log("Contact form submitted:", { name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Контакти</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <p className="text-center lead">
              Маєте питання чи пропозиції? Зв'яжіться з нами!
            </p>

            {submitted && (
              <div className="alert alert-success text-center" role="alert">
                Ваше повідомлення відправлено! Ми зв'яжемося з вами найближчим часом.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="contactName" className="form-label">
                  Ваше ім'я:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactEmail" className="form-label">
                  Ваш Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="contactEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactMessage" className="form-label">
                  Повідомлення:
                </label>
                <textarea
                  className="form-control"
                  id="contactMessage"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Відправити повідомлення
              </button>
            </form>

            <hr className="my-4"/>

            <div className="text-center">
              <h5>Наша адреса:</h5>
              <p>вул. Приклад, 123, м. Івано-Франківськ, Україна</p>
              <h5>Телефон:</h5>
              <p>+38 (0XX) XXX-XX-XX</p>
              <h5>Email:</h5>
              <p>info@my-ecom.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;