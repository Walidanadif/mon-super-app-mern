import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Pas besoin d'importer Auth.css ici

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères')
      .max(50, 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères')
      .required('Le nom d\'utilisateur est requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit avoir au moins 6 caractères')
      .required('Le mot de passe est requis'),
  });

  return (
    <div className="auth-page-container">
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await login(values.username, values.password);

          if (result.success) {
            toast.success(result.message);
            setTimeout(() => navigate('/private'), 1000);
          } else {
            toast.error(result.message);
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="auth-form-container">
            <h2 className="auth-form-title">Login</h2>

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
              <label htmlFor="password" className="form-label">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Login'}
            </button>
            <Link to="/register" className="auth-link">Don't have an account? Register</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;