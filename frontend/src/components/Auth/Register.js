import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Pas besoin d'importer Auth.css ici

function Register() {
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères')
      .max(50, 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères')
      .required('Le nom d\'utilisateur est requis'),
    email: Yup.string()
      .email('Adresse email invalide')
      .required('L\'email est requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit avoir au moins 6 caractères')
      .required('Le mot de passe est requis'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
      .required('La confirmation du mot de passe est requise'),
  });

  return (
    <div className="auth-page-container">
      <Formik
        initialValues={{ username: '', email: '', password: '', password2: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const { username, email, password } = values;
            const body = JSON.stringify({ username, email, password });
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);

            toast.success(res.data.msg);
            setTimeout(() => navigate('/login'), 1000);
          } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            const msg = err.response?.data?.msg || 'Erreur lors de l\'inscription. Veuillez réessayer.';
            toast.error(msg);
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="auth-form-container">
            <h2 className="auth-form-title">Register</h2>

            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className={`form-input ${errors.username && touched.username ? 'input-error' : ''}`}
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password2" className="form-label">Confirm Password</label>
              <Field
                type="password"
                id="password2"
                name="password2"
                className={`form-input ${errors.password2 && touched.password2 ? 'input-error' : ''}`}
              />
              <ErrorMessage name="password2" component="div" className="error-message" />
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription en cours...' : 'Register'}
            </button>
            <Link to="/login" className="auth-link">Already have an account? Login</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;